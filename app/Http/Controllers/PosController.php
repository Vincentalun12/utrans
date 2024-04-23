<?php

namespace App\Http\Controllers;

use App\Models\PointOfSales;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index()
    {


        return Inertia::render('Dashboard/Pos/Index');
    }

    

}

