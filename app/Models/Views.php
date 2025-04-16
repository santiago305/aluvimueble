<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Views extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip',
        'route',
        'device_type',
        'browser',
        'viewed_at',
    ];

    protected $casts = [
        'viewed_at' => 'datetime',
    ];
}
