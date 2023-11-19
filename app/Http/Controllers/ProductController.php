<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Inventory/Products/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Inventory/Products/Create');
    }
}
