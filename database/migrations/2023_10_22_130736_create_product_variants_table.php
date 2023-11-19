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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('default_code')->unique();
            $table->string('name');
            $table->text('description');
            $table->double('onhand_quantity', 65, 2);
            $table->decimal('available_quantity', 65, 2);
            $table->decimal('standard_price', 65, 2);
            $table->foreignId('color_id')->constrained()->cascadeOnDelete();
            $table->string('size')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
