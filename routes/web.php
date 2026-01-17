<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicStorageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/storage/{path}', [PublicStorageController::class, 'show'])
    ->where('path', '.*');

Route::get('/', [\App\Http\Controllers\WelcomeController::class, 'index'])->name('home');
Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('scooters', \App\Http\Controllers\ScooterController::class);
    Route::resource('testimonials', \App\Http\Controllers\TestimonialController::class);

    Route::get('/settings', [\App\Http\Controllers\SiteSettingController::class, 'edit'])->name('settings.edit');
    Route::patch('/settings', [\App\Http\Controllers\SiteSettingController::class, 'update'])->name('settings.update');
});

require __DIR__.'/auth.php';
