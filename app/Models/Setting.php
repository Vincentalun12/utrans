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
        'current_assets_account_id',
        'fixed_assets_account_id',
        'cost_of_goods_sold_account_id',
        'stock_valuation_journal_id',
        'sales_journal_id',
        'purchase_journal_id'
    ];

    public function getSetting()
    {
        return ChartOfAccount::take(1)->first();
    }
}
