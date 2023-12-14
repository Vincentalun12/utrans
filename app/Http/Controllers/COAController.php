<?php

namespace App\Http\Controllers;

use App\Models\COA;

use Illuminate\Http\Request;
use Inertia\Inertia;

class COAController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Account/Coa/Index');
    }

    public function create()
    {
        return Inertia::render('Dashboard/Account/Coa/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required',
            'account_name' => 'required',
            'account_type' => 'required',
        ]);

        COA::create([
            'code' => $request->code,
            'account_name' => $request->account_name,
            'account_type' => $request->account_type,
            'balance' => 0,
        ]);

        return redirect()->route('coa')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Chart of Account created successfully'
            ]
        ]);
    }
}
