<?php

namespace App\Http\Controllers;

use App\Models\SaleOrder;
use App\Models\SaleOrderLine;
use App\Models\Customer;
use App\Models\Product;
use App\Models\JournalEntries;
use App\Models\JournalItem;
use App\Models\Setting;
use App\Models\ChartOfAccount;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function index()
    {
        $data = [
            'saleOrders' => SaleOrder::with(['customer'])->get()
        ];

        return Inertia::render('Dashboard/Orders/Sales/Index', $data);
    }

    public function detail()
    {
        return Inertia::render('Dashboard/Orders/Sales/Detail');
    }

    public function create()
    {
        $data = [
            'customers' => customer::all(),
            'products' => Product::all(),
        ];

        return Inertia::render('Dashboard/Orders/Sales/Create', $data);
    }

    public function store(Request $request)
    {
        $setting = Setting::getSetting();

        if (!$setting) {
            return redirect()->route('settings')->with([
                'message' => [
                    'type' => 'danger',
                    'content' => 'Please complete required settings first.'
                ]
            ]);
        }

        $generateCode = SaleOrder::generateCode();

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
            'customer_id' => 'required',
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
            $createSaleOrder = SaleOrder::create([
                'code' => $request->code,
                'customer_id' => (int) $request->customer_id,
                'create_date' => Date::parse($request->create_date)->format('Y-m-d'),
                'status' => $request->status,
                'payment_status' => $request->payment_status,
                'user_id' => $request->user_id,
                'total_item' => $request->total_item,
                'total_price' => $request->total_price,
                'total_paid' => $request->total_paid,
                'total_due' => $request->total_due,
            ]);

            $saleJournalEntryCode = JournalEntries::generateCode([
                'journal_id' => $setting->sales_journal_id
            ]);

            $stockValuationJournalEntryCode = JournalEntries::generateCode([
                'journal_id' => $setting->stock_valuation_journal_id
            ]);

            $createSaleJournalEntry = JournalEntries::create([
                'code' => $saleJournalEntryCode,
                'status' => 'posted',
                'accounting_date' => Date::parse($createSaleOrder->create_date)->format('Y-m-d'),
                'reference' => $createSaleOrder->code,
                'journal_id' => $setting->sales_journal_id,
                'sale_order_id' => $createSaleOrder->id
            ]);

            $createStockValuationJournalEntry = JournalEntries::create([
                'code' => $stockValuationJournalEntryCode,
                'status' => 'posted',
                'accounting_date' => Date::parse($createSaleOrder->create_date)->format('Y-m-d'),
                'reference' => $createSaleOrder->code,
                'journal_id' => $setting->stock_valuation_journal_id,
                'sale_order_id' => $createSaleOrder->id
            ]);

            foreach ($request->products as $product) {
                $createSaleOrderLine = SaleOrderLine::create([
                    'sale_order_id' => $createSaleOrder->id,
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                    'discount' => $product['discount'],
                    'total' => $product['quantity'] * $product['price']
                ]);

                JournalItem::create([
                    'journal_entry_id' => $createSaleJournalEntry->id,
                    'chart_of_account_id' => $setting->account_payable_id,
                    'sale_order_line_id' => $createSaleOrderLine->id,
                    'label' => $product['product_name'],
                    'account_id' => $setting->account_payable_id,
                    'debit' => $createSaleOrderLine->total,
                    'credit' => 0,
                    'balance' => $createSaleOrderLine->total
                ]);

                JournalItem::create([
                    'journal_entry_id' => $createStockValuationJournalEntry->id,
                    'chart_of_account_id' => $setting->inventory_account_id,
                    'sale_order_line_id' => $createSaleOrderLine->id,
                    'account_id' => $setting->inventory_account_id,
                    'label' => $product['product_name'] . " - " . "Stock Valuation",
                    'debit' => $createSaleOrderLine->total,
                    'credit' => 0,
                    'balance' => $createSaleOrderLine->total
                ]);

                ChartOfAccount::updateChartOfAccountBalance($setting->account_payable_id);
                ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
                Product::increaseStock($createSaleOrderLine->product_id, $createSaleOrderLine->quantity);
                Product::updateStandardPrice($createSaleOrderLine->product_id);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            throw $th;
        }
        return redirect()->route('sales')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Sale order has been created.'
            ]
        ]);
    }
}
