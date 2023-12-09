<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $data = [
            'brands' => Brand::all(),
        ];

        return Inertia::render('Dashboard/Inventory/Brand/Index', $data);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Inventory/Brand/Create');
    }

    public function store(Request $request)
    {
        $request->request->add([
            'code' => Brand::generateCode(),
        ]);

        $request->validate([
            'code' => 'required|unique:brands,code',
            'name' => 'required',
        ]);

        Brand::create([
            'code' => $request->code,
            'name' => $request->name,
            'number' => $request->number,
            'email' => $request->email,
            'website' => $request->website,
        ]);

        return redirect()->route('brands')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Brand created.'
            ]
        ]);
    }

    public function edit($id)
    {
        $brand = Brand::findOrFail($id);

        return Inertia::render('Dashboard/Inventory/Brand/Edit', [
            'brand' => $brand,
        ]);
    }

    public function update(Request $request, $id)
    {
        $brand = Brand::findOrFail($id);

        $brand->update([
            'name' => $request->name,
            'number' => $request->number,
            'email' => $request->email,
            'website' => $request->website,
        ]);

        return redirect()->route('brands')->with('success', 'Brand updated.');
    }

    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);

        $brand->delete();

        return redirect()->route('brands')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Brand deleted.'
            ]
        ]);
    }
}
