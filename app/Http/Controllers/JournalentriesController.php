<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JournalentriesController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Account/Journalentries/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Account/Journalentries/Create');
    }
}
