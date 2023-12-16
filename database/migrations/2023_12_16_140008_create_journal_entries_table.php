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
        Schema::create('journal_entries', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->date('date');
            $table->string('journal_entry_name');
            $table->string('journal_entry_type');
            $table->foreignId('journal_id')->constrained('journals');
            $table->foreignId('sale_order_id')->constrained('sale_orders')->nullable();
            $table->foreignId('purchase_order_id')->constrained('purchase_orders')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_entries');
    }
};
