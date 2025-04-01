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
            'cover_image' => 'nullable|string',
            'images' => 'nullable|array',
            // 'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validación de cada imagen
            'videos' => 'nullable|array',
            'seo_meta' => 'nullable|string',
            'views' => 'nullable|integer|min:0',
            'status' => 'boolean',
            'published_at' => 'nullable|date',
        ];
    }
}
