<?php

namespace App\Http\Controllers;

use App\Models\ChartOfAccount;
use App\Models\Journal;
use App\Models\Setting;

use Illuminate\Http\Request;
use Inertia\Inertia;


class SettingsController extends Controller
{
    public function index()
    {
        $data = [
            'accounts' => ChartOfAccount::all(),
            'journals' => Journal::all(),
            'setting' => Setting::first()
        ];

        return Inertia::render('Dashboard/Settings/Index', $data);
    }

    public function save(Request $request)
    {
        $setting = Setting::first();

        if ($setting) {
            $setting->update([
                'sales_account_id' => $request->sales_account_id,
                'purchase_account_id' => $request->purchase_account_id,
                'assets_account_id' => $request->assets_account_id,
                'current_assets_account_id' => $request->current_assets_account_id,
                'fixed_assets_account_id' => $request->fixed_assets_account_id,
                'cost_of_goods_sold_account_id' => $request->cost_of_goods_sold_account_id,
                'stock_valuation_journal_id' => $request->stock_valuation_journal_id,
                'sales_journal_id' => $request->sales_journal_id,
                'purchase_journal_id' => $request->purchase_journal_id,
            ]);
        } else {
            Setting::create([
                'sales_account_id' => $request->sales_account_id,
                'purchase_account_id' => $request->purchase_account_id,
                'assets_account_id' => $request->assets_account_id,
                'current_assets_account_id' => $request->current_assets_account_id,
                'fixed_assets_account_id' => $request->fixed_assets_account_id,
                'cost_of_goods_sold_account_id' => $request->cost_of_goods_sold_account_id,
                'stock_valuation_journal_id' => $request->stock_valuation_journal_id,
                'sales_journal_id' => $request->sales_journal_id,
                'purchase_journal_id' => $request->purchase_journal_id,
            ]);
        }

        return redirect()->route('settings')->with([
            'message' => [
                'type' => 'success',
                'content' => 'Settings saved successfully'
            ]
        ]);
    }
}
