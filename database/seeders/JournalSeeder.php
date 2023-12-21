<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JournalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('journals')->insert([
            'code' => 'SO',
            'journal_name' => 'Sales',
            'journal_type' => 'sale',
            'chart_of_account_id' => 3,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('journals')->insert([
            'code' => 'PO',
            'journal_name' => 'Purchase',
            'journal_type' => 'purchase',
            'chart_of_account_id' => 5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('journals')->insert([
            'code' => 'SV',
            'journal_name' => 'Stock Valuation',
            'journal_type' => 'stock_valuation',
            'chart_of_account_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
