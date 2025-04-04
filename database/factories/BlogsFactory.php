<?php

namespace Database\Factories;

use App\Models\Blogs;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blogs>
 */
class BlogsFactory extends Factory
{
    /**
     * El nombre del modelo relacionado.
     *
     * @var string
     */
    protected $model = Blogs::class;

    /**
     * Definir el modelo de la fábrica.
     *
     * @return array
     */

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,  // Título falso
            'slug' => $this->faker->slug,  // Slug falso
            'description' => $this->faker->paragraph,  // Descripción falsa
            'cover_image' => json_encode([$this->faker->imageUrl(), $this->faker->imageUrl()]),  // URL de imagen falsa
            'images' => json_encode([$this->faker->imageUrl(), $this->faker->imageUrl()]),  // Imágenes de carousel
            'videos' => json_encode([$this->faker->url(), $this->faker->url()]),  // Videos de carousel
            'seo_meta' => $this->faker->sentence,  // Meta descripción
            'views' => $this->faker->numberBetween(0, 1000),  // Número de vistas aleatorio
            'status' => $this->faker->boolean,  // Estado activo/inactivo
            'published_at' => $this->faker->dateTimeThisYear,  // Fecha de publicación aleatoria
        ];
    }
}
