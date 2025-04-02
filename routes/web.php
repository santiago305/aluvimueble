<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlogsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    // controlamos el registro
    Route::get('dashboard/register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('dashboard/register', [RegisteredUserController::class, 'store']);

    Route::controller(BlogsController::class)->group(function(){
        Route::get('blogs', 'create')->name('block.create');
        Route::post('blogs', 'store')->name('block.store');
        Route::put('blogs/{id}', 'update')->name('block.update');
        Route::delete('blogs/{id}', 'delete')->name('block.delete');
        Route::put('/blogs/{id}', 'activate')->name('blocks.activate');
        Route::get('blogs/{id}', 'show')->name('block.show');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
