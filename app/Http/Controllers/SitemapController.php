<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SitemapController extends Controller
{
    public function index()
    {
        // For now, we only have the homepage.
        // In the future, we can add dynamic routes for scooters or blog posts here.
        $pages = [
            url('/'),
        ];

        $lastModificationDate = date('Y-m-d');

        $content = view('sitemap', compact('pages', 'lastModificationDate'));

        return Response::make($content, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
