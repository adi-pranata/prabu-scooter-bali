<?php

namespace App\Http\Controllers;

use App\Models\Scooter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ScooterController extends Controller
{
    public function index()
    {
        $scooters = Scooter::latest()->get()->map(function ($s) {
            $s->image_url = $this->publicUrl($s->image_path);

            return $s;
        });

        return Inertia::render('Admin/Scooters/Index', [
            'scooters' => $scooters,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Scooters/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'price_per_day' => 'required|numeric|min:0',
            'image' => 'required|image|max:2048',
            'description' => 'nullable|string',
            'is_available' => 'boolean',
            'is_popular' => 'boolean',
            'seats' => 'required|integer|min:1',
            'transmission' => 'required|in:matic,manual',
            'engine_cc' => 'nullable|integer|min:1',
            'fuel_type' => 'required|in:pertamax,pertalite',
            'helmets_included' => 'boolean',
        ]);

        // simpan hanya path relatif di disk public: "scooters/xxxx.jpg"
        $imagePath = $request->file('image')->store('scooters', 'public');

        Scooter::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']).'-'.Str::random(6),
            'brand' => $validated['brand'],
            'price_per_day' => $validated['price_per_day'],
            'image_path' => $imagePath,
            'description' => $validated['description'] ?? null,
            'is_available' => $validated['is_available'] ?? true,
            'is_popular' => $validated['is_popular'] ?? false,
            'seats' => $validated['seats'],
            'transmission' => $validated['transmission'],
            'engine_cc' => $validated['engine_cc'] ?? null,
            'fuel_type' => $validated['fuel_type'],
            'helmets_included' => $validated['helmets_included'] ?? true,
        ]);

        return redirect()->route('scooters.index');
    }

    public function edit(Scooter $scooter)
    {
        $scooter->image_url = $this->publicUrl($scooter->image_path);

        return Inertia::render('Admin/Scooters/Edit', [
            'scooter' => $scooter,
        ]);
    }

    public function update(Request $request, Scooter $scooter)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'price_per_day' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
            'is_available' => 'boolean',
            'is_popular' => 'boolean',
            'seats' => 'required|integer|min:1',
            'transmission' => 'required|in:matic,manual',
            'engine_cc' => 'nullable|integer|min:1',
            'fuel_type' => 'required|in:pertamax,pertalite',
            'helmets_included' => 'boolean',
        ]);

        $data = [
            'name' => $validated['name'],
            'brand' => $validated['brand'],
            'price_per_day' => $validated['price_per_day'],
            'description' => $validated['description'] ?? null,
            'is_available' => $validated['is_available'] ?? $scooter->is_available,
            'is_popular' => $validated['is_popular'] ?? $scooter->is_popular,
            'seats' => $validated['seats'],
            'transmission' => $validated['transmission'],
            'engine_cc' => $validated['engine_cc'] ?? null,
            'fuel_type' => $validated['fuel_type'],
            'helmets_included' => $validated['helmets_included'] ?? $scooter->helmets_included,
        ];

        if ($validated['name'] !== $scooter->name) {
            $data['slug'] = Str::slug($validated['name']).'-'.Str::random(6);
        }

        if ($request->hasFile('image')) {
            // hapus file lama (kalau ada)
            if ($scooter->image_path && Storage::disk('public')->exists($scooter->image_path)) {
                Storage::disk('public')->delete($scooter->image_path);
            }

            $data['image_path'] = $request->file('image')->store('scooters', 'public');
        }

        $scooter->update($data);

        return redirect()->route('scooters.index');
    }

    public function destroy(Scooter $scooter)
    {
        if ($scooter->image_path && Storage::disk('public')->exists($scooter->image_path)) {
            Storage::disk('public')->delete($scooter->image_path);
        }

        $scooter->delete();

        return redirect()->route('scooters.index');
    }

    private function publicUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }
        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }
        $path = Str::startsWith($path, 'storage/') ? Str::after($path, 'storage/') : $path;

        return Storage::disk('public')->url($path);
    }
}
