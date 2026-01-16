<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    @foreach ($pages as $page)
        <url>
            <loc>{{ $page }}</loc>
            <lastmod>{{ $lastModificationDate }}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
    @endforeach
</urlset>
