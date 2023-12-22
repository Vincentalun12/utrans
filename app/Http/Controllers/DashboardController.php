<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Vendor;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'customers' => Customer::all(),
            'vendors' => Vendor::all()
        ];
        

        return Inertia::render("Dashboard/Index", $data);
    }
}
