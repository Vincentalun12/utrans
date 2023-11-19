<?php

namespace App\Http\Controllers;

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
}
