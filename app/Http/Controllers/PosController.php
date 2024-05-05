<?php

namespace App\Http\Controllers;

use App\Models\PointOfSales;
use App\Models\Product;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index()
    {
        $data = [
            'products' => Product::all(),
        ];

        return Inertia::render('Dashboard/Pos/Index', $data);
    }
}
