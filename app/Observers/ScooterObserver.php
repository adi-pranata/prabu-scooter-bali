<?php

namespace App\Observers;

use App\Models\Scooter;

class ScooterObserver
{
    /**
     * Handle the Scooter "created" event.
     */
    public function created(Scooter $scooter): void
    {
        //
    }

    /**
     * Handle the Scooter "saved" event.
     */
    public function saving(Scooter $scooter): void
    {
        $scooter->name = trim($scooter->name);
        if ($scooter->slug || $scooter->isDirty('name')) {
            $scooter->slug = \Str::slug($scooter->name);
        }
    }

    /**
     * Handle the Scooter "deleted" event.
     */
    public function deleted(Scooter $scooter): void
    {
        //
    }

    /**
     * Handle the Scooter "restored" event.
     */
    public function restored(Scooter $scooter): void
    {
        //
    }

    /**
     * Handle the Scooter "force deleted" event.
     */
    public function forceDeleted(Scooter $scooter): void
    {
        //
    }
}
