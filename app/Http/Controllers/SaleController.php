<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Orders/Sales/Index');
    }

    public function detail()
    {
        return Inertia::render('Dashboard/Orders/Sales/Detail');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Orders/Sales/Create');
    }
}
