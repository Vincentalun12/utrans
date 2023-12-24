<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;

class CustomerController extends Controller
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
        $request = $this->client->get('Customer');
        $response = json_decode($request->getBody()->getContents());

        $data = [
            'customers' => $response
        ];

        return Inertia::render('Dashboard/Partners/Customers/Index', $data);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Partners/Customers/Create');
    }

    public function store(Request $request)
    {
        $request->request->add(['code' => Customer::generateCode()]);

        $request->validate([
            'code' => 'required|unique:customers',
            'name' => 'required',
        ]);

        $request = $this->client->request('POST', 'Customer', [
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

        return redirect()->route('customers')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Customer created successfully'
            ]
        ]);
    }

    public function edit($id)
    {
        $request = $this->client->get('Customer/' . $id);
        $customer = json_decode($request->getBody()->getContents());

        return Inertia::render('Dashboard/Partners/Customers/Edit', [
            'customer' => $customer
        ]);
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $request->validate([
            'name' => 'required',
        ]);

        $request = $this->client->request('PUT', 'Customer/' . $id, [
            'json' => [
                'code' => $customer->code,
                'name' => $request->name,
                'address' => $request->address,
                'district' => $request->district,
                'city' => $request->city,
                'phone' => $request->phone,
                'email' => $request->email,
            ]
        ]);

        // $customer->update([
        //     'name' => $request->name,
        //     'address' => $request->address,
        //     'district' => $request->district,
        //     'city' => $request->city,
        //     'phone' => $request->phone,
        //     'email' => $request->email,
        // ]);

        return redirect()->route('customers')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Customer updated successfully'
            ]
        ]);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);

        $customer->delete();

        return redirect()->route('customers')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Customer deleted successfully'
            ]
        ]);
    }
}
