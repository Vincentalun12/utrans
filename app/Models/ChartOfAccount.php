<?php

namespace App\Models;

use App\Models\JournalItem;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ChartOfAccount extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'account_name',
        'account_type',
        'balance'
    ];

    public function journals()
    {
        return $this->hasMany(Journal::class);
    }

    public static function getTotalChartOfAccountBalance($chartOfAccountId)
    {
        $allPostedJournalItems = JournalItem::whereHas('journalEntry', function ($query) {
            $query->where('status', '=', 'posted');
        })->where('chart_of_account_id', $chartOfAccountId)->with(['journalEntry'])->get();

        $totalDebit = $allPostedJournalItems->sum('debit');
        $totalCredit = $allPostedJournalItems->sum('credit');

        $totalBalance = $allPostedJournalItems != null ? $totalDebit - $totalCredit : 0;

        return $totalBalance;
    }

    public static function updateChartOfAccountBalance($chartOfAccountId)
    {

        $totalBalance = self::getTotalChartOfAccountBalance($chartOfAccountId);
        $chartOfAccount = self::find($chartOfAccountId);
        $chartOfAccount->balance = $totalBalance;
        $chartOfAccount->save();

        return $chartOfAccount->balance;
    }

    public static function updatePurchaseChartOfAccountBalance()
    {
        $setting = Setting::first();
        $purchaseOrderLines = PurchaseOrderLine::with(['purchaseOrder'])->whereHas('purchaseOrder', function ($query) {
            $query->where('status', '=', 'posted');
        })->get();
        $total = 0;

        foreach ($purchaseOrderLines as $purchaseOrderLine) {
            $total += $purchaseOrderLine->total_price;
        }

        $chartOfAccount = self::find($setting->purchase_account_id);
        $chartOfAccount->balance = $total;
        $chartOfAccount->save();

        return $total;
    }
}
