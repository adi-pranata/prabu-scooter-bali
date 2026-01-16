<?php

namespace App\Http\Controllers;

use App\Models\Scooter;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page.
     */
    public function index()
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'scooters' => Scooter::all(),
            'testimonials' => Testimonial::latest()->take(6)->get(),
            'site_settings' => SiteSetting::first(),
        ]);
    }
}
