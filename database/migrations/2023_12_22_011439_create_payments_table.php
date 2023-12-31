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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('journal_id')->constrained('journals');
            $table->foreignId('sale_order_id')->nullable()->constrained('sale_orders');
            $table->foreignId('purchase_order_id')->nullable()->constrained('purchase_orders');
            $table->date('date');
            $table->string('reference')->nullable();
            $table->string('notes')->nullable();
            $table->string('amount');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
