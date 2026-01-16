<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    /**
     * Show the form for editing the site settings.
     */
    public function edit()
    {
        $settings = SiteSetting::first();

        // Ensure default structure if empty
        if (! $settings) {
            $settings = new SiteSetting([
                'site_name' => 'Prabu Scooter Bali',
                'social_links' => [],
            ]);
        }

        return Inertia::render('Admin/Settings/Edit', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the site settings.
     */
    public function update(Request $request)
    {
        $request->validate([
            'site_name' => 'required|string|max:255',
            'wa_number' => 'required|string|max:20',
            'hero_title' => 'nullable|string|max:255',
            'hero_highlight' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'open_hours' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'map_embed_url' => 'nullable|string',
            'contact_title' => 'nullable|string|max:255',
            'contact_description' => 'nullable|string',
            'social_links' => 'nullable|array',
            'social_links.instagram' => 'nullable|string|url',
            'social_links.facebook' => 'nullable|string|url',
            'social_links.tiktok' => 'nullable|string|url',
        ]);

        $settings = SiteSetting::first();

        if (! $settings) {
            $settings = new SiteSetting;
        }

        $settings->fill($request->all());
        $settings->save();

        return redirect()->route('settings.edit')->with('success', 'Settings updated successfully.');
    }
}
