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
        Schema::create('journal_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('journal_entry_id')->constrained('journals');
            $table->foreignId('chart_of_account_id')->constrained('chart_of_accounts');
            $table->string('label')->nullable();
            $table->decimal('debit', 65, 2)->nullable();
            $table->decimal('credit', 65, 2)->nullable();
            $table->decimal('balance', 65, 2)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_items');
    }
};
