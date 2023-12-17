<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Journal;

class JournalEntries extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'accounting_date',
        'reference',
        'status',
        'journal_id',
        'sale_order_id',
        'purchase_order_id',
    ];

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
}
