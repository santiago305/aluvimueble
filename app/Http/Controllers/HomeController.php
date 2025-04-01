<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $blocks = Blogs::where('status', true)
        ->orderBy('created_at', 'desc') 
        ->limit(3) 
        ->get();

        return Inertia::render('Index', $blocks);
    }
}
