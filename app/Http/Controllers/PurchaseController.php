<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Vendor;
use App\Models\Product;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Orders/Purchases/Index');
    }

    public function detail()
    {
        return Inertia::render('Dashboard/Orders/Purchases/Detail');
    }

    public function create()
    {
        $data = [
            'vendors' => Vendor::all(),
            'products' => Product::all(),
        ];

        return Inertia::render('Dashboard/Orders/Purchases/Create', $data);
    }
}
