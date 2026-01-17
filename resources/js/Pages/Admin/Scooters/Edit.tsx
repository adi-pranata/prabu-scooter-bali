import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Scooter } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Edit({ scooter }: { scooter: Scooter }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: scooter.name,
        brand: scooter.brand,
        price_per_day: scooter.price_per_day.toString(),
        image: null as File | null,
        description: scooter.description || '',
        is_available: Boolean(scooter.is_available),
        is_popular: Boolean(scooter.is_popular),
        seats: scooter.seats || 2,
        transmission: (scooter.transmission || 'matic') as 'matic' | 'manual',
        engine_cc: scooter.engine_cc || ('' as number | ''),
        fuel_type: (scooter.fuel_type || 'pertalite') as
            | 'pertalite'
            | 'pertamax',
        helmets_included:
            scooter.helmets_included !== undefined
                ? Boolean(scooter.helmets_included)
                : true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Since we are sending a file (image), we must use post with _method: put
        post(route('scooters.update', scooter.id));
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('scooters.index')}
                        className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Link>
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Edit Scooter: {scooter.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${scooter.name}`} />

            <div className="mx-auto max-w-2xl">
                <div className="overflow-hidden border border-gray-100 bg-white p-6 shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Model Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    isFocused
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Brand */}
                            <div>
                                <InputLabel htmlFor="brand" value="Brand" />
                                <TextInput
                                    id="brand"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.brand}
                                    onChange={(e) =>
                                        setData('brand', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.brand}
                                    className="mt-2"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <InputLabel
                                    htmlFor="price"
                                    value="Daily Price (IDR)"
                                />
                                <TextInput
                                    id="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.price_per_day}
                                    onChange={(e) =>
                                        setData('price_per_day', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.price_per_day}
                                    className="mt-2"
                                />
                            </div>

                            {/* Seats */}
                            <div>
                                <InputLabel htmlFor="seats" value="Seats" />
                                <TextInput
                                    id="seats"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.seats}
                                    onChange={(e) =>
                                        setData(
                                            'seats',
                                            parseInt(e.target.value),
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.seats}
                                    className="mt-2"
                                />
                            </div>

                            {/* Transmission */}
                            <div>
                                <InputLabel
                                    htmlFor="transmission"
                                    value="Transmission"
                                />
                                <select
                                    id="transmission"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-orange-600 dark:focus:ring-orange-600"
                                    value={data.transmission}
                                    onChange={(e) =>
                                        setData(
                                            'transmission',
                                            e.target.value as
                                            | 'matic'
                                            | 'manual',
                                        )
                                    }
                                    required
                                >
                                    <option value="matic">Matic</option>
                                    <option value="manual">Manual</option>
                                </select>
                                <InputError
                                    message={errors.transmission}
                                    className="mt-2"
                                />
                            </div>

                            {/* Engine CC */}
                            <div>
                                <InputLabel
                                    htmlFor="engine_cc"
                                    value="Engine CC (Optional)"
                                />
                                <TextInput
                                    id="engine_cc"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.engine_cc}
                                    onChange={(e) =>
                                        setData(
                                            'engine_cc',
                                            e.target.value
                                                ? parseInt(e.target.value)
                                                : '',
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.engine_cc}
                                    className="mt-2"
                                />
                            </div>

                            {/* Fuel Type */}
                            <div>
                                <InputLabel
                                    htmlFor="fuel_type"
                                    value="Fuel Type"
                                />
                                <select
                                    id="fuel_type"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-orange-600 dark:focus:ring-orange-600"
                                    value={data.fuel_type}
                                    onChange={(e) =>
                                        setData(
                                            'fuel_type',
                                            e.target.value as
                                            | 'pertamax'
                                            | 'pertalite',
                                        )
                                    }
                                    required
                                >
                                    <option value="pertalite">Pertalite</option>
                                    <option value="pertamax">Pertamax</option>
                                </select>
                                <InputError
                                    message={errors.fuel_type}
                                    className="mt-2"
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <InputLabel
                                    htmlFor="image"
                                    value="Update Image (Optional)"
                                />
                                <div className="mt-1 flex items-center gap-4">
                                    {scooter.image_url && (
                                        <img
                                            src={scooter.image_url}
                                            alt="Current"
                                            className="h-12 w-12 rounded border border-gray-200 object-cover"
                                        />
                                    )}
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                                        onChange={(e) =>
                                            setData(
                                                'image',
                                                e.target.files
                                                    ? e.target.files[0]
                                                    : null,
                                            )
                                        }
                                    />
                                </div>
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel
                                htmlFor="description"
                                value="Description / Features"
                            />
                            <textarea
                                id="description"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-orange-600 dark:focus:ring-orange-600"
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        {/* Toggles */}
                        <div className="flex gap-8">
                            <label className="flex items-center">
                                <Checkbox
                                    name="is_available"
                                    checked={data.is_available}
                                    onChange={(e) =>
                                        setData(
                                            'is_available',
                                            e.target.checked,
                                        )
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    Available for Rent
                                </span>
                            </label>

                            <label className="flex items-center">
                                <Checkbox
                                    name="is_popular"
                                    checked={data.is_popular}
                                    onChange={(e) =>
                                        setData('is_popular', e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    Mark as Popular
                                </span>
                            </label>

                            <label className="flex items-center">
                                <Checkbox
                                    name="helmets_included"
                                    checked={data.helmets_included}
                                    onChange={(e) =>
                                        setData(
                                            'helmets_included',
                                            e.target.checked,
                                        )
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    Helmets Included
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Link
                                href={route('scooters.index')}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Cancel
                            </Link>

                            <PrimaryButton
                                className="bg-orange-600 hover:bg-orange-500"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
