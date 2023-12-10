<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Brand;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $data = [
            'products' => Product::with(['brand'])->get()
        ];

        return Inertia::render('Dashboard/Inventory/Products/Index', $data);
    }

    public function create()
    {
        $data = [
            'brands' => Brand::all()
        ];

        return Inertia::render('Dashboard/Inventory/Products/Create', $data);
    }

    public function store(Request $request)
    {
        $request->request->add([
            'code' => Product::generateCode(data: $request->all())
        ]);

        $request->validate([
            'brand_id' => 'required',
            'code' => 'required|unique:products',
            'name' => 'required',
            'retail_price' => 'required',
            'whole_sale_price' => 'required',
        ]);

        Product::create([
            'brand_id' => $request->brand_id,
            'code' => $request->code,
            'name' => $request->name,
            'description' => $request->description,
            'retail_price' => $request->retail_price,
            'whole_sale_price' => $request->whole_sale_price,
            'standard_price' => 0,
            'stock' => 0,
        ]);

        return redirect()->route('products')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Product created successfully'
            ]
        ]);
    }

    public function edit($id)
    {
        $data = [
            'product' => Product::with(['brand'])->find($id),
            'brands' => Brand::all()
        ];

        return Inertia::render('Dashboard/Inventory/Products/Edit', $data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'retail_price' => 'required',
            'whole_sale_price' => 'required',
        ]);

        $product = Product::find($id);

        if ($product->brand_id != $request->brand_id) {
            $request->request->add([
                'code' => Product::generateCode(data: $request->all())
            ]);

            $request->validate([
                'code' => 'required|unique:products',
            ]);

            $updateData = [
                'brand_id' => $request->brand_id,
                'code' => $request->code,
                'name' => $request->name,
                'description' => $request->description,
                'retail_price' => $request->retail_price,
                'whole_sale_price' => $request->whole_sale_price,
            ];
        } else {

            $updateData = [
                'brand_id' => $request->brand_id,
                'name' => $request->name,
                'description' => $request->description,
                'retail_price' => $request->retail_price,
                'whole_sale_price' => $request->whole_sale_price,
            ];
        }

        $product->update($updateData);

        return redirect()->route('products')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Product updated successfully'
            ]
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        $product->delete();

        return redirect()->route('products')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Product deleted successfully'
            ]
        ]);
    }
}
