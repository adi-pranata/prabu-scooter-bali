<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scooter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'brand',
        'price_per_day',
        'image_path',
        'description',
        'is_popular',
        'is_available',
        'rating',
        'reviews_count',
        'seats',
        'transmission',
        'engine_cc',
        'fuel_type',
        'helmets_included',
    ];

    protected $casts = [
        'is_popular' => 'boolean',
        'is_available' => 'boolean',
        'helmets_included' => 'boolean',
        'rating' => 'decimal:1',
    ];
}
