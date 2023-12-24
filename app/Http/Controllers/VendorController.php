<?php

namespace App\Http\Controllers;

use App\Models\Vendor;

use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;

class VendorController extends Controller
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
        $request = $this->client->get('Vendor');
        $response = json_decode($request->getBody()->getContents());

        $data = [
            'vendors' => $response
        ];

        return Inertia::render('Dashboard/Partners/Vendors/Index', $data);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Partners/Vendors/Create');
    }

    public function store(Request $request)
    {
        $request->request->add(['code' => Vendor::generateCode()]);

        $request->validate([
            'code' => 'required|unique:vendors',
        ]);

        $request = $this->client->post('Vendor', [
            'json' => [
                'code' => $request->code,
                'name' => $request->name,
                'address' => $request->address,
                'district' => $request->district,
                'city' => $request->city,
                'phone' => $request->phone,
                'email' => $request->email,
            ]
        ]);

        return redirect()->route('vendors')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Vendor created successfully'
            ]
        ]);
    }

    public function edit($id)
    {
        $request = $this->client->get('Vendor/' . $id);
        $response = json_decode($request->getBody()->getContents());

        return Inertia::render('Dashboard/Partners/Vendors/Edit', [
            'vendor' => $response
        ]);
    }

    public function update(Request $request, $id)
    {
        $vendor = Vendor::findOrFail($id);

        $request->validate([
            'name' => 'required',
        ]);

        $request = $this->client->put('Vendor/' . $id, [
            'json' => [
                'code' => $vendor->code,
                'name' => $request->name,
                'address' => $request->address,
                'district' => $request->district,
                'city' => $request->city,
                'phone' => $request->phone,
                'email' => $request->email,
            ]
        ]);

        return redirect()->route('vendors')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Vendor updated successfully'
            ]
        ]);
    }

    public function destroy($id)
    {
        $vendor = Vendor::findOrFail($id);

        $vendor->delete();

        return redirect()->route('vendors')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Vendor deleted successfully'
            ]
        ]);
    }
}
