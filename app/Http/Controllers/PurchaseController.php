<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderLine;
use App\Models\Vendor;
use App\Models\Product;
use App\Models\JournalEntries;
use App\Models\JournalItem;
use App\Models\Journal;
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
        $data = [
            'purchaseOrders' => PurchaseOrder::with(['vendor'])->get(),
            'journals' => Journal::with(['chart_of_account'])->get(),
        ];

        return Inertia::render('Dashboard/Orders/Purchases/Index', $data);
    }

    public function purchaseOrderLines()
    {
        return $this->hasMany(PurchaseOrderLine::class, 'purchase_order_id');
    }

    public function detail($id)
    {
        $data = [
            'purchaseOrders' => PurchaseOrder::with(['vendor', 'purchaseOrderLines.product'])->find($id),
        ];

        return Inertia::render('Dashboard/Orders/Purchases/Detail', $data);
    }

    public function create()
    {
        $data = [
            'vendors' => Vendor::all(),
            'products' => Product::all(),
        ];

        return Inertia::render('Dashboard/Orders/Purchases/Create', $data);
    }

    public function destroy($id)
    {
        $purchasesorder = PurchaseOrder::find($id);
        $journalEntries = JournalEntries::where('purchase_order_id', $id)->get();
        $purchaseorderline = PurchaseOrderLine::where('purchase_order_id', $id)->get();

        if ($purchasesorder->total_due == 0) {
            return redirect()->back()->with([
                'message' => [
                    'type' => 'error',
                    'content' => "Purchase order has been paid!"
                ]
            ]);
        } else if ($purchasesorder->total_paid > 0) {
            return redirect()->back()->with([
                'message' => [
                    'type' => 'error',
                    'content' => "Purchase order already has payment!"
                ]
            ]);
        }

        try {
            DB::beginTransaction();
            foreach ($journalEntries as $journalEntry) {
                $journalitems = JournalItem::where('journal_entry_id', $journalEntry->id)->get();
                $journalitems->each(function ($journalitem) {
                    $chartOfAccountId = $journalitem->chart_of_account_id;
                    $journalitem->delete();
                    ChartOfAccount::updateChartOfAccountBalance($chartOfAccountId);
                });

                $journalEntry->delete();
            }

            $purchaseorderline->each(function ($purchaseorderline) {
                $productId = $purchaseorderline->product_id;
                $purchaseorderline->delete();
                Product::updateStandardPrice($productId);
                Product::decreaseStock($productId, $purchaseorderline->quantity);
            });

            $purchasesorder->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }


        return redirect()->route('purchases')->with([
            'message' => [
                'type'  => 'success',
                'content' => 'Purchases order deleted successfully'
            ]
        ]);
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

        $generateCode = PurchaseOrder::generateCode();

        $totalItem = 0;
        $totalPrice = 0;

        foreach ($request->products as $product) {
            $totalItem += $product['quantity'];
            $totalPrice += $product['quantity'] * $product['price'] - $product['discount'];
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
                'vendor_id' => (int) $request->vendor_id['value'],
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
                    'total' => $product['quantity'] * $product['price'] - $product['discount']
                ]);

                JournalItem::create([
                    'journal_entry_id' => $createPurchaseJournalEntry->id,
                    'chart_of_account_id' => $setting->account_payable_id,
                    'purchase_order_line_id' => $createPurchaseOrderLine->id,
                    'label' => $product['product_name'],
                    'account_id' => $setting->account_payable_id,
                    'debit' => 0,
                    'credit' => $createPurchaseOrderLine->total,
                    'balance' => 0 - $createPurchaseOrderLine->total
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
                ChartOfAccount::updatePurchaseChartOfAccountBalance();
                Product::increaseStock($createPurchaseOrderLine->product_id, $createPurchaseOrderLine->quantity);
                Product::updateStandardPrice($createPurchaseOrderLine->product_id);
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            throw $th;
        }
        return redirect()->route('purchases')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Purchase order has been created.'
            ]
        ]);
    }

    public function edit($id)
    {
        $purchaseOrder = PurchaseOrder::find($id);

        if ($purchaseOrder->total_due == 0 and $purchaseOrder->payment_status == 'paid') {
            return redirect()->back()->with([
                'message' => [
                    'type' => 'error',
                    'content' => "You can't edit paid sale order"
                ]
            ]);
        } else if ($purchaseOrder->total_paid > 0) {
            return redirect()->back()->with([
                'message' => [
                    'type' => 'error',
                    'content' => "You can't edit sale order that already has payment"
                ]
            ]);
        }

        $data = [
            'purchaseOrder' => PurchaseOrder::with(['vendor', 'purchaseOrderLines'])->find($id),
            'vendors' => Vendor::all(),
            'products' => Product::all(),
        ];

        return Inertia::render('Dashboard/Orders/Purchases/Edit', $data);
    }

    public function update(Request $request, $id)
    {
        $setting = Setting::getSetting();
        $purchaseOrder = PurchaseOrder::find($id);

        if (!$setting) {
            return redirect()->route('settings')->with([
                'message' => [
                    'type' => 'danger',
                    'content' => 'Please complete required settings first.'
                ]
            ]);
        }

        $totalItem = 0;
        $totalPrice = 0;

        foreach ($request->products as $product) {
            $totalItem += $product['quantity'];
            $totalPrice += $product['quantity'] * $product['price'] - $product['discount'];
        }

        $request->request->add([
            'payment_status' => $purchaseOrder->payment_status,
            'total_item' => $totalItem,
            'total_price' => $totalPrice,
            'total_due' => $totalPrice,
        ]);

        $request->validate([
            'vendor_id' => 'required',
            'create_date' => 'required',
            'status' => 'required',
            'payment_status' => 'required',
            'total_item' => 'required',
            'total_price' => 'required',
            'total_due' => 'required',
        ]);

        try {
            DB::beginTransaction();

            $purchaseOrder = PurchaseOrder::with(['purchaseOrderLines'])->find($id);

            PurchaseOrder::deleteUnnecessaryPurchaseOrderLines($id, $request->products);

            $isDifferencePurchaseOrderLine = false;

            foreach ($purchaseOrder->purchaseOrderLines as $purchaseOrderLine) {
                foreach ($request->products as $product) {
                    if ($purchaseOrderLine->id == $product['id']) {
                        if ($purchaseOrderLine->quantity != $product['quantity'] || $purchaseOrderLine->price != $product['price'] || $purchaseOrderLine->discount != $product['discount']) {
                            $isDifferencePurchaseOrderLine = true;
                            break;
                        }
                    }

                    if ($product['id'] == null) {
                        $isDifferencePurchaseOrderLine = true;
                        break;
                    }
                }

                if ($isDifferencePurchaseOrderLine) {
                    break;
                }
            }

            if ($isDifferencePurchaseOrderLine) {
                $purchaseJournalEntryCode = JournalEntries::generateCode([
                    'journal_id' => $setting->purchase_journal_id
                ]);

                $stockValuationJournalEntryCode = JournalEntries::generateCode([
                    'journal_id' => $setting->stock_valuation_journal_id
                ]);

                $createPurchaseJournalEntry = JournalEntries::create([
                    'code' => $purchaseJournalEntryCode,
                    'status' => 'posted',
                    'accounting_date' => date('Y-m-d'),
                    'reference' => "Purchase Updated - $purchaseOrder->code",
                    'journal_id' => $setting->purchase_journal_id,
                    'purchase_order_id' => $purchaseOrder->id
                ]);

                $createStockValuationJournalEntry = JournalEntries::create([
                    'code' => $stockValuationJournalEntryCode,
                    'status' => 'posted',
                    'accounting_date' => date('Y-m-d'),
                    'reference' => "Stock Valuation - $purchaseOrder->code",
                    'journal_id' => $setting->stock_valuation_journal_id,
                    'purchase_order_id' => $purchaseOrder->id
                ]);
            }

            foreach ($request->products as $listProduct) {
                $purchaseOrderLine = PurchaseOrderLine::find($listProduct['id']);
                $product = Product::find($listProduct['product_id']);

                if (isset($listProduct['id'])) {
                    $oldQuantity = $purchaseOrderLine->quantity;
                    $oldTotalPrice = $purchaseOrderLine->total;
                    $currentQuantity = $listProduct['quantity'];
                    $currentTotalPrice = $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount'];
                    if ($currentTotalPrice < $oldTotalPrice) {
                        if ($oldQuantity > $listProduct['quantity']) {
                            $quantityDifference = $oldQuantity - $listProduct['quantity'];
                            Product::decreaseStock($purchaseOrderLine->product_id, $quantityDifference);
                        } else if ($oldQuantity < $listProduct['quantity']) {
                            $quantityDifference = $listProduct['quantity'] - $oldQuantity;
                            Product::increaseStock($purchaseOrderLine->product_id, $quantityDifference);
                        }

                        $totalPriceDifference = $oldTotalPrice - $currentTotalPrice;

                        $purchaseOrderLine->update([
                            'product_id' => $listProduct['product_id'],
                            'quantity' => $listProduct['quantity'],
                            'price' => $listProduct['price'],
                            'discount' => $listProduct['discount'],
                            'total' => $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount']
                        ]);

                        JournalItem::create([
                            'journal_entry_id' => $createPurchaseJournalEntry->id,
                            'chart_of_account_id' => $setting->account_payable_id,
                            'purchase_order_line_id' => $purchaseOrderLine->id,
                            'label' => $product->name,
                            'account_id' => $setting->account_payable_id,
                            'debit' => $totalPriceDifference,
                            'credit' => 0,
                            'balance' => $totalPriceDifference
                        ]);

                        JournalItem::create([
                            'journal_entry_id' => $createStockValuationJournalEntry->id,
                            'chart_of_account_id' => $setting->inventory_account_id,
                            'purchase_order_line_id' => $purchaseOrderLine->id,
                            'account_id' => $setting->inventory_account_id,
                            'label' => $product->name . " - " . "Stock Valuation",
                            'debit' => 0,
                            'credit' => $totalPriceDifference,
                            'balance' => -$totalPriceDifference
                        ]);

                        ChartOfAccount::updateChartOfAccountBalance($setting->account_payable_id);
                        ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
                    } else if ($currentTotalPrice > $oldTotalPrice) {
                        if ($oldQuantity > $listProduct['quantity']) {
                            $quantityDifference = $oldQuantity - $listProduct['quantity'];
                            Product::decreaseStock($purchaseOrderLine->product_id, $quantityDifference);
                        } else if ($oldQuantity < $listProduct['quantity']) {
                            $quantityDifference = $listProduct['quantity'] - $oldQuantity;
                            Product::increaseStock($purchaseOrderLine->product_id, $quantityDifference);
                        }

                        $totalPriceDifference = $currentTotalPrice - $oldTotalPrice;

                        $purchaseOrderLine->update([
                            'product_id' => $listProduct['product_id'],
                            'quantity' => $listProduct['quantity'],
                            'price' => $listProduct['price'],
                            'discount' => $listProduct['discount'],
                            'total' => $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount']
                        ]);

                        JournalItem::create([
                            'journal_entry_id' => $createPurchaseJournalEntry->id,
                            'chart_of_account_id' => $setting->account_payable_id,
                            'purchase_order_line_id' => $purchaseOrderLine->id,
                            'label' => $product->name,
                            'account_id' => $setting->account_payable_id,
                            'debit' => 0,
                            'credit' => $totalPriceDifference,
                            'balance' => -$totalPriceDifference
                        ]);

                        JournalItem::create([
                            'journal_entry_id' => $createStockValuationJournalEntry->id,
                            'chart_of_account_id' => $setting->inventory_account_id,
                            'purchase_order_line_id' => $purchaseOrderLine->id,
                            'account_id' => $setting->inventory_account_id,
                            'label' => "Stock Valuation - $product->name",
                            'debit' => $totalPriceDifference,
                            'credit' => 0,
                            'balance' => $totalPriceDifference
                        ]);

                        ChartOfAccount::updateChartOfAccountBalance($setting->account_payable_id);
                        ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
                    } else if ($currentTotalPrice == $oldTotalPrice) {
                        if ($oldQuantity > $currentQuantity) {
                            $quantityDifference = $oldQuantity - $currentQuantity;
                            Product::decreaseStock($purchaseOrderLine->product_id, $quantityDifference);
                        } else if ($oldQuantity < $currentQuantity) {
                            $quantityDifference = $currentQuantity - $oldQuantity;
                            Product::increaseStock($purchaseOrderLine->product_id, $quantityDifference);
                        }

                        $purchaseOrderLine->update([
                            'product_id' => $listProduct['product_id'],
                            'quantity' => $listProduct['quantity'],
                            'price' => $listProduct['price'],
                            'discount' => $listProduct['discount'],
                            'total' => $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount']
                        ]);

                        Product::updateStandardPrice($purchaseOrderLine->product_id);
                    }

                    Product::updateStandardPrice($purchaseOrderLine->product_id);
                } else {
                    $createPurchaseOrderLine = PurchaseOrderLine::create([
                        'purchase_order_id' => $purchaseOrder->id,
                        'product_id' => $listProduct['product_id'],
                        'quantity' => $listProduct['quantity'],
                        'price' => $listProduct['price'],
                        'discount' => $listProduct['discount'],
                        'total' => $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount']
                    ]);

                    Product::increaseStock($createPurchaseOrderLine->product_id, $createPurchaseOrderLine->quantity);

                    $totalPrice = $createPurchaseOrderLine->total;

                    JournalItem::create([
                        'journal_entry_id' => $createPurchaseJournalEntry->id,
                        'chart_of_account_id' => $setting->account_payable_id,
                        'purchase_order_line_id' => $createPurchaseOrderLine->id,
                        'label' => $product->name,
                        'account_id' => $setting->account_payable_id,
                        'debit' => 0,
                        'credit' => $totalPrice,
                        'balance' => -$totalPrice
                    ]);

                    JournalItem::create([
                        'journal_entry_id' => $createStockValuationJournalEntry->id,
                        'chart_of_account_id' => $setting->inventory_account_id,
                        'purchase_order_line_id' => $createPurchaseOrderLine->id,
                        'account_id' => $setting->inventory_account_id,
                        'label' => "Stock Valuation - $product->name",
                        'debit' => $totalPrice,
                        'credit' => 0,
                        'balance' => $totalPrice
                    ]);

                    Product::updateStandardPrice($createPurchaseOrderLine->product_id);
                    ChartOfAccount::updateChartOfAccountBalance($setting->account_payable_id);
                    ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
                }
            }

            $purchaseOrder->update([
                'vendor_id' => (int) $request->vendor_id['value'],
                'create_date' => Date::parse($request->create_date)->format('Y-m-d'),
                'status' => $request->status,
                'payment_status' => $request->payment_status,
                'total_item' => $request->total_item,
                'total_price' => $request->total_price,
                'total_due' => $request->total_due,
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return redirect()->route('purchases')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Purchase order has been updated.'
            ]
        ]);
    }
}
