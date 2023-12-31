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
            $table->foreignId('purchase_account_id')->nullable()->constrained('chart_of_accounts');
            $table->foreignId('inventory_account_id')->nullable()->constrained('chart_of_accounts');
            $table->foreignId('fixed_assets_account_id')->nullable()->constrained('chart_of_accounts');
            $table->foreignId('cost_of_goods_sold_account_id')->nullable()->constrained('chart_of_accounts');
            $table->foreignId('account_payable_id')->nullable()->constrained('chart_of_accounts');
            $table->foreignId('account_receivable_id')->nullable()->constrained('chart_of_accounts');
            $table->foreignId('stock_valuation_journal_id')->nullable()->constrained('journals');
            $table->foreignId('sales_journal_id')->nullable()->constrained('journals');
            $table->foreignId('purchase_journal_id')->nullable()->constrained('journals');
            $table->timestamps();
            $table->softDeletes();
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
