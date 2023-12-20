<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Setting extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sales_account_id',
        'purchase_account_id',
        'inventory_account_id',
        'fixed_assets_account_id',
        'cost_of_goods_sold_account_id',
        'account_payable_id',
        'account_receivable_id',
        'stock_valuation_journal_id',
        'sales_journal_id',
        'purchase_journal_id'
    ];

    public static function getSetting()
    {
        $setting = self::first();
        $sales_account_id = $setting?->sales_account_id;
        $purchase_account_id = $setting?->purchase_account_id;
        $inventory_account_id = $setting?->inventory_account_id;
        $fixed_assets_account_id = $setting?->fixed_assets_account_id;
        $cost_of_goods_sold_account_id = $setting?->cost_of_goods_sold_account_id;
        $account_payable_id = $setting?->account_payable_id;
        $account_receivable_id = $setting?->account_receivable_id;
        $stock_valuation_journal_id = $setting?->stock_valuation_journal_id;
        $sales_journal_id = $setting?->sales_journal_id;
        $purchase_journal_id = $setting?->purchase_journal_id;

        if (!$sales_account_id || !$purchase_account_id || !$inventory_account_id || !$fixed_assets_account_id || !$cost_of_goods_sold_account_id || !$account_payable_id || !$account_receivable_id || !$stock_valuation_journal_id || !$sales_journal_id || !$purchase_journal_id) {
            return false;
        }

        return $setting;
    }
}
