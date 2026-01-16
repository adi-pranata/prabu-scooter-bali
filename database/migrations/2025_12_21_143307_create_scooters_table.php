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
        Schema::create('scooters', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('brand')->nullable();
            $table->integer('price_per_day');
            $table->string('image_path')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_available')->default(true);
            $table->decimal('rating', 2, 1)->default(5.0);
            $table->unsignedInteger('reviews_count')->default(0);

            $table->unsignedTinyInteger('seats')->default(2);
            $table->enum('transmission', ['matic', 'manual'])->default('matic');
            $table->unsignedSmallInteger('engine_cc')->nullable();

            $table->enum('fuel_type', ['pertamax', 'pertalite'])->default('pertalite');
            $table->boolean('helmets_included')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scooters');
    }
};
