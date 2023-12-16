<?php

namespace App\Http\Controllers;

use App\Models\JournalEntries;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JournalEntryController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Account/Journalentries/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Account/Journalentries/Create');
    }

    public function detail()
    {
        return Inertia::render('Dashboard/Account/Journalentries/Detail');
    }
}
