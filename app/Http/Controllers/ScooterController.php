<?php

namespace App\Http\Controllers;

use App\Models\Scooter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ScooterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scooters = Scooter::latest()->get()->map(function ($item) {
            $item->image_url = $this->publicUrl($item->image_path);

            return $item;
        });

        return Inertia::render('Admin/Scooters/Index', [
            'scooters' => $scooters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Scooters/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|max:255',
            'price_per_day' => 'required|numeric|min:0',
            'image' => 'required|image|max:2048', // 2MB Max
            'description' => 'nullable|string',
            'is_available' => 'boolean',
            'is_popular' => 'boolean',
            'seats' => 'required|integer|min:1',
            'transmission' => 'required|in:matic,manual',
            'engine_cc' => 'nullable|integer|min:1',
            'fuel_type' => 'required|in:pertamax,pertalite',
            'helmets_included' => 'boolean',
        ]);

        $imagePath = $request->file('image')->store('scooters', 'public');

        Scooter::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name).'-'.Str::random(6),
            'brand' => $request->brand,
            'price_per_day' => $request->price_per_day,
            'image_path' => $imagePath,
            'description' => $request->description,
            'is_available' => $request->is_available ?? true,
            'is_popular' => $request->is_popular ?? false,
            'seats' => $request->seats,
            'transmission' => $request->transmission,
            'engine_cc' => $request->engine_cc,
            'fuel_type' => $request->fuel_type,
            'helmets_included' => $request->helmets_included ?? true,
        ]);

        return redirect()->route('scooters.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Scooter $scooter)
    {
        $scooter->image_url = $scooter->image_path
            ? Storage::disk('public')->url($scooter->image_path)
            : null;

        return Inertia::render('Admin/Scooters/Edit', [
            'scooter' => $scooter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Scooter $scooter)
    {
        $request->validate([
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
            'name' => $request->name,
            'brand' => $request->brand,
            'price_per_day' => $request->price_per_day,
            'description' => $request->description,
            'is_available' => $request->is_available,
            'is_popular' => $request->is_popular,
            'seats' => $request->seats,
            'transmission' => $request->transmission,
            'engine_cc' => $request->engine_cc,
            'fuel_type' => $request->fuel_type,
            'helmets_included' => $request->helmets_included,
        ];

        if ($request->name !== $scooter->name) {
            $data['slug'] = Str::slug($request->name).'-'.Str::random(6);
        }

        if ($request->hasFile('image')) {
            if ($scooter->image_path) {
                Storage::disk('public')->delete($scooter->image_path);
            }
            $data['image_path'] = $request->file('image')->store('scooters', 'public');
        }

        $scooter->update($data);

        return redirect()->route('scooters.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Scooter $scooter)
    {
        if ($scooter->image_path) {
            Storage::disk('public')->delete($scooter->image_path);
        }
        $scooter->delete();

        return redirect()->route('scooters.index');
    }

    use Illuminate\Support\Facades\Storage;
    use Illuminate\Support\Str;

    private function publicUrl(?string $path): ?string
    {
        if (! $path) {
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
