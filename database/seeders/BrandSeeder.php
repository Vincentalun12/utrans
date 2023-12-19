<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('brands')->insert([
            'code' => 'BRAND-0001',
            'name' => 'Sanford',
            'number' => '08123456789',
            'email' => 'sanford@email.com',
            'website' => 'https://sanford.com',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('brands')->insert([
            'code' => 'BRAND-0002',
            'name' => 'Aqua',
            'number' => '08122423424',
            'email' => 'aqua@email.com',
            'website' => 'https://aqua.com',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('brands')->insert([
            'code' => 'BRAND-0003',
            'name' => 'Equil',
            'number' => '0812319392',
            'email' => 'sanford@email.com',
            'website' => 'https://equil.com',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
