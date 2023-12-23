<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\SaleOrderLine;
use App\Models\Customer;

class SaleOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'customer_id',
        'create_date',
        'total_item',
        'total_price',
        'total_paid',
        'total_due',
        'status',
        'payment_status',
        'user_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function saleOrderLines()
    {
        return $this->hasMany(SaleOrderLine::class);
    }

    public static function generateCode()
    {
        $lastSale = self::withTrashed()->orderBy('id', 'desc')->first();
        $currentYear = date('Y');

        if (!$lastSale) {
            return "SO-$currentYear-0001";
        }

        $code = substr($lastSale->code, 6);
        $code = (int) $code + 1;
        $code = "SO-$currentYear" . substr('0000', 0, 4 - strlen($code)) . $code;

        return $code;
    }

    public static function deleteUnnecessarySaleOrderLine($id, $newItems)
    {
        $saleOrder = SaleOrder::find($id);
        $saleOrderLines = SaleOrderLine::where('sale_order_id', $id)->get();
        $setting = Setting::first();

        $newItemIds = collect($newItems)->pluck('id')->toArray();
        $oldItemIds = $saleOrderLines->pluck('id')->toArray();

        $deleteItemIds = array_diff($oldItemIds, $newItemIds);

        if (count($deleteItemIds) > 0) {
            $createReturnSaleJournalEntry = JournalEntries::create([
                'code' => JournalEntries::generateCode([
                    'journal_id' => $setting->sales_journal_id,
                ]),
                'accounting_date' => date('Y-m-d'),
                'reference' => "Sale Order - $saleOrder->code",
                'status' => 'posted',
                'journal_id' => $setting->sales_journal_id,
                'purchase_order_id' => $saleOrder->id,
            ]);

            $createReturnStockValuationJournalEntry = JournalEntries::create([
                'code' => JournalEntries::generateCode([
                    'journal_id' => $setting->stock_valuation_journal_id,
                ]),
                'accounting_date' => date('Y-m-d'),
                'reference' => "Stock Valuation - $saleOrder->code",
                'status' => 'posted',
                'journal_id' => $setting->stock_valuation_journal_id,
                'purchase_order_id' => $saleOrder->id,
            ]);
        }

        foreach ($saleOrderLines as $saleOrderLine) {
            $product = Product::find($saleOrderLine->product_id);
            $isSaleOrderLineExist = false;

            foreach ($newItems as $newItem) {
                if ($saleOrderLine->id == $newItem['id']) {
                    $isSaleOrderLineExist = true;
                }
            }

            if (!$isSaleOrderLineExist) {
                JournalItem::create([
                    'journal_entry_id' => $createReturnSaleJournalEntry->id,
                    'chart_of_account_id' => $setting->account_receivable_id,
                    'label' => $product->name,
                    'debit' => 0,
                    'credit' => $saleOrderLine->total,
                    'balance' => -$saleOrderLine->total,
                ]);

                JournalItem::create([
                    'journal_entry_id' => $createReturnStockValuationJournalEntry->id,
                    'chart_of_account_id' => $setting->inventory_account_id,
                    'label' => "Stock Valuation - $product->name",
                    'debit' => $saleOrderLine->total,
                    'credit' => 0,
                    'balance' => $saleOrderLine->total,
                ]);

                Product::increaseStock($saleOrderLine->product_id, $saleOrderLine->quantity);
                $saleOrderLine->delete();
            }
        }

        ChartOfAccount::updateChartOfAccountBalance($setting->sales_account_id);
        ChartOfAccount::updateChartOfAccountBalance($setting->inventory_account_id);
    }
}
