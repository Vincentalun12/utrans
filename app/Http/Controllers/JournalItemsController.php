<?php

namespace App\Http\Controllers;

use App\Models\JournalItem;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JournalItemsController extends Controller
{
    public function index()
    {
        $data = [
            'journalitems' => JournalItem::with(['journalEntry', 'chartOfAccount'])->get(),
        ];

        return Inertia::render('Dashboard/Account/JournalItems/Index', $data);
    }
}
