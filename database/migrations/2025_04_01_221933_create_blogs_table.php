<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->json('cover_image')->nullable(); // Featured image
            $table->json('images')->nullable();        // Carousel images
            $table->json('videos')->nullable();        // Carousel videos
            $table->text('seo_meta')->nullable();      // SEO meta description
            $table->unsignedBigInteger('views')->default(0);
            $table->boolean('status')->default(true);  // true = active, false = inactive
            $table->dateTime('published_at')->default(DB::raw('CURRENT_TIMESTAMP'));// Publish date
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
