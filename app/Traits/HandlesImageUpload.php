<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HandlesImageUpload
{
    /**
     * Process and store an uploaded image, converting to WebP if possible.
     *
     * @param UploadedFile $file The uploaded file
     * @param string $directory The storage directory (e.g., 'scooters', 'testimonials')
     * @param string|null $oldPath The old file path to delete (optional)
     * @return string The stored file path
     */
    protected function processImage(UploadedFile $file, string $directory, ?string $oldPath = null): string
    {
        // Delete old file if exists
        if ($oldPath) {
            Storage::disk('public')->delete($oldPath);
        }

        // Get the file content and extension
        $extension = strtolower($file->getClientOriginalExtension());
        $filename = Str::random(40);

        // Try to convert to WebP for better performance
        if ($this->canConvertToWebP($extension)) {
            $webpPath = $this->convertToWebP($file, $directory, $filename);
            if ($webpPath) {
                return $webpPath;
            }
        }

        // Fallback: store original file
        return $file->store($directory, 'public');
    }

    /**
     * Check if the file can be converted to WebP.
     */
    protected function canConvertToWebP(string $extension): bool
    {
        $supported = ['jpg', 'jpeg', 'png', 'gif'];
        return in_array($extension, $supported) && function_exists('imagewebp');
    }

    /**
     * Convert image to WebP format.
     */
    protected function convertToWebP(UploadedFile $file, string $directory, string $filename): ?string
    {
        try {
            $extension = strtolower($file->getClientOriginalExtension());

            // Create image resource based on file type
            $image = match ($extension) {
                'jpg', 'jpeg' => imagecreatefromjpeg($file->getRealPath()),
                'png' => imagecreatefrompng($file->getRealPath()),
                'gif' => imagecreatefromgif($file->getRealPath()),
                default => null,
            };

            if (!$image) {
                return null;
            }

            // Handle PNG transparency
            if ($extension === 'png') {
                imagepalettetotruecolor($image);
                imagealphablending($image, true);
                imagesavealpha($image, true);
            }

            // Create the webp file path
            $webpFilename = $filename . '.webp';
            $relativePath = $directory . '/' . $webpFilename;
            $fullPath = Storage::disk('public')->path($relativePath);

            // Ensure directory exists
            $dirPath = dirname($fullPath);
            if (!is_dir($dirPath)) {
                mkdir($dirPath, 0755, true);
            }

            // Convert to WebP with 85% quality (good balance between size and quality)
            $success = imagewebp($image, $fullPath, 85);
            imagedestroy($image);

            if ($success) {
                return $relativePath;
            }

            return null;
        } catch (\Exception $e) {
            // Log error if needed
            // Log::error('WebP conversion failed: ' . $e->getMessage());
            return null;
        }
    }
}
