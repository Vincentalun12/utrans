<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JournalEntries extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'date',
        'journal_entry_name',
        'journal_entry_type',
        'journal_id'
    ];
}
