<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChartOfAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '1000',
                'account_name' => 'Inventory Account',
                'account_type' => 'current_assets',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '1100',
                'account_name' => 'Fixed Assets',
                'account_type' => 'fixed_assets',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '4000',
                'account_name' => 'Sales',
                'account_type' => 'income',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '5000',
                'account_name' => 'Cost of Goods Sold',
                'account_type' => 'cost_of_revenue',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '6000',
                'account_name' => 'Purchases',
                'account_type' => 'expense',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '2000',
                'account_name' => 'Account Payable',
                'account_type' => 'liability',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '3000',
                'account_name' => 'Account Receivable',
                'account_type' => 'current_assets',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '7000',
                'account_name' => 'Bank BCA',
                'account_type' => 'bank_and_cash',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '7001',
                'account_name' => 'Bank Mandiri',
                'account_type' => 'bank_and_cash',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '7002',
                'account_name' => 'Bank BNI',
                'account_type' => 'bank_and_cash',
                'balance' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
