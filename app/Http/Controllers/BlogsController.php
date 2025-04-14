<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogsRequest;
use App\Http\Requests\RequestBlock;
use App\Models\Blogs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogsController extends Controller
{
    public function index(){
        $blogs = Blogs::where('status', true)
                  ->orderBy('id', 'desc') // 'desc' es para orden descendente
                  ->paginate(15);
        return Inertia::render('blogs/Index', [
            'blogs' => $blogs->items(),  
            'meta' => $blogs->toArray()
        ]);
    }

    public function create(){
        return Inertia::render('blogs/Create');
    }
    
    public function store(BlogsRequest $request){
         
        $validated = $request->validated();

        $storagePaths = [
            'images' => 'blogs/images',
            'videos' => 'blogs/videos',
            'cover_image' => 'blogs/covers'
        ];
        foreach ($storagePaths as $path) {
            $storagePath = storage_path('app/public/' . $path);
            if (!file_exists($storagePath)) {
                mkdir($storagePath, 0775, true);
            }
        }
        $files = ['images', 'videos', 'cover_image'];
        foreach ($files as $file) {
            if ($request->hasFile($file)) {
                $fileUrls = [];
                foreach ($request->file($file) as $files) {
                    if (!$files->isValid()) {
                        return redirect()->route('blogs.index')
                        ->with('error', "Error al subir el archivo para {$file}: La imagen no es válida.");
                    }

                    $path = $files->store($storagePaths[$file], 'public');
                    if (!file_exists(storage_path('app/public/' . $path))) {
                        return redirect()->route('blogs.index')
                        ->with('error', "Error al guardar el archivo {$file}: {$path}");
                    }
                    $fileUrls[] = '/storage/' . $path;
                }
                $validated[$file] = $fileUrls;
            } else {
                return redirect()->route('blogs.index')
                ->with('error', "No se han subido {$file}. Es necesario subir al menos un archivo para {$file}.");
            }
        }

        Blogs::create($validated);
        return redirect()->route('blogs.index')
        ->with('success', "¡Blog creado exitosamente!"); 
    }
    
    public function bin(){
        $blogs = Blogs::where('status', false)
                  ->orderBy('id', 'desc') // 'desc' es para orden descendente
                  ->paginate(15);
        return Inertia::render('blogs/Bin', [
            'blogs' => $blogs->items(),  
            'meta' => $blogs->toArray()
        ]);
    }
    public function edit($slug){

        $blog = Blogs::where('slug', $slug)->firstOrFail();
        return Inertia::render('blogs/Update', [
            'blogs'=> $blog
        ]);
    }

    public function update(BlogsRequest $request, Blogs $blog){
        $validated = $request->validated();
        $dataToUpdate = [];

        foreach (['title', 'slug', 'description', 'seo_meta'] as $field) {
            if ($request->filled($field) && $request->input($field) !== $blog->$field) {
                $dataToUpdate[$field] = $request->input($field);
            }
        }

        // Opcional: manejar archivos si se re-suben
        $storagePaths = [
            'images' => 'blogs/images',
            'videos' => 'blogs/videos',
            'cover_image' => 'blogs/covers'
        ];

        foreach ($storagePaths as $path) {
            $storagePath = storage_path('app/public/' . $path);
            if (!file_exists($storagePath)) {
                mkdir($storagePath, 0775, true);
            }
        }

        $fileFields = ['images', 'videos', 'cover_image'];
        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
                $fileUrls = [];
                foreach ($request->file($field) as $file) {
                    if (!$file->isValid()) {
                        return back()->with('error', "Archivo inválido para {$field}");
                    }
                    $path = $file->store($storagePaths[$field], 'public');
                    $fileUrls[] = '/storage/' . $path;
                }
                $validated[$field] = $fileUrls;
            }
        }
        if (!empty($dataToUpdate)) {
            $blog->update($dataToUpdate);
            return redirect()->route('blogs.index')
            ->with('success', "¡Blog actualizado exitosamente!");
            // return back()->with('success', '¡Blog actualizado exitosamente!');
        }
    
        return back()->with('info', 'No se realizaron cambios.');
    }

    public function delete($id){
        try {
            $blog = Blogs::findOrFail($id);
            $blog->status = false; 
            $blog->save();
            
            return back()->with('success', 'Blog eliminado correctamente!');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->with('error', 'Blog no encontrado.');
        }
    }
    
    public function activate($id)
    {
        try {
            $blog = Blogs::findOrFail($id);
            $blog->status = true; 
            $blog->save();
            
            return back()->with('success', 'Blog restaurado correctamente!');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->with('error', 'Blog no encontrado.');
        }
    }

}
