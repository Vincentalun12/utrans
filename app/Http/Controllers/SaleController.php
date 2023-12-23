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
use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function index()
    {
        $data = [
            'saleOrders' => SaleOrder::with(['customer'])->get(),
            'journals' => Journal::with(['chart_of_account'])->get(),
        ];

        return Inertia::render('Dashboard/Orders/Sales/Index', $data);
    }

    public function detail($id)
    {
        $data = [
            'saleOrder' => SaleOrder::with(['customer', 'saleOrderLines.product'])->find($id),
        ];

        return Inertia::render('Dashboard/Orders/Sales/Detail', $data);
    }

    public function create()
    {
        $data = [
            'customers' => customer::all(),
            'products' => Product::all(),
        ];

        return Inertia::render('Dashboard/Orders/Sales/Create', $data);
    }

    public function destroy($id)
    {
        $saleOrder = SaleOrder::find($id);
        $journalEntries = JournalEntries::where('sale_order_id', $id)->get();
        $saleOrderLines = SaleOrderLine::where('sale_order_id', $id)->get();

        if ($saleOrder->total_due == 0) {
            return redirect()->back()->with([
                'message' => [
                    'type' => 'error',
                    'content' => "Sale order has been paid!"
                ]
            ]);
        } else if ($saleOrder->total_paid > 0) {
            return redirect()->back()->with([
                'message' => [
                    'type' => 'error',
                    'content' => "Sale order already has payment!"
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

            $saleOrderLines->each(function ($saleOrderLine) {
                $productId = $saleOrderLine->product_id;
                $saleOrderLine->delete();
                Product::updateStandardPrice($productId);
                Product::increaseStock($productId, $saleOrderLine->quantity);
            });

            $saleOrder->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return redirect()->route('sales')->with([
            'message' => [
                'type'  => 'success',
                'content' => 'Sales order deleted successfully'
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
                'user_id' => auth()->user()->id,
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
                $productStandardPrice = Product::find($product['product_id'])->standard_price * $product['quantity'];

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
                    'chart_of_account_id' => $setting->account_receivable_id,
                    'sale_order_line_id' => $createSaleOrderLine->id,
                    'label' => $product['product_name'],
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
                    'debit' => 0,
                    'credit' => $productStandardPrice,
                    'balance' => -$productStandardPrice
                ]);

                ChartOfAccount::updateChartOfAccountBalance($setting->account_receivable_id);
                ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
                Product::decreaseStock($createSaleOrderLine->product_id, $createSaleOrderLine->quantity);
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

    public function edit($id)
    {
        $data = [
            'saleOrder' => SaleOrder::with(['customer', 'saleOrderLines.product'])->find($id),
            'customers' => Customer::all(),
            'products' => Product::all(),
        ];

        return Inertia::render('Dashboard/Orders/Sales/Edit', $data);
    }

    public function update(Request $request, $id)
    {
        $setting = Setting::getSetting();
        $saleOrder = SaleOrder::find($id);

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
            'payment_status' => $saleOrder->payment_status,
            'total_item' => $totalItem,
            'total_price' => $totalPrice,
            'total_due' => $totalPrice,
        ]);

        $request->validate([
            'customer_id' => 'required',
            'create_date' => 'required',
            'status' => 'required',
            'payment_status' => 'required',
            'total_item' => 'required',
            'total_price' => 'required',
            'total_due' => 'required',
        ]);

        try {
            DB::beginTransaction();

            $saleOrder = SaleOrder::with(['saleOrderLines'])->find($id);

            SaleOrder::deleteUnnecessarySaleOrderLine($id, $request->products);

            $isDifferenceSaleOrderLine = false;

            foreach ($saleOrder->saleOrderLines as $saleOrderLine) {
                foreach ($request->products as $product) {
                    if ($saleOrderLine->id == $product['id']) {
                        if ($saleOrderLine->quantity != $product['quantity'] || $saleOrderLine->price != $product['price'] || $saleOrderLine->discount != $product['discount']) {
                            $isDifferenceSaleOrderLine = true;
                            break;
                        }
                    }

                    if ($product['id'] == null) {
                        $isDifferenceSaleOrderLine = true;
                        break;
                    }
                }

                if ($isDifferenceSaleOrderLine) {
                    break;
                }
            }

            if ($isDifferenceSaleOrderLine) {
                $saleJournalEntryCode = JournalEntries::generateCode([
                    'journal_id' => $setting->sales_journal_id
                ]);

                $stockValuationJournalEntryCode = JournalEntries::generateCode([
                    'journal_id' => $setting->stock_valuation_journal_id
                ]);

                $createPurchaseJournalEntry = JournalEntries::create([
                    'code' => $saleJournalEntryCode,
                    'status' => 'posted',
                    'accounting_date' => date('Y-m-d'),
                    'reference' => "Purchase Updated - $saleOrder->code",
                    'journal_id' => $setting->sales_journal_id,
                    'sale_order_line_id' => $saleOrder->id
                ]);

                $createStockValuationJournalEntry = JournalEntries::create([
                    'code' => $stockValuationJournalEntryCode,
                    'status' => 'posted',
                    'accounting_date' => date('Y-m-d'),
                    'reference' => "Stock Valuation - $saleOrder->code",
                    'journal_id' => $setting->stock_valuation_journal_id,
                    'sale_order_line_id' => $saleOrder->id
                ]);
            }

            foreach ($request->products as $listProduct) {
                $saleOrderLine = SaleOrderLine::find($listProduct['id']);
                $product = Product::find($listProduct['product_id']);

                if (isset($listProduct['id'])) {
                    $oldQuantity = $saleOrderLine->quantity;
                    $oldTotalPrice = $saleOrderLine->total;
                    $currentQuantity = $listProduct['quantity'];
                    $currentTotalPrice = $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount'];
                    if ($currentTotalPrice < $oldTotalPrice) {
                        if ($oldQuantity > $listProduct['quantity']) {
                            $quantityDifference = $oldQuantity - $listProduct['quantity'];
                            Product::increaseStock($saleOrderLine->product_id, $quantityDifference);
                        } else if ($oldQuantity < $listProduct['quantity']) {
                            $quantityDifference = $listProduct['quantity'] - $oldQuantity;
                            Product::decreaseStock($saleOrderLine->product_id, $quantityDifference);
                        }

                        $totalPriceDifference = $oldTotalPrice - $currentTotalPrice;

                        $saleOrderLine->update([
                            'product_id' => $listProduct['product_id'],
                            'quantity' => $listProduct['quantity'],
                            'price' => $listProduct['price'],
                            'discount' => $listProduct['discount'],
                            'total' => $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount']
                        ]);

                        JournalItem::create([
                            'journal_entry_id' => $createPurchaseJournalEntry->id,
                            'chart_of_account_id' => $setting->account_receivable_id,
                            'sale_order_line_id' => $saleOrderLine->id,
                            'label' => $product->name,
                            'account_id' => $setting->account_receivable_id,
                            'debit' => 0,
                            'credit' => $totalPriceDifference,
                            'balance' => -$totalPriceDifference
                        ]);

                        $oldTotalProductStandardPrice = $product->standard_price * $oldQuantity;
                        $currentTotalProductStandardPrice = $product->standard_price * $currentQuantity;

                        if ($oldTotalProductStandardPrice > $currentTotalProductStandardPrice) {
                            $totalProductStandardPriceDifference = $oldTotalProductStandardPrice - $currentTotalProductStandardPrice;
                        } else {
                            $totalProductStandardPriceDifference = $currentTotalProductStandardPrice - $oldTotalProductStandardPrice;
                        }

                        JournalItem::create([
                            'journal_entry_id' => $createStockValuationJournalEntry->id,
                            'chart_of_account_id' => $setting->inventory_account_id,
                            'sale_order_line_id' => $saleOrderLine->id,
                            'account_id' => $setting->inventory_account_id,
                            'label' => $product->name . " - " . "Stock Valuation",
                            'debit' => $totalProductStandardPriceDifference,
                            'credit' => 0,
                            'balance' => $totalProductStandardPriceDifference
                        ]);

                        ChartOfAccount::updateChartOfAccountBalance($setting->account_receivable_id);
                        ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
                    } else if ($currentTotalPrice > $oldTotalPrice) {
                        if ($oldQuantity > $listProduct['quantity']) {
                            $quantityDifference = $oldQuantity - $listProduct['quantity'];
                            Product::decreaseStock($saleOrderLine->product_id, $quantityDifference);
                        } else if ($oldQuantity < $listProduct['quantity']) {
                            $quantityDifference = $listProduct['quantity'] - $oldQuantity;
                            Product::increaseStock($saleOrderLine->product_id, $quantityDifference);
                        }

                        $totalPriceDifference = $currentTotalPrice - $oldTotalPrice;

                        $saleOrderLine->update([
                            'product_id' => $listProduct['product_id'],
                            'quantity' => $listProduct['quantity'],
                            'price' => $listProduct['price'],
                            'discount' => $listProduct['discount'],
                            'total' => $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount']
                        ]);

                        JournalItem::create([
                            'journal_entry_id' => $createPurchaseJournalEntry->id,
                            'chart_of_account_id' => $setting->account_receivable_id,
                            'sale_order_line_id' => $saleOrderLine->id,
                            'label' => $product->name,
                            'account_id' => $setting->account_receivable_id,
                            'debit' => $totalPriceDifference,
                            'credit' => 0,
                            'balance' => $totalPriceDifference
                        ]);

                        $oldTotalProductStandardPrice = $product->standard_price * $oldQuantity;
                        $currentTotalProductStandardPrice = $product->standard_price * $currentQuantity;

                        if ($oldTotalProductStandardPrice > $currentTotalProductStandardPrice) {
                            $totalProductStandardPriceDifference = $oldTotalProductStandardPrice - $currentTotalProductStandardPrice;
                        } else {
                            $totalProductStandardPriceDifference = $currentTotalProductStandardPrice - $oldTotalProductStandardPrice;
                        }

                        JournalItem::create([
                            'journal_entry_id' => $createStockValuationJournalEntry->id,
                            'chart_of_account_id' => $setting->inventory_account_id,
                            'sale_order_line_id' => $saleOrderLine->id,
                            'account_id' => $setting->inventory_account_id,
                            'label' => "Stock Valuation - $product->name",
                            'debit' => $totalProductStandardPriceDifference,
                            'credit' => 0,
                            'balance' => $totalProductStandardPriceDifference
                        ]);

                        ChartOfAccount::updateChartOfAccountBalance($setting->account_receivable_id);
                        ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
                    } else if ($currentTotalPrice == $oldTotalPrice) {
                        if ($oldQuantity > $currentQuantity) {
                            $quantityDifference = $oldQuantity - $currentQuantity;
                            Product::decreaseStock($saleOrderLine->product_id, $quantityDifference);
                        } else if ($oldQuantity < $currentQuantity) {
                            $quantityDifference = $currentQuantity - $oldQuantity;
                            Product::increaseStock($saleOrderLine->product_id, $quantityDifference);
                        }

                        $saleOrderLine->update([
                            'product_id' => $listProduct['product_id'],
                            'quantity' => $listProduct['quantity'],
                            'price' => $listProduct['price'],
                            'discount' => $listProduct['discount'],
                            'total' => $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount']
                        ]);

                        Product::updateStandardPrice($saleOrderLine->product_id);
                    }

                    Product::updateStandardPrice($saleOrderLine->product_id);
                } else {
                    $productStandardPrice = Product::find($product['product_id'])->standard_price * $product['quantity'];


                    $createSaleOrderLine = SaleOrderLine::create([
                        'sale_order_id' => $saleOrder->id,
                        'product_id' => $listProduct['product_id'],
                        'quantity' => $listProduct['quantity'],
                        'price' => $listProduct['price'],
                        'discount' => $listProduct['discount'],
                        'total' => $listProduct['quantity'] * $listProduct['price'] - $listProduct['discount']
                    ]);

                    Product::increaseStock($createSaleOrderLine->product_id, $createSaleOrderLine->quantity);

                    $totalPrice = $createSaleOrderLine->total;

                    JournalItem::create([
                        'journal_entry_id' => $createPurchaseJournalEntry->id,
                        'chart_of_account_id' => $setting->account_receivable_id,
                        'sale_order_line_id' => $createSaleOrderLine->id,
                        'label' => $product->name,
                        'debit' => $totalPrice,
                        'credit' => 0,
                        'balance' => $totalPrice
                    ]);

                    JournalItem::create([
                        'journal_entry_id' => $createStockValuationJournalEntry->id,
                        'chart_of_account_id' => $setting->inventory_account_id,
                        'sale_order_line_id' => $createSaleOrderLine->id,
                        'label' => "Stock Valuation - $product->name",
                        'debit' => $productStandardPrice,
                        'credit' => 0,
                        'balance' => $productStandardPrice
                    ]);

                    Product::updateStandardPrice($createSaleOrderLine->product_id);
                    ChartOfAccount::updateChartOfAccountBalance($setting->account_receivable_id);
                    ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
                }
            }

            $saleOrder->update([
                'customer_id' => (int) $request->customer_id,
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

        return redirect()->route('sales')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Sales order has been updated.'
            ]
        ]);
    }
}
