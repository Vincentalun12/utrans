<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class COA extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "chart_of_accounts";

    protected $fillable = [
        'code',
        'account_name',
        'account_type',
        'balance'
    ];
}
