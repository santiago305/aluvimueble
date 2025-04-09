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
        $blocks = Blogs::where('status', true)->paginate(15);
        return Inertia::render('blogs/Index', [
            'blocks' => $blocks->items(),  
            'meta' => $blocks->toArray()
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
                    $fileUrls[] = 'storage/' . $path;
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

    public function show($id){
        $block = Blogs::where('status', true)->findOrFail($id);
        // return $blocks;
        // dd($block);
        return Inertia::render('Block/Show', ['block' => $block]);
    }
    // public function update(Request $request, $id){

    //     $block = Block::findOrFail($id);
    //     $validated = $request->validate();

    //     $block->update($validated);
    //     return redirect()->route('Block/Update')->with('success', 'Block updated successfully!');
    // }
    // public function delete($id){
    //     $block = Blogs::findOrFail($id);
    //     $block->status = false; // Cambia el estado a inactivo
    //     $block->save();

    //     return redirect()->route('blocks.index')->with('success', 'Block deactivated successfully!');
    // }
    // public function activate($id)
    // {
    //     $block = Blogs::findOrFail($id);
    //     $block->status = true; // Activa el block nuevamente
    //     $block->save();

    //     return redirect()->route('blocks.index')->with('success', 'Block activated successfully!');
    // }

}
