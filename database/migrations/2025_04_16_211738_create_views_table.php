<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // composer require jenssegers/agent
    // Para registrar automáticamente si los visitantes acceden a tu sitio desde un dispositivo móvil o de escritorio, así como el navegador que utilizan, puedes utilizar el paquete jenssegers/agent

    public function up(): void
    {
        Schema::create('views', function (Blueprint $table) {
            $table->id();
            $table->ipAddress('ip');
            $table->string('route');
            $table->timestamp('viewed_at')->useCurrent();
            $table->string('device_type')->nullable();
            $table->string('browser')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('views');
    }
};
