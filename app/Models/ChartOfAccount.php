<?php

namespace App\Models;

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
}