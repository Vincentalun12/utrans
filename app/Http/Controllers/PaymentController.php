<?php

namespace App\Http\Controllers;

use App\Models\ChartOfAccount;
use App\Models\Payment;
use App\Models\JournalEntries;
use App\Models\JournalItem;
use App\Models\PurchaseOrder;
use App\Models\Setting;
use App\Models\Journal;
use App\Models\SaleOrder;
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
            $paymentJournal = Journal::find($request->journal_id);
            $paymentAccount = ChartOfAccount::find($paymentJournal->chart_of_account_id);

            $purchaseOrder = PurchaseOrder::find($request->purchase_order_id);

            if ($paymentAccount->balance < $request->amount) {
                return redirect()->back()->with([
                    'message' => [
                        'type' => 'error',
                        'content' => "$paymentAccount->account_name balance is not enough!"
                    ]
                ]);
            } else if ($purchaseOrder->total_due <= 0) {
                return redirect()->back()->with([
                    'message' => [
                        'type' => 'error',
                        'content' => 'Purchase order has been paid!'
                    ]
                ]);
            } else if ($request->amount > $purchaseOrder->total_due) {
                return redirect()->back()->with([
                    'message' => [
                        'type' => 'error',
                        'content' => 'Amount cannot be greater than total due!'
                    ]
                ]);
            } else if ($request->amount >= $purchaseOrder->total_due) {
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

            $payment = Payment::create([
                'journal_id' => $request->journal_id,
                'date' => Date::parse($request->date)->format('Y-m-d'),
                'reference' => $request->reference,
                'notes' => $request->notes,
                'amount' => $request->amount,
            ]);

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

            ChartOfAccount::updateChartOfAccountBalance($setting->account_payable_id);
            ChartOfAccount::updateChartOfAccountBalance($paymentJournal->chart_of_account_id);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with([
                'message' => [
                    'type' => 'error',
                    'content' => 'Failed to register payment!'
                ]
            ]);
        }

        return redirect()->route('purchases')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Payment has been registered!'
            ]
        ]);
    }

    public function saleRegisterPayment(Request $request)
    {
        $setting = Setting::first();

        $request->validate([
            'journal_id' => 'required',
            'date' => 'required',
            'amount' => 'required',
            'sale_order_id' => 'required',
        ]);


        try {
            DB::beginTransaction();
            $paymentJournal = Journal::find($request->journal_id);
            $paymentAccount = ChartOfAccount::find($paymentJournal->chart_of_account_id);

            $saleOrder = SaleOrder::find($request->sale_order_id);

            if ($saleOrder->total_due <= 0) {
                return redirect()->back()->with([
                    'message' => [
                        'type' => 'error',
                        'content' => 'Sale order has been paid!'
                    ]
                ]);
            } else if ($request->amount > $saleOrder->total_due) {
                return redirect()->back()->with([
                    'message' => [
                        'type' => 'error',
                        'content' => 'Amount cannot be greater than total due!'
                    ]
                ]);
            } else if ($request->amount >= $saleOrder->total_due) {
                $saleOrder->total_paid += $request->amount;
                $saleOrder->total_due -= $request->amount;
                $saleOrder->payment_status = 'paid';
                $saleOrder->save();
            } else {
                if ($saleOrder->total_paid + $request->amount == 0) {
                    $saleOrder->payment_status = 'paid';
                } else {
                    $saleOrder->payment_status = 'due';
                }

                $saleOrder->total_paid += $request->amount;
                $saleOrder->total_due -= $request->amount;
                $saleOrder->save();
            }

            $payment = Payment::create([
                'journal_id' => $request->journal_id,
                'date' => Date::parse($request->date)->format('Y-m-d'),
                'reference' => $request->reference,
                'notes' => $request->notes,
                'amount' => $request->amount,
            ]);

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
                'sale_order_id' => $request->sale_order_id,
            ]);

            JournalItem::create([
                'journal_entry_id' => $journal->id,
                'chart_of_account_id' => $setting->account_receivable_id,
                'label' => '',
                'debit' => 0,
                'credit' => $request->amount,
                'balance' => -$request->amount,
            ]);

            JournalItem::create([
                'journal_entry_id' => $journal->id,
                'chart_of_account_id' => $paymentJournal->chart_of_account_id,
                'label' => '',
                'debit' => $request->amount,
                'credit' => 0,
                'balance' => $request->amount,
            ]);

            ChartOfAccount::updateChartOfAccountBalance($setting->account_receivable_id);
            ChartOfAccount::updateChartOfAccountBalance($paymentJournal->chart_of_account_id);

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with([
                'message' => [
                    'type' => 'error',
                    'content' => 'Failed to register payment!'
                ]
            ]);
        }

        return redirect()->route('sales')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Payment has been registered!'
            ]
        ]);
    }
}
