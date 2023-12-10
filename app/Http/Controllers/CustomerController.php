<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CustomerController extends Controller
{
    public function index()
    {
        $data = [
            'customers' => Customer::all()
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

        Customer::create([
            'code' => $request->code,
            'name' => $request->name,
            'address' => $request->address,
            'district' => $request->district,
            'city' => $request->city,
            'phone' => $request->phone,
            'email' => $request->email,
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
        $customer = Customer::findOrFail($id);

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

        $customer->update([
            'name' => $request->name,
            'address' => $request->address,
            'district' => $request->district,
            'city' => $request->city,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);

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
