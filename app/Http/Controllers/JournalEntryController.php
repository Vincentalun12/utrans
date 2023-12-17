<?php

namespace App\Http\Controllers;

use App\Models\JournalEntries;
use App\Models\Journal;
use App\Models\ChartOfAccount;

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
        $data = [
            'journals' => Journal::all(),
            'accounts' => ChartOfAccount::all(),
        ];

        return Inertia::render('Dashboard/Account/Journalentries/Create', $data);
    }

    public function detail()
    {
        return Inertia::render('Dashboard/Account/Journalentries/Detail');
    }
}
