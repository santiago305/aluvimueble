<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    // controlamos el registro
    Route::get('dashboard/register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('dashboard/register', [RegisteredUserController::class, 'store']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
