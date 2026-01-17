<?php

namespace App\Http\Controllers;

use App\Models\Scooter;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page.
     */
    public function index()
    {
        $scooters = Scooter::all()->map(function ($scooter) {
            $scooter->image_url = $this->publicUrl($scooter->image_path);
            return $scooter;
        });

        $testimonials = Testimonial::latest()->take(6)->get()->map(function ($testimonial) {
            $testimonial->photo_url = $this->publicUrl($testimonial->photo_path);
            return $testimonial;
        });

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'scooters' => $scooters,
            'testimonials' => $testimonials,
            'site_settings' => SiteSetting::first(),
        ]);
    }

    /**
     * Generate public URL for storage files.
     */
    private function publicUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }
        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }
        if (Str::startsWith($path, 'storage/')) {
            $path = Str::after($path, 'storage/');
        }

        return Storage::disk('public')->url($path);
    }
}
