import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { SiteSettings } from '@/types';
import { FormEventHandler } from 'react';

export default function Edit({ settings }: { settings: SiteSettings }) {
    const { data, setData, patch, processing, errors } = useForm({
        site_name: settings.site_name || 'Prabu Scooter Bali',
        wa_number: settings.wa_number || '',
        hero_title: settings.hero_title || '',
        hero_highlight: settings.hero_highlight || '',
        hero_subtitle: settings.hero_subtitle || '',
        email: settings.email || '',
        phone: settings.phone || '',
        open_hours: settings.open_hours || '',
        address: settings.address || '',
        map_embed_url: settings.map_embed_url || '',
        contact_title: settings.contact_title || '',
        contact_description: settings.contact_description || '',
        social_links: {
            instagram: settings.social_links?.instagram || '',
            facebook: settings.social_links?.facebook || '',
            tiktok: settings.social_links?.tiktok || '',
        }
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('settings.update'));
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Site Settings
                </h2>
            }
        >
            <Head title="Site Settings" />

            <div className="max-w-4xl mx-auto">
                <form onSubmit={submit} className="space-y-6">
                    {/* General Settings */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="site_name" value="Site Name" />
                                <TextInput
                                    id="site_name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.site_name}
                                    onChange={(e) => setData('site_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.site_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="wa_number" value="WhatsApp Number (International format)" />
                                <TextInput
                                    id="wa_number"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.wa_number}
                                    onChange={(e) => setData('wa_number', e.target.value)}
                                    required
                                    placeholder="628123456789"
                                />
                                <p className="text-xs text-gray-500 mt-1">Start with country code (e.g. 62). No + sign.</p>
                                <InputError message={errors.wa_number} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Contact Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Phone Number (Display)" />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="+62 812 3456 789"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="open_hours" value="Opening Hours" />
                                <TextInput
                                    id="open_hours"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.open_hours}
                                    onChange={(e) => setData('open_hours', e.target.value)}
                                    placeholder="Mon - Sun: 8am - 8pm"
                                />
                                <InputError message={errors.open_hours} className="mt-2" />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="address" value="Address" />
                                <textarea
                                    id="address"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-600 focus:ring-orange-500 dark:focus:ring-orange-600 rounded-md shadow-sm"
                                    rows={2}
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Jl. Pantai Berawa No. 1..."
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="map_embed_url" value="Google Maps Embed URL" />
                                <textarea
                                    id="map_embed_url"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-600 focus:ring-orange-500 dark:focus:ring-orange-600 rounded-md shadow-sm"
                                    rows={3}
                                    value={data.map_embed_url}
                                    onChange={(e) => setData('map_embed_url', e.target.value)}
                                    placeholder="https://www.google.com/maps/embed?..."
                                />
                                <p className="text-xs text-gray-500 mt-1">Paste the 'src' attribute from Google Maps Embed HTML.</p>
                                <InputError message={errors.map_embed_url} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Contact Us Section */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Contact Us Section</h3>
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="contact_title" value="Section Title" />
                                <TextInput
                                    id="contact_title"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.contact_title}
                                    onChange={(e) => setData('contact_title', e.target.value)}
                                    placeholder="Office Center Map"
                                />
                                <InputError message={errors.contact_title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="contact_description" value="Section Description" />
                                <textarea
                                    id="contact_description"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-600 focus:ring-orange-500 dark:focus:ring-orange-600 rounded-md shadow-sm"
                                    rows={3}
                                    value={data.contact_description}
                                    onChange={(e) => setData('contact_description', e.target.value)}
                                    placeholder="if you need consultation with us..."
                                />
                                <InputError message={errors.contact_description} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Homepage Hero</h3>
                        <div className="space-y-4">
                            <div>
                                <InputLabel htmlFor="hero_title" value="Hero Title" />
                                <TextInput
                                    id="hero_title"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.hero_title}
                                    onChange={(e) => setData('hero_title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.hero_title} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="hero_highlight" value="Hero Highlight (Orange text)" />
                                <TextInput
                                    id="hero_highlight"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.hero_highlight}
                                    onChange={(e) => setData('hero_highlight', e.target.value)}
                                    placeholder="Easily"
                                />
                                <p className="text-xs text-gray-500 mt-1">This text will be highlighted/underlined in the hero section.</p>
                                <InputError message={errors.hero_highlight} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="hero_subtitle" value="Hero Subtitle" />
                                <textarea
                                    id="hero_subtitle"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-600 focus:ring-orange-500 dark:focus:ring-orange-600 rounded-md shadow-sm"
                                    rows={3}
                                    value={data.hero_subtitle}
                                    onChange={(e) => setData('hero_subtitle', e.target.value)}
                                />
                                <InputError message={errors.hero_subtitle} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Social Media</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="instagram" value="Instagram URL" />
                                <TextInput
                                    id="instagram"
                                    type="url"
                                    className="mt-1 block w-full"
                                    value={data.social_links.instagram}
                                    onChange={(e) => setData('social_links', { ...data.social_links, instagram: e.target.value })}
                                    placeholder="https://instagram.com/..."
                                />
                                <InputError message={errors['social_links.instagram']} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="facebook" value="Facebook URL" />
                                <TextInput
                                    id="facebook"
                                    type="url"
                                    className="mt-1 block w-full"
                                    value={data.social_links.facebook}
                                    onChange={(e) => setData('social_links', { ...data.social_links, facebook: e.target.value })}
                                    placeholder="https://facebook.com/..."
                                />
                                <InputError message={errors['social_links.facebook']} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="tiktok" value="TikTok URL" />
                                <TextInput
                                    id="tiktok"
                                    type="url"
                                    className="mt-1 block w-full"
                                    value={data.social_links.tiktok}
                                    onChange={(e) => setData('social_links', { ...data.social_links, tiktok: e.target.value })}
                                    placeholder="https://tiktok.com/..."
                                />
                                <InputError message={errors['social_links.tiktok']} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <PrimaryButton className="bg-orange-600 hover:bg-orange-500 px-8 py-3 dark:bg-orange-500 dark:hover:bg-orange-400" disabled={processing}>
                            {processing ? 'Saving Changes...' : 'Save Settings'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
