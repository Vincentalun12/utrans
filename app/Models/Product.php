<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'brand_id',
        'code',
        'name',
        'description',
        'stock',
        'sales_price',
        'standard_price',
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public static function generateCode($data)
    {
        $brand = Brand::find($data['brand_id']);
        $previous_product = self::withTrashed()->where('brand_id', $data['brand_id'])->orderBy('id', 'desc')->first();

        if (!$previous_product) {
            $string = strtoupper($brand->name) . '-' . date("Y") . '-' . "0001";
            return $string;
        } else {
            $explode_previous_product_code = explode('-', $previous_product->code);
            $previous_product_code = $explode_previous_product_code[2];
            $string = strtoupper($brand->name) . '-' . date("Y") . '-' . sprintf('%04d', $previous_product_code + 1);
            return $string;
        }
    }

    public static function updateStandardPrice($productId)
    {
        // Using AVCO (Average Cost Valuation Method) to calculate standard price
        $product = self::find($productId);
        $purchaseOrderLines = PurchaseOrderLine::where('product_id', $productId)->get();
        $totalQuantity = 0;
        $totalPrice = 0;

        foreach ($purchaseOrderLines as $purchaseOrderLine) {
            $totalQuantity += $purchaseOrderLine->quantity;
            $totalPrice += $purchaseOrderLine->quantity * $purchaseOrderLine->price;
        }

        $standardPrice = $totalPrice / $totalQuantity;

        $product->update([
            'standard_price' => $standardPrice
        ]);

        return $standardPrice;
    }
}
