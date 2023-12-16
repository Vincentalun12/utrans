<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Journal extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'journal_name',
        'journal_type',
        'chart_of_account_id'
    ];

    public function chart_of_account()
    {
        return $this->belongsTo(COA::class);
    }
}
