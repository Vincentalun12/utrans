<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('vendors')->insert([
            'code' => "VEN-0001",
            'name' => "PT Sumber Dosa Abadi",
            'address' => "Jl. Raya Bogor KM 30, Jakarta Timur",
            'phone' => "08123456789",
            'email' => "sumberdosa@email.com",
            'district' => "Cibubur",
            'city' => "Jakarta Timur",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
