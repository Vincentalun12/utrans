<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            'brand_id' => 1,
            'code' => "SANFORD-2023-0001",
            'name' => "SANFORD 300 ML",
            'description' => "SANFORD 300 ML",
            'stock' => 0,
            'sales_price' => 4000,
            'standard_price' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
