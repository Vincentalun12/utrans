<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('customers')->insert([
            'code' => "CUS-0001",
            'name' => "Ahmad",
            'address' => "Jl. Raya Bogor KM 30, Jakarta Timur",
            'phone' => "08123456789",
            'email' => "ahmad@email.com",
            'district' => "Cibubur",
            'city' => "Jakarta Timur",
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('customers')->insert([
            'code' => "CUS-0002",
            'name' => "Budi",
            'address' => "Jl. Raya Bogor KM 30, Jakarta Timur",
            'phone' => "08123456789",
            'email' => "ahmad@email.com",
            'district' => "Cibubur",
            'city' => "Jakarta Timur",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
