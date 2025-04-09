<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:blogs,slug,',
            'description' => 'required|string',
            'cover_image' => 'required|array',
            'images' => 'required|array',
            'videos' => 'required|array',
            'seo_meta' => 'required|string',
            'views' => 'nullable|integer|min:0',
            'status' => 'boolean',
            'published_at' => 'nullable|date',
        ];
    }
    public function messages(): array
{
    return [
        'title.required' => 'El título es obligatorio.',
        'title.string' => 'El título debe ser una cadena de texto.',
        'title.max' => 'El título no puede exceder los 255 caracteres.',
        'slug.required' => 'El slug es obligatorio.',
        'slug.string' => 'El slug debe ser una cadena de texto.',
        'slug.unique' => 'Este título ya está en uso. Por favor elige otro título.',
        'description.required' => 'La descripción es obligatoria.',
        'description.string' => 'La descripción debe ser una cadena de texto.',
        'cover_image.required' => 'La imagen de portada es obligatoria.',
        'cover_image.array' => 'La imagen de portada debe ser un arreglo.',
        'images.required' => 'Las imágenes son obligatorias.',
        'images.array' => 'Las imágenes deben ser un arreglo.',
        'videos.required' => 'Los videos son obligatorios.',
        'videos.array' => 'Los videos deben ser un arreglo.',
        'seo_meta.required' => 'Los metadatos SEO son obligatorios.',
        'seo_meta.string' => 'Los metadatos SEO deben ser una cadena de texto.'
    ];
}
}
