<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    use HasFactory;

    protected $table = 'blogs';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
        'images',
        'videos',
        'seo_meta',
        'views',
        'status',
        'published_at',
    ];

    protected $casts = [
        'cover_image'=> 'array',
        'images' => 'array',
        'videos' => 'array',
        'status' => 'boolean',
        'published_at' => 'datetime',
    ];
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
