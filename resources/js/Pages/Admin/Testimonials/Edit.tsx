import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Testimonial } from '@/types';

export default function Edit({ testimonial }: { testimonial: Testimonial }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: testimonial.name,
        rating: testimonial.rating,
        content: testimonial.content,
        photo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('testimonials.update', testimonial.id));
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('testimonials.index')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Testimonial
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${testimonial.name}`} />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100 dark:border-gray-700">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Customer Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Rating */}
                            <div>
                                <InputLabel htmlFor="rating" value="Rating (1-5)" />
                                <select
                                    id="rating"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-600 focus:ring-orange-500 dark:focus:ring-orange-600 rounded-md shadow-sm"
                                    value={data.rating}
                                    onChange={(e) => setData('rating', parseInt(e.target.value))}
                                    required
                                >
                                    {[5, 4, 3, 2, 1].map((r) => (
                                        <option key={r} value={r}>
                                            {r} Stars
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.rating} className="mt-2" />
                            </div>

                            {/* Photo */}
                            <div>
                                <InputLabel htmlFor="photo" value="Update Photo (Optional)" />
                                <div className="mt-1 flex gap-4 items-center">
                                    {testimonial.photo_path && (
                                        <img
                                            src={`/storage/${testimonial.photo_path}`}
                                            alt="Current"
                                            className="h-12 w-12 rounded-full object-cover border border-gray-200"
                                        />
                                    )}
                                    <input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        onChange={(e) => setData('photo', e.target.files ? e.target.files[0] : null)}
                                    />
                                </div>
                                <InputError message={errors.photo} className="mt-2" />
                            </div>

                            {/* Content */}
                            <div>
                                <InputLabel htmlFor="content" value="Review Content" />
                                <textarea
                                    id="content"
                                    className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-600 focus:ring-orange-500 dark:focus:ring-orange-600 rounded-md shadow-sm"
                                    rows={4}
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    required
                                />
                                <InputError message={errors.content} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Link
                                href={route('testimonials.index')}
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-sm font-medium"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton className="bg-orange-600 hover:bg-orange-500" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
