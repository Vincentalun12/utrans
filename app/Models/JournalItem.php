<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class JournalItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'journal_entry_id',
        'chart_of_account_id',
        'label',
        'debit',
        'credit',
        'balance',
    ];

    public function journalEntry()
    {
        return $this->belongsTo(JournalEntries::class, 'journal_entry_id');
    }

    public function chartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class);
    }

    public static function deleteUnnecessaryJournalItems($previousJournalItems, $currentJournalItems)
    {
        $previousJournalItemIds = array_column($previousJournalItems, 'id');
        $currentJournalItemIds = array_column($currentJournalItems, 'id');

        $journalItemIdsToDelete = array_diff($previousJournalItemIds, $currentJournalItemIds);

        foreach ($journalItemIdsToDelete as $journalItemId) {
            try {
                DB::beginTransaction();

                self::find($journalItemId)->delete();

                ChartOfAccount::updateChartOfAccountBalance($journalItemId);

                DB::commit();
            } catch (\Throwable $th) {
                DB::rollBack();

                throw $th;
            }
        }
    }
}
