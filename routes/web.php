<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\ProjectsController;
use App\Models\Blogs;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

Route::middleware(['log.page.view'])->group(function () {
    Route::get('/', HomeController::class)->name('home');
    Route::get('/proyectos', [ProjectsController::class, 'index'])->name('projects.index');
    Route::get('/proyectos/{blog}', [ProjectsController::class, 'show'])->name('projects.show');
});

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
        Route::get('blogs/{slug}/edit', 'edit')->name('blogs.edit');
        Route::put('blogs/{blog}', 'update')->name('blogs.update');
        Route::delete('blogs/{id}', 'delete')->name('blogs.delete');
        Route::put('blogs/bin/{id}', 'activate')->name('blogs.activate');
    });
});


Route::get('/sitemap.xml', function () {
    $staticPages = [
        '/',
        '/proyectos',
    ];

    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Páginas estáticas
    foreach ($staticPages as $page) {
        $xml .= '<url>';
        $xml .= '<loc>' . url($page) . '</loc>';
        $xml .= '<changefreq>monthly</changefreq>';
        $xml .= '<priority>1.0</priority>';
        $xml .= '</url>';
    }

    // Proyectos dinámicos
    $projects = Blogs::all(); // Asegúrate de tener el modelo correcto

    foreach ($projects as $project) {
        $xml .= '<url>';
        $xml .= '<loc>' . url('/' . $project->slug) . '</loc>'; // o $project->titulo si así es tu ruta
        $xml .= '<changefreq>monthly</changefreq>';
        $xml .= '<priority>0.7</priority>';
        $xml .= '</url>';
    }

    $xml .= '</urlset>';

    return Response::make($xml, 200)->header('Content-Type', 'application/xml');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
