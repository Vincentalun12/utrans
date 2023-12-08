<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Inventory/Brand/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Inventory/Brand/Create');
    }

}
