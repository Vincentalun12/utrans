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
        $data = [
            'journalentries' => JournalEntries::with(['journal'])->get(),
        ];

        return Inertia::render('Dashboard/Account/Journalentries/Index', $data);
    }

    public function create()
    {
        $data = [
            'journals' => Journal::all(),
            'accounts' => ChartOfAccount::all(),
        ];

        return Inertia::render('Dashboard/Account/Journalentries/Create', $data);
    }

    public function detail($id)
    {
        $data = [
            'journalentry' => JournalEntries::with(['journal', 'journalitems.chartOfAccount'])->find($id),
        ];

        return Inertia::render('Dashboard/Account/Journalentries/Detail', $data);
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

                ChartOfAccount::updateChartOfAccountBalance($item['chart_of_account_id']);
            }


            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            return redirect()->route('journalentries')->with([
                'message' => [
                    'type' => 'danger',
                    'content' => 'Journal Entry failed to create \n' . $th->getMessage() . '\n' . $th->getLine() . '\n' . $th->getFile()
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

    public function edit($id)
    {
        $data = [
            'journalentry' => JournalEntries::with(['journal', 'journalitems.chartOfAccount'])->find($id),
            'journals' => Journal::all(),
            'accounts' => ChartOfAccount::all(),
        ];

        return Inertia::render('Dashboard/Account/Journalentries/Edit', $data);
    }

    public function update(Request $request, $id)
    {
        $journalEntry = JournalEntries::find($id);

        if ($request->journal_id != $journalEntry->journal_id) {
            $generateCode = JournalEntries::generateCode(
                data: [
                    'journal_id' => $request->journal_id,
                ]
            );

            $request->request->add([
                'code' => $generateCode,
            ]);
        } else {
            $request->request->add([
                'code' => $journalEntry->code,
            ]);
        }

        $request->validate([
            'code' => 'required',
            'status' => 'required',
            'accounting_date' => 'required',
            'journal_id' => 'required',
        ]);

        try {
            DB::beginTransaction();
            JournalEntries::find($id)->update([
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

                if (isset($item['id'])) {
                    JournalItem::find($item['id'])->update([
                        'journal_entry_id' => $id,
                        'chart_of_account_id' => $item['chart_of_account_id'],
                        'label' => $item['label'],
                        'debit' => $item['debit'],
                        'credit' => $item['credit'],
                        'balance' => $journalItemBalance,
                    ]);
                } else {
                    JournalItem::create([
                        'journal_entry_id' => $id,
                        'chart_of_account_id' => $item['chart_of_account_id'],
                        'label' => $item['label'],
                        'debit' => $item['debit'],
                        'credit' => $item['credit'],
                        'balance' => $journalItemBalance,
                    ]);
                }
            }

            JournalItem::deleteUnnecessaryJournalItems(
                previousJournalItems: $journalEntry->journalItems->toArray(),
                currentJournalItems: $request->journal_items
            );

            ChartOfAccount::updateChartOfAccountBalance($item['chart_of_account_id']);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->route('journalentries')->with([
                'message' => [
                    'type' => 'danger',
                    'content' => 'Journal Entry failed to update \n' . $th->getMessage() . '\n' . $th
                ]
            ]);
        }

        return redirect()->route('journalentries')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Journal Entry updated successfully'
            ]
        ]);
    }
}
