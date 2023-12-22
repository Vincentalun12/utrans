<?php

namespace App\Http\Controllers;

use App\Models\ChartOfAccount;
use App\Models\Payment;
use App\Models\JournalEntries;
use App\Models\JournalItem;
use App\Models\PurchaseOrder;
use App\Models\Setting;
use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function purchaseRegisterPayment(Request $request)
    {
        $setting = Setting::first();

        $request->validate([
            'journal_id' => 'required',
            'date' => 'required',
            'amount' => 'required',
            'purchase_order_id' => 'required',
        ]);

        try {
            DB::beginTransaction();
            $payment = Payment::create([
                'journal_id' => $request->journal_id,
                'date' => Date::parse($request->date)->format('Y-m-d'),
                'reference' => $request->reference,
                'notes' => $request->notes,
                'amount' => $request->amount,
            ]);

            $paymentJournal = Journal::find($request->journal_id);

            $journalEntryGenerateCode = JournalEntries::generateCode([
                'journal_id' => $request->journal_id,
            ]);

            $journal = JournalEntries::create([
                'code' => $journalEntryGenerateCode,
                'journal_id' => $request->journal_id,
                'accounting_date' => Date::parse($request->date)->format('Y-m-d'),
                'reference' => $request->reference,
                'notes' => $request->notes,
                'status' => 'posted',
                'purchase_order_id' => $request->purchase_order_id,
            ]);

            JournalItem::create([
                'journal_entry_id' => $journal->id,
                'chart_of_account_id' => $setting->account_payable_id,
                'label' => '',
                'debit' => $request->amount,
                'credit' => 0,
                'balance' => $request->amount,
            ]);

            JournalItem::create([
                'journal_entry_id' => $journal->id,
                'chart_of_account_id' => $paymentJournal->chart_of_account_id,
                'label' => '',
                'debit' => 0,
                'credit' => $request->amount,
                'balance' => -$request->amount,
            ]);

            $purchaseOrder = PurchaseOrder::find($request->purchase_order_id);

            if ($purchaseOrder->total_due == $request->amount) {
                $purchaseOrder->total_paid += $request->amount;
                $purchaseOrder->total_due -= $request->amount;
                $purchaseOrder->payment_status = 'paid';
                $purchaseOrder->save();
            } else {
                if ($purchaseOrder->total_paid + $request->amount == 0) {
                    $purchaseOrder->payment_status = 'paid';
                } else {
                    $purchaseOrder->payment_status = 'due';
                }

                $purchaseOrder->total_paid += $request->amount;
                $purchaseOrder->total_due -= $request->amount;
                $purchaseOrder->save();
            }

            ChartOfAccount::updateChartOfAccountBalance($setting->account_payable_id);
            ChartOfAccount::updateChartOfAccountBalance($paymentJournal->chart_of_account_id);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', $th->getMessage());
        }

        return redirect()->route('purchases')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Payment has been registered!'
            ]
        ]);
    }
}
