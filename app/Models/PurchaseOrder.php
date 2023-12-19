<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'number',
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

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function purchaseOrderLines()
    {
        return $this->hasMany(PurchaseOrderLine::class);
    }
}
