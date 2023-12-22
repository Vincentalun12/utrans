<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'journal_id',
        'purchase_order_id',
        'sale_order_id',
        'date',
        'reference',
        'notes',
        'amount',
    ];
}
