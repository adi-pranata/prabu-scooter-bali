<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'wa_number',
        'hero_title',
        'hero_highlight',
        'hero_subtitle',
        'email',
        'phone',
        'open_hours',
        'address',
        'map_embed_url',
        'social_links',
        'contact_title',
        'contact_description',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];
}
