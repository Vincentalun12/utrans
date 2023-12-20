<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'vendor_id',
        'create_date',
        'total_item',
        'total_price',
        'total_paid',
        'total_due',
        'status',
        'payment_status',
        'user_id',
    ];

    public static function generateCode()
    {
        $lastPurchase = self::withTrashed()->orderBy('id', 'desc')->first();
        $currentYear = date('Y');

        if (!$lastPurchase) {
            return "PO-$currentYear-0001";
        }

        $code = substr($lastPurchase->code, 6);
        $code = (int) $code + 1;
        $code = "PO-$currentYear" . substr('0000', 0, 4 - strlen($code)) . $code;

        return $code;
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function purchaseOrderLines()
    {
        return $this->hasMany(PurchaseOrderLine::class);
    }
}
