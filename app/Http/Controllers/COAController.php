<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class COAController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Account/COA/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Account/COA/Create');
    }
}
