<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SaleOrderLine extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sale_order_id',
        'product_id',
        'quantity',
        'price',
        'discount',
        'total',
    ];

    public function saleOrder()
    {
        return $this->belongsTo(saleOrder::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
