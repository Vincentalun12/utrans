<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorsController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Partners/Vendors/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Partners/Vendors/Create');
    }
}
