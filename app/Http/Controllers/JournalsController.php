<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JournalsController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Account/Journals/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Account/Journals/Create');
    }
}
