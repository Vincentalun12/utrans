<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class JournalItemsController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Account/Journalitems/Index');
    }
}