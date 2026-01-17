<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class PublicStorageController extends Controller
{
    public function show(string $path)
    {
        // Anti path traversal (../)
        $path = ltrim($path, '/');
        if (str_contains($path, '..')) {
            abort(404);
        }

        // Optional: batasi hanya folder tertentu biar aman
        // contoh: hanya allow scooters/*
        if (! str_starts_with($path, 'scooters/')) {
            abort(404);
        }

        if (! Storage::disk('public')->exists($path)) {
            abort(404);
        }

        $fullPath = Storage::disk('public')->path($path);

        return response()->file($fullPath, [
            'Cache-Control' => 'public, max-age=31536000',
        ]);
    }
}
