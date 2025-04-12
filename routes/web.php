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
        Route::get('blogs', 'index')->name('blogs.index');
        Route::get('blogs/create', 'create')->name('blogs.create');
        Route::post('blogs/create', 'store')->name('blogs.store');
        Route::get('blogs/bin', 'bin')->name('blogs.bin'); 
        Route::get('blogs/{id}', 'show')->name('blogs.show');
        Route::put('blogs/{id}', 'update')->name('blogs.update');
        Route::delete('blogs/{id}', 'delete')->name('blogs.delete');
        Route::put('blogs/bin/{id}', 'activate')->name('blogs.activate');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
