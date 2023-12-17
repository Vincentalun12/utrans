<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
}
