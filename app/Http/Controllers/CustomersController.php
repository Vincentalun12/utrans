<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomersController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Partners/Customers/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Partners/Customers/Create');
    }
}
