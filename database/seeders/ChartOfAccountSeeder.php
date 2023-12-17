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
                'code' => '4000',
                'account_name' => 'Sales',
                'account_type' => 'Income',
                'balance' => 0,
                'created_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '5000',
                'account_name' => 'Cost of Goods Sold',
                'account_type' => 'Cost of Revenue',
                'balance' => 0,
                'created_at' => now(),
            ]
        );
        DB::table('chart_of_accounts')->insert(
            [
                'code' => '6000',
                'account_name' => 'Purchases',
                'account_type' => 'Expense',
                'balance' => 0,
                'created_at' => now(),
            ]
        );
    }
}