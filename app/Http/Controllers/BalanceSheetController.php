<?php

namespace App\Http\Controllers;

use App\Models\ChartOfAccount;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BalanceSheetController extends Controller
{
    public function index()
    {
        $data = [
            'coa' => ChartOfAccount::all()
        ];

        return Inertia::render('Dashboard/Reports/BalanceSheet/Index', $data);
    }

    

}