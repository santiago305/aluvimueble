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
        $blocks = Blogs::where('status', true)->paginate(10); // ?page=1
        // return $blocks;
        return Inertia::render('Block/Index', [
            'blocks' => $blocks->items(),  // Pasa solo los bloques
            'meta' => $blocks->toArray()// Pasa los metadatos de paginación
        ]);
    }
    public function create(){
        return Inertia::render('blogs/Create');
    }
    public function store(BlogsRequest $request){
    // Validar los datos del request
    $validated = $request->validated();

    // Definir la ruta de almacenamiento
    $storagePath = storage_path('app/public/block');

    // Crear la carpeta si no existe
    if (!file_exists($storagePath)) {
        mkdir($storagePath, 0775, true);
    }

    // Verificar si hay imágenes
    if ($request->hasFile('images')) {
        $imageUrls = [];
        foreach ($request->file('images') as $image) {
            // Verificar si la imagen se subió correctamente
            if (!$image->isValid()) {
                return response()->json([
                    'message' => 'Error al subir la imagen.',
                    'error' => 'La imagen no es válida.'
                ], 400);
            }

            // Guardar la imagen en la carpeta 'block' dentro del disco 'public'
            $path = $image->store('block', 'public');
            // dd($path);
            // Verificar si la imagen fue guardada correctamente
            if (!file_exists(storage_path('app/public/' . $path))) {
                return response()->json([
                    'message' => 'Error al guardar la imagen.'.$path,
                    'error' => 'La imagen no fue guardada correctamente.'
                ], 500);
            }

            // Añadir la URL de la imagen a la lista de URLs
            $imageUrls[] = 'storage/' . $path;
        }

        // Guardar las URLs de las imágenes en el array validado
        $validated['images'] = $imageUrls;
    } else {
        // Si no se subieron imágenes, devolver un error
        return response()->json([
            'message' => 'No se han subido imágenes.',
            'error' => 'Es necesario subir al menos una imagen.'
        ], 400);
    }

    // Crear el bloque en la base de datos
    // $block = Blogs::create($validated);

    // // Retornar una respuesta exitosa
    // return response()->json([
    //     'message' => 'Block creado exitosamente',
    //     'data' => $block
    // ], 201);


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
