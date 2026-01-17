import AdminLayout from '@/Layouts/AdminLayout';
import { Scooter } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';

interface Props {
    scooters: Scooter[];
}

export default function Index({ scooters }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this scooter?')) {
            router.delete(route('scooters.destroy', id));
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Scooters
                    </h2>
                    <Link
                        href={route('scooters.create')}
                        className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                        <Plus className="h-4 w-4" />
                        Add Scooter
                    </Link>
                </div>
            }
        >
            <Head title="Scooters" />

            <div className="overflow-hidden border border-gray-100 bg-white shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
                                >
                                    Scooter
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
                                >
                                    Price / Day
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                            {scooters.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No scooters found. Start by adding one.
                                    </td>
                                </tr>
                            ) : (
                                scooters.map((scooter) => (
                                    <tr
                                        key={scooter.id}
                                        className="dark:hover:bg-gray-750 transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <img
                                                        className="h-10 w-10 rounded-lg bg-gray-100 object-cover"
                                                        src={
                                                            scooter.image_url ??
                                                            'https://placehold.co/100'
                                                        }
                                                        alt={scooter.name}
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {scooter.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {scooter.brand}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                IDR{' '}
                                                {Number(
                                                    scooter.price_per_day,
                                                ).toLocaleString('id-ID')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                <span
                                                    className={`inline-flex w-fit rounded-full px-2 text-xs leading-5 font-semibold ${
                                                        scooter.is_available
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}
                                                >
                                                    {scooter.is_available
                                                        ? 'Available'
                                                        : 'Booked'}
                                                </span>
                                                {scooter.is_popular && (
                                                    <span className="inline-flex w-fit rounded-full bg-yellow-100 px-2 text-xs leading-5 font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                        Popular
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route(
                                                        'scooters.edit',
                                                        scooter.id,
                                                    )}
                                                    className="text-gray-400 transition-colors hover:text-orange-600"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(scooter.id)
                                                    }
                                                    className="text-gray-400 transition-colors hover:text-red-600"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
