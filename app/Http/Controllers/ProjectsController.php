<?php

namespace App\Http\Controllers;

use App\Models\Blogs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function index () {
        $blogs = Blogs::where('status', true)
                  ->orderBy('id', 'desc') 
                  ->paginate(20);
        return Inertia::render('projects/index', [
            'blogs' => $blogs->items(),  
            'meta' => $blogs->toArray()
        ]);
    }
    public function show ($slug) {
        $blog = Blogs::where('slug', $slug)->where('status', true)->firstOrFail();
        // $blog->increment('views');
        return Inertia::render('projects/show', [
            'blogs'=> $blog
        ]);
    }
    public function incrementViews($slug){
        $blog = Blogs::where('slug', $slug)->firstOrFail();
        $blog->increment('views');
    }
}
