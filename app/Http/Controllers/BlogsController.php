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
        // dd($validated);
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
                        return response()->json([
                            'message' => 'Error al subir la imagen.',
                            'error' => 'La imagen no es válida.'
                        ], 400);
                    }

                    $path = $files->store($storagePaths[$file], 'public');
                    // dd($path);
                    if (!file_exists(storage_path('app/public/' . $path))) {
                        return response()->json([
                            'message' => 'Error al guardar la imagen.'.$path,
                            'error' => 'La imagen no fue guardada correctamente.'
                        ], 500);
                    }
                    $fileUrls[] = 'storage/' . $path;
                }
                $validated[$file] = $fileUrls;
            } else {
                return response()->json([
                    'message' => "No se han subido {$file}.",
                    'error' => "Es necesario subir al menos un {$file}."
                ], 400);
            }
        }
        dd($validated);
        
        // Block::create($validated);
        
        // return redirect()->route('block.index')->with('success', 'Block created successfully!');
        
    }
    public function show($id){
        $block = Block::where('status', true)->findOrFail($id);
        // return $blocks;
        // dd($block);
        return Inertia::render('Block/Show', ['block' => $block]);
    }
    public function update(Request $request, $id){

        $block = Block::findOrFail($id);
        $validated = $request->validate();

        $block->update($validated);
        return redirect()->route('Block/Update')->with('success', 'Block updated successfully!');
    }
    public function delete($id){
        $block = Blogs::findOrFail($id);
        $block->status = false; // Cambia el estado a inactivo
        $block->save();

        return redirect()->route('blocks.index')->with('success', 'Block deactivated successfully!');
    }
    public function activate($id)
    {
        $block = Blogs::findOrFail($id);
        $block->status = true; // Activa el block nuevamente
        $block->save();

        return redirect()->route('blocks.index')->with('success', 'Block activated successfully!');
    }

}
