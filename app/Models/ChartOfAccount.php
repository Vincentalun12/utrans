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
        $totalBalance = $totalDebit - $totalCredit;

        return $totalBalance;
    }

    public static function updateChartOfAccountBalance($chartOfAccountId)
    {
        $totalBalance = self::getTotalChartOfAccountBalance($chartOfAccountId);

        self::find($chartOfAccountId)->update([
            'balance' => $totalBalance,
        ]);
    }
}
