<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;

class BrandController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => env('UTRANS_API_BASE_URL'),
        ]);
    }

    public function index()
    {
        $request = $this->client->get('Brand');

        $response = json_decode($request->getBody()->getContents());

        $data = [
            'brands' => $response,
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

        $this->client->request('POST', 'Brand', [
            'json' => [
                'code' => $request->code,
                'name' => $request->name,
                'number' => $request->number,
                'email' => $request->email,
                'website' => $request->website,
            ]
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
        $request = $this->client->request('GET', 'Brand/' . $id);

        $response = json_decode($request->getBody()->getContents());

        return Inertia::render('Dashboard/Inventory/Brand/Edit', [
            'brand' => $response,
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->client->request('PUT', 'Brand/' . $id, [
            'json' => [
                'name' => $request->name,
                'number' => $request->number,
                'email' => $request->email,
                'website' => $request->website,
            ]
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
        $this->client->request('DELETE', 'Brand/' . $id);

        return redirect()->route('brands')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Brand deleted.'
            ]
        ]);
    }
}
