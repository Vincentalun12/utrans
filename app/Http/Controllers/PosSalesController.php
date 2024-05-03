<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PosSalesController extends Controller
{
    public function index()
    {
    
        return Inertia::render('Dashboard/Orders/PosSales/Index');
    }

    public function detail()
    {
        return Inertia::render('Dashboard/Orders/PosSales/Detail');
    }

    public function create()
    {

    }

    public function store(Request $request)
    {

    }

    public function edit($id)
    {
        return Inertia::render('Dashboard/Orders/PosSales/Edit');
    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {

    }
}