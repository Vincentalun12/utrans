<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'name',
        'number',
        'email',
        'website'
    ];

    public static function generateCode()
    {
        $lastBrand = self::withTrashed()->orderBy('id', 'desc')->first();

        if (!$lastBrand) {
            return 'BRAND-0001';
        }

        $code = substr($lastBrand->code, 6);
        $code = (int) $code + 1;
        $code = 'BRAND-' . substr('0000', 0, 4 - strlen($code)) . $code;

        return $code;
    }
}
