<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderLine;
use App\Models\Vendor;
use App\Models\Product;
use App\Models\JournalEntries;
use App\Models\JournalItem;
use App\Models\Setting;
use App\Models\ChartOfAccount;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Orders/Purchases/Index');
    }

    public function detail()
    {
        return Inertia::render('Dashboard/Orders/Purchases/Detail');
    }

    public function create()
    {
        $data = [
            'vendors' => Vendor::all(),
            'products' => Product::all(),
        ];

        return Inertia::render('Dashboard/Orders/Purchases/Create', $data);
    }

    public function store(Request $request)
    {
        $setting = Setting::getSetting();

        $generateCode = PurchaseOrder::generateCode();

        $totalItem = 0;
        $totalPrice = 0;

        foreach ($request->products as $product) {
            $totalItem += $product['quantity'];
            $totalPrice += $product['quantity'] * $product['price'];
        }

        $request->request->add([
            'code' => $generateCode,
            'payment_status' => 'due',
            'user_id' => auth()->user()->id,
            'total_item' => $totalItem,
            'total_price' => $totalPrice,
            'total_paid' => 0,
            'total_due' => $totalPrice,
        ]);

        $request->validate([
            'code' => 'required',
            'vendor_id' => 'required',
            'create_date' => 'required',
            'status' => 'required',
            'payment_status' => 'required',
            'user_id' => 'required',
            'total_item' => 'required',
            'total_price' => 'required',
            'total_paid' => 'required',
            'total_due' => 'required',
        ]);

        try {
            DB::beginTransaction();
            $createPurchaseOrder = PurchaseOrder::create([
                'code' => $request->code,
                'vendor_id' => (int) $request->vendor_id,
                'create_date' => Date::parse($request->create_date)->format('Y-m-d'),
                'status' => $request->status,
                'payment_status' => $request->payment_status,
                'user_id' => $request->user_id,
                'total_item' => $request->total_item,
                'total_price' => $request->total_price,
                'total_paid' => $request->total_paid,
                'total_due' => $request->total_due,
            ]);

            $purchaseJournalEntryCode = JournalEntries::generateCode([
                'journal_id' => $setting->purchase_journal_id
            ]);

            $stockValuationJournalEntryCode = JournalEntries::generateCode([
                'journal_id' => $setting->stock_valuation_journal_id
            ]);

            $createPurchaseJournalEntry = JournalEntries::create([
                'code' => $purchaseJournalEntryCode,
                'status' => 'posted',
                'accounting_date' => Date::parse($createPurchaseOrder->create_date)->format('Y-m-d'),
                'reference' => $createPurchaseOrder->code,
                'journal_id' => $setting->purchase_journal_id,
                'purchase_order_id' => $createPurchaseOrder->id
            ]);

            $createStockValuationJournalEntry = JournalEntries::create([
                'code' => $stockValuationJournalEntryCode,
                'status' => 'posted',
                'accounting_date' => Date::parse($createPurchaseOrder->create_date)->format('Y-m-d'),
                'reference' => $createPurchaseOrder->code,
                'journal_id' => $setting->stock_valuation_journal_id,
                'purchase_order_id' => $createPurchaseOrder->id
            ]);

            foreach ($request->products as $product) {
                $createPurchaseOrderLine = PurchaseOrderLine::create([
                    'purchase_order_id' => $createPurchaseOrder->id,
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                    'discount' => $product['discount'],
                    'total' => $product['quantity'] * $product['price']
                ]);

                JournalItem::create([
                    'journal_entry_id' => $createPurchaseJournalEntry->id,
                    'chart_of_account_id' => $setting->account_payable_id,
                    'purchase_order_line_id' => $createPurchaseOrderLine->id,
                    'label' => $product['product_name'],
                    'account_id' => $setting->account_payable_id,
                    'debit' => $createPurchaseOrderLine->total,
                    'credit' => 0,
                    'balance' => $createPurchaseOrderLine->total
                ]);

                JournalItem::create([
                    'journal_entry_id' => $createStockValuationJournalEntry->id,
                    'chart_of_account_id' => $setting->inventory_account_id,
                    'purchase_order_line_id' => $createPurchaseOrderLine->id,
                    'account_id' => $setting->inventory_account_id,
                    'label' => $product['product_name'] . " - " . "Stock Valuation",
                    'debit' => $createPurchaseOrderLine->total,
                    'credit' => 0,
                    'balance' => $createPurchaseOrderLine->total
                ]);

                ChartOfAccount::updateChartOfAccountBalance($setting->account_payable_id);
                ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            throw $th;
        }
        return redirect()->route('purchases')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Purchase order has been created.'
            ]
        ]);
    }
}
