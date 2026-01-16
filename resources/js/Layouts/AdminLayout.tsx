import { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { User } from '@/types';
import {
    LayoutDashboard,
    Bike,
    MessageSquareQuote,
    Settings,
    Menu,
    X,
    LogOut,
    ExternalLink
} from 'lucide-react';

export default function AdminLayout({
    header,
    children,
}: PropsWithChildren<{ header?: React.ReactNode }>) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const navItems = [
        { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
        { label: 'Scooters', route: 'scooters.index', icon: Bike },
        { label: 'Testimonials', route: 'testimonials.index', icon: MessageSquareQuote },
        { label: 'Site Settings', route: 'settings.edit', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 hidden md:flex flex-col fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    </Link>
                </div>

                <div className="flex-1 py-4 flex flex-col gap-1 px-3 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.route}
                            href={route(item.route)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${route().current(item.route + '*')
                                    ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                    <Link
                        href={route('home')}
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200 mb-2"
                    >
                        <ExternalLink className="w-5 h-5" />
                        View Website
                    </Link>
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="flex-1 truncate">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user.email}
                            </p>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        >
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {showingNavigationDropdown && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setShowingNavigationDropdown(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300">
                {/* Mobile Header */}
                <div className="md:hidden h-16 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-4 sticky top-0 z-10">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    </Link>
                    <button
                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        {showingNavigationDropdown ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-30 md:hidden ${showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
                        <span className="font-bold text-lg text-gray-800 dark:text-white">Menu</span>
                        <button
                            onClick={() => setShowingNavigationDropdown(false)}
                            className="ml-auto text-gray-500"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="py-4 px-3 flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.route}
                                href={route(item.route)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${route().current(item.route + '*')
                                        ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {header && (
                    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4">
                        <div className="max-w-7xl mx-auto">{header}</div>
                    </header>
                )}

                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
