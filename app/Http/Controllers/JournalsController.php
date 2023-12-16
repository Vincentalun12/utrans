<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\COA;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class JournalsController extends Controller
{
    public function index()
    {
        $data = [
            'journals' => Journal::with(['chart_of_account'])->get(),
        ];

        return Inertia::render('Dashboard/Account/Journals/Index', $data);
    }

    public function create()
    {
        $data = [
            'accounts' => COA::all(),
        ];

        return Inertia::render('Dashboard/Account/Journals/Create', $data);
    }

    public function store(Request $request)
    {
        $journalExistanceCheck = Journal::where('code', $request->code)->first();

        if ($journalExistanceCheck) {
            throw ValidationException::withMessages([
                'code' => 'Journal code already exists.',
            ]);
        }

        $request->validate([
            'code' => 'required',
            'journal_name' => 'required',
            'journal_type' => 'required',
            'chart_of_account_id' => 'required',
        ]);

        Journal::create([
            'code' => $request->code,
            'journal_name' => $request->journal_name,
            'journal_type' => $request->journal_type,
            'chart_of_account_id' => $request->chart_of_account_id,
        ]);

        return redirect()->route('journals')->with(['message' => [
            'type' => 'success',
            'content' => 'Journal has been created!',
        ]]);
    }

    public function edit($id)
    {
        $data = [
            'journal' => Journal::with(['chart_of_account'])->find($id),
            'accounts' => COA::all(),
        ];

        return Inertia::render('Dashboard/Account/Journals/Edit', $data);
    }

    public function update(Request $request, $id)
    {
        $journal = Journal::find($id);

        $request->validate([
            'code' => 'required',
            'journal_name' => 'required',
            'journal_type' => 'required',
            'chart_of_account' => 'required',
        ]);

        if ($journal->code != $request->code) {
            $journalExistanceCheck = Journal::where('code', $request->code)->first();

            if ($journalExistanceCheck) {
                throw ValidationException::withMessages([
                    'code' => 'Journal code already exists.',
                ]);
            }
        }

        $journal->update([
            'code' => $request->code,
            'journal_name' => $request->journal_name,
            'journal_type' => $request->journal_type,
            'chart_of_account_id' => $request->chart_of_account['value'],
        ]);

        return redirect()->route('journals')->with(['message' => [
            'type' => 'success',
            'content' => 'Journal has been updated!',
        ]]);
    }
}
