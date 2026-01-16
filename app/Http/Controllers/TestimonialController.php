<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = Testimonial::latest()->get();
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Testimonials/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'content' => 'required|string',
            'photo' => 'required|image|max:2048', // 2MB Max
        ]);

        $photoPath = $request->file('photo')->store('testimonials', 'public');

        Testimonial::create([
            'name' => $validated['name'],
            'rating' => $validated['rating'],
            'content' => $validated['content'],
            'photo_path' => $photoPath,
        ]);

        return redirect()->route('testimonials.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('Admin/Testimonials/Edit', [
            'testimonial' => $testimonial
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'content' => 'required|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = [
            'name' => $validated['name'],
            'rating' => $validated['rating'],
            'content' => $validated['content'],
        ];

        if ($request->hasFile('photo')) {
            if ($testimonial->photo_path) {
                Storage::disk('public')->delete($testimonial->photo_path);
            }
            $data['photo_path'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial->update($data);

        return redirect()->route('testimonials.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->photo_path) {
            Storage::disk('public')->delete($testimonial->photo_path);
        }
        $testimonial->delete();

        return redirect()->route('testimonials.index');
    }
}
