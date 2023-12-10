<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vendor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'name',
        'address',
        'district',
        'city',
        'phone',
        'email',
    ];

    public static function generateCode()
    {
        $lastVendor = self::withTrashed()->orderBy('id', 'desc')->first();

        if (!$lastVendor) {
            return 'VEN-0001';
        }

        $lastVendorNumber = substr($lastVendor->code, 4);

        return 'VEN-' . sprintf('%04d', $lastVendorNumber + 1);
    }
}
