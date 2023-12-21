<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'vendor_id',
        'create_date',
        'total_item',
        'total_price',
        'total_paid',
        'total_due',
        'status',
        'payment_status',
        'user_id',
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function purchaseOrderLines()
    {
        return $this->hasMany(PurchaseOrderLine::class);
    }

    public static function generateCode()
    {
        $lastPurchase = self::withTrashed()->orderBy('id', 'desc')->first();
        $currentYear = date('Y');

        if (!$lastPurchase) {
            return "PO-$currentYear-0001";
        }

        $code = substr($lastPurchase->code, 6);
        $code = (int) $code + 1;
        $code = "PO-$currentYear" . substr('0000', 0, 4 - strlen($code)) . $code;

        return $code;
    }

    public static function deleteUnnecessaryPurchaseOrderLines($id, $newItems)
    {
        $purchaseOrder = PurchaseOrder::find($id);
        $purchaseOrderLines = PurchaseOrderLine::where('purchase_order_id', $id)->get();
        $setting = Setting::first();

        $newItemIds = collect($newItems)->pluck('id')->toArray();
        $oldItemIds = $purchaseOrderLines->pluck('id')->toArray();

        $deleteItemIds = array_diff($oldItemIds, $newItemIds);

        if (count($deleteItemIds) > 0) {
            $createReturnPurchaseJournalEntry = JournalEntries::create([
                'code' => JournalEntries::generateCode([
                    'journal_id' => $setting->purchase_journal_id,
                ]),
                'accounting_date' => date('Y-m-d'),
                'reference' => "Purchase Order - $purchaseOrder->code",
                'status' => 'posted',
                'journal_id' => $setting->purchase_journal_id,
                'purchase_order_id' => $purchaseOrder->id,
            ]);

            $createReturnStockValuationJournalEntry = JournalEntries::create([
                'code' => JournalEntries::generateCode([
                    'journal_id' => $setting->stock_valuation_journal_id,
                ]),
                'accounting_date' => date('Y-m-d'),
                'reference' => "Stock Valuation - $purchaseOrder->code",
                'status' => 'posted',
                'journal_id' => $setting->stock_valuation_journal_id,
                'purchase_order_id' => $purchaseOrder->id,
            ]);
        }

        foreach ($purchaseOrderLines as $purchaseOrderLine) {
            $product = Product::find($purchaseOrderLine->product_id);
            $isPurchaseOrderLineExist = false;

            foreach ($newItems as $newItem) {
                if ($purchaseOrderLine->id == $newItem['id']) {
                    $isPurchaseOrderLineExist = true;
                }
            }

            if (!$isPurchaseOrderLineExist) {
                JournalItem::create([
                    'journal_entry_id' => $createReturnPurchaseJournalEntry->id,
                    'chart_of_account_id' => $setting->account_payable_id,
                    'label' => $product->name,
                    'debit' => 0,
                    'credit' => $purchaseOrderLine->total,
                    'balance' => -$purchaseOrderLine->total,
                ]);

                JournalItem::create([
                    'journal_entry_id' => $createReturnStockValuationJournalEntry->id,
                    'chart_of_account_id' => $setting->inventory_account_id,
                    'label' => "Stock Valuation - $product->name",
                    'debit' => 0,
                    'credit' => $purchaseOrderLine->total,
                    'balance' => $purchaseOrderLine->total,
                ]);

                Product::decreaseStock($purchaseOrderLine->product_id, $purchaseOrderLine->quantity);
                $purchaseOrderLine->delete();
                Product::updateStandardPrice($product->id);
            }
        }

        ChartOfAccount::updateChartOfAccountBalance($setting->purchase_account_id);
        ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
    }
}
