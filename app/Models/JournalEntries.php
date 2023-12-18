<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Dyrynda\Database\Support\CascadeSoftDeletes;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Journal;
use App\Models\ChartOfAccount;


class JournalEntries extends Model
{
    use HasFactory, SoftDeletes, CascadeSoftDeletes;

    protected $cascadeDeletes = ['journalItems'];

    protected $fillable = [
        'code',
        'accounting_date',
        'reference',
        'status',
        'journal_id',
        'sale_order_id',
        'purchase_order_id',
    ];

    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }

    public function journalItems()
    {
        return $this->hasMany(JournalItem::class, 'journal_entry_id');
    }

    public static function generateCode($data)
    {
        $lastJournalEntriesWithYear = self::where('journal_id', $data['journal_id'])->whereYear('created_at', date('Y'))->orderBy('id', 'desc')->first();
        $journalCode = Journal::find($data['journal_id'])->code;
        $currentYear = date('Y');

        if (!$lastJournalEntriesWithYear) {
            return "$journalCode-$currentYear-0001";
        }

        $lastJournalEntriesWithYearCode = explode('-', $lastJournalEntriesWithYear->code);
        $newJournalEntriesCode = sprintf('%04d', $lastJournalEntriesWithYearCode[2] + 1);

        return "$journalCode-$currentYear-$newJournalEntriesCode";
    }

    public static function deleteUnnecessaryJournalItems($id, $newItems)
    {
        $journalItems = JournalItem::where('journal_entry_id', $id)->get();

        foreach ($journalItems as $journalItem) {
            $isJournalItemExist = false;

            foreach ($newItems as $newItem) {
                if ($journalItem->id == $newItem['id']) {
                    $isJournalItemExist = true;
                }
            }

            if (!$isJournalItemExist) {
                $journalItem->delete();
            }

            ChartOfAccount::updateChartOfAccountBalance($journalItem->chart_of_account_id);
        }
    }
}
