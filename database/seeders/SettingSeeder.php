<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'sales_account_id' => 3,
            'purchase_account_id' => 5,
            'inventory_account_id' => 1,
            'fixed_assets_account_id' => 2,
            'cost_of_goods_sold_account_id' => 4,
            'account_payable_id' => 6,
            'account_receivable_id' => 7,
            'stock_valuation_journal_id' => 3,
            'sales_journal_id' => 1,
            'purchase_journal_id' => 2,
            'stock_interim_account_id' => 12,

        ];

        DB::table('settings')->insert($settings);
    }
}
