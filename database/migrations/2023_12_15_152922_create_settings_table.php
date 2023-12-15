<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sales_account_id')->nullable()->constrained('chart_of_accounts');
            $table->foreignId('current_asset_account_id')->nullable()->constrained('chart_of_accounts');
            $table->foreignId('cost_of_goods_sold_account_id')->nullable()->constrained('chart_of_accounts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
