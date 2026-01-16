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
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('Prabu Scooter Bali');
            $table->string('wa_number')->nullable(); // 62812...
            $table->string('hero_title')->nullable();
            $table->string('hero_highlight')->nullable(); // "Easily"
            $table->text('hero_subtitle')->nullable();

            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('open_hours')->nullable();
            $table->text('address')->nullable();

            $table->text('map_embed_url')->nullable();
            $table->json('social_links')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
