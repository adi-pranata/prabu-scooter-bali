import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Scooter {
    id: number;
    name: string;
    slug: string;
    brand: string;
    price_per_day: number;
    image_url: string;
    description?: string;
    is_popular: boolean;
    is_available: boolean;
    rating?: number;
    reviews_count?: number;
    seats: number;
    transmission: 'Matic' | 'Manual';
    engine_cc?: number;
    fuel_type: 'Pertamax' | 'Pertalite';
    helmets_included: boolean;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: number;
    name: string;
    rating: number;
    content: string;
    photo_path: string;
    created_at: string;
    updated_at: string;
}

export interface SiteSettings {
    id: number;
    site_name: string;
    wa_number: string;
    hero_title: string;
    hero_highlight?: string;
    hero_subtitle?: string;
    email?: string;
    phone?: string;
    open_hours?: string;
    address?: string;
    map_embed_url?: string;
    contact_title?: string;
    contact_description?: string;
    social_links: {
        instagram?: string;
        facebook?: string;
        tiktok?: string;
    } | null;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
