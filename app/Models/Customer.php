<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
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
        $lastCustomer = Customer::orderBy('id', 'desc')->first();

        if (!$lastCustomer) {
            return 'CUS-0001';
        }

        $lastCustomerNumber = substr($lastCustomer->code, 4);

        return 'CUS-' . sprintf('%04d', $lastCustomerNumber + 1);
    }
}
