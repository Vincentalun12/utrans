<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $data = [
            'brands' => Brand::all()
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
        return Inertia::render('Dashboard/Inventory/Brand/Edit', [
            'brand' => Brand::find($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        Brand::find($id)->update([
            'name' => $request->name,
            'number' => $request->number,
            'email' => $request->email,
            'website' => $request->website,
        ]);

        return redirect()->route('brands')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Brand updated.'
            ]
        ]);
    }

    public function destroy($id)
    {
        Brand::destroy($id);

        return redirect()->route('brands')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Brand deleted.'
            ]
        ]);
    }
}
