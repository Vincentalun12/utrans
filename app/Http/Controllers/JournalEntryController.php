<?php

namespace App\Http\Controllers;

use App\Models\JournalEntries;
use App\Models\Journal;
use App\Models\ChartOfAccount;
use App\Models\JournalItem;
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

    public function store(Request $request)
    {
        $generateCode = JournalEntries::generateCode(
            data: [
                'journal_id' => $request->journal_id,
            ]
        );

        $request->request->add([
            'code' => $generateCode,
        ]);

        $request->validate([
            'code' => 'required',
            'status' => 'required',
            'accouting_date' => 'required',
            'journal_id' => 'required',
        ]);

        $createJournalEntry = JournalEntries::create([
            'code' => $request->code,
            'status' => $request->status,
            'accouting_date' => $request->accouting_date,
            'journal_id' => $request->journal_id,
            'reference' => $request->reference,
            'sale_order_id' => $request->sale_order_id,
            'purchase_order_id' => $request->purchase_order_id,
        ]);


        foreach ($request->journal_items as $item) {
            $request->validate([
                'journal_items.*.chart_of_account_id' => 'required',
                'journal_items.*.debit' => 'required',
                'journal_items.*.credit' => 'required',
            ]);

            $journalItemBalance = $item['debit'] - $item['credit'];

            JournalItem::create([
                'journal_entry_id' => $createJournalEntry->id,
                'chart_of_account_id' => $item['chart_of_account_id'],
                'label' => $item['label'],
                'debit' => $item['debit'],
                'credit' => $item['credit'],
                'balance' => $journalItemBalance,
            ]);

            $chartOfAccount = ChartOfAccount::find($item['chart_of_account_id']);
            $chartOfAccount->balance = $chartOfAccount->balance + $journalItemBalance;
        }

        return redirect()->route('journalentries')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Journal Entry created successfully'
            ]
        ]);
    }
}
