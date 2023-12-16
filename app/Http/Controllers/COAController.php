<?php

namespace App\Http\Controllers;

use App\Models\ChartOfAccount;

use Illuminate\Http\Request;
use Inertia\Inertia;

class COAController extends Controller
{
    public function index()
    {
        $data = [
            'coa' => ChartOfAccount::all()
        ];

        return Inertia::render('Dashboard/Account/Coa/Index', $data);
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

        ChartOfAccount::create([
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

    public function edit($id)
    {
        $data = [
            'coa' => ChartOfAccount::find($id)
        ];

        return Inertia::render('Dashboard/Account/Coa/Edit', $data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'code' => 'required',
            'account_name' => 'required',
            'account_type' => 'required',
        ]);

        ChartOfAccount::find($id)->update([
            'code' => $request->code,
            'account_name' => $request->account_name,
            'account_type' => $request->account_type,
        ]);

        return redirect()->route('coa')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Chart of Account updated successfully'
            ]
        ]);
    }

    public function destroy($id)
    {
        ChartOfAccount::find($id)->delete();

        return redirect()->route('coa')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Chart of Account deleted successfully'
            ]
        ]);
    }
}
