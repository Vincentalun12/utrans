<?php

namespace App\Http\Controllers;

use App\Models\JournalEntries;
use App\Models\Journal;
use App\Models\ChartOfAccount;
use App\Models\JournalItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
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
            'accounting_date' => 'required',
            'journal_id' => 'required',
        ]);

        try {
            DB::beginTransaction();
            $createJournalEntry = JournalEntries::create([
                'code' => $request->code,
                'status' => $request->status,
                'accounting_date' => Date::parse($request->accounting_date)->format('Y-m-d'),
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
                $chartOfAccount->save();
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('journalentries')->with([
                'message' => [
                    'type' => 'danger',
                    'content' => 'Journal Entry failed to create'
                ]
            ]);
        }



        return redirect()->route('journalentries')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Journal Entry created successfully'
            ]
        ]);
    }
}
