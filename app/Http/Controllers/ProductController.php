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
            'products' => Product::all()
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
            'sales_price' => 'required',
        ]);

        Product::create([
            'brand_id' => $request->brand_id,
            'code' => $request->code,
            'name' => $request->name,
            'description' => $request->description,
            'sales_price' => $request->sales_price,
            'stock' => 0,
            'standard_price' => 0,
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
            'product' => Product::find($id),
            'brands' => Brand::all()
        ];

        return Inertia::render('Dashboard/Inventory/Products/Edit', $data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'sales_price' => 'required',
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
                'sales_price' => $request->sales_price,
            ];
        } else {

            $updateData = [
                'brand_id' => $request->brand_id,
                'name' => $request->name,
                'description' => $request->description,
                'sales_price' => $request->sales_price,
            ];
        }

        Product::find($id)->update([
            'brand_id' => $updateData['brand_id'],
            'code' => $updateData['code'],
            'name' => $updateData['name'],
            'description' => $updateData['description'],
            'sales_price' => $updateData['sales_price'],
        ]);

        return redirect()->route('products')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Product updated successfully'
            ]
        ]);
    }

    public function destroy($id)
    {
        Product::destroy($id);

        return redirect()->route('products')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Product deleted successfully'
            ]
        ]);
    }
}
