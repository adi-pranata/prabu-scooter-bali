import { SiteSettings } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Call,
    CloseCircle,
    Facebook,
    HambergerMenu,
    Instagram,
    Location,
    Music,
    Sms,
} from 'iconsax-react';
import { PropsWithChildren, useEffect, useState } from 'react';

interface Props extends PropsWithChildren {
    settings?: SiteSettings;
}

export default function FrontendLayout({ children, settings }: Props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Become a renter', href: '#features' },
        { label: 'Rental deals', href: '#scooters' },
        { label: 'How it work', href: '#how-it-works' },
        { label: 'Why choose us', href: '#features' },
    ];

    const getWhatsAppLink = (scooterName?: string) => {
        const number = settings?.wa_number || '+6283119584477';
        const text = scooterName
            ? `Hello, I would like to rent the ${scooterName}. Is it available?`
            : 'Hello, I would like to rent a scooter.';
        return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    };

    return (
        <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased">
            {/* Navbar */}
            <header
                className={`fixed z-50 w-full transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white py-3 shadow-sm sm:py-4'
                        : 'bg-white py-4 sm:py-5'
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/images/svgs/prabu-logo.svg"
                                alt="PRABU"
                                className="h-6 sm:h-7"
                            />
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-600 xl:px-6"
                        >
                            Book Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="p-2 text-gray-600 hover:text-primary focus:outline-none lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <CloseCircle size={24} variant="Bold" />
                        ) : (
                            <HambergerMenu size={24} />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white px-6 pt-20 lg:hidden">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="border-b border-gray-100 py-3 text-base font-medium text-gray-700 hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={getWhatsAppLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 rounded-lg bg-primary px-6 py-3 text-center font-bold text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Book Now
                        </a>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer
                className="bg-dark py-12 text-gray-300 sm:py-16"
                id="contact"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
                        {/* Brand */}
                        <div className="col-span-1">
                            <div className="mb-4">
                                <img
                                    src="/images/svgs/prabu-logo.svg"
                                    alt="PRABU"
                                    className="h-6 brightness-0 invert sm:h-7"
                                />
                            </div>
                            <p className="mb-6 text-sm leading-relaxed text-gray-400">
                                Premium scooter rental service in Bali. Best
                                prices, well-maintained bikes, and friendly
                                service.
                            </p>
                            <div className="flex gap-4">
                                {settings?.social_links?.instagram && (
                                    <a
                                        href={settings.social_links.instagram}
                                        target="_blank"
                                        rel="noopener"
                                        className="transition-colors hover:text-primary"
                                    >
                                        <Instagram size={20} />
                                    </a>
                                )}
                                {settings?.social_links?.facebook && (
                                    <a
                                        href={settings.social_links.facebook}
                                        target="_blank"
                                        rel="noopener"
                                        className="transition-colors hover:text-primary"
                                    >
                                        <Facebook size={20} />
                                    </a>
                                )}
                                {settings?.social_links?.tiktok && (
                                    <a
                                        href={settings.social_links.tiktok}
                                        target="_blank"
                                        rel="noopener"
                                        className="transition-colors hover:text-primary"
                                    >
                                        <Music size={20} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#scooters"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Our Fleet
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#testimonials"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Reviews
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">
                                Services
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#scooters"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Scooter Rental
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Free Delivery
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Long Term Rental
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Airport Pickup
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">
                                Contact Us
                            </h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <Location
                                        size={18}
                                        className="mt-0.5 flex-shrink-0 text-primary"
                                    />
                                    <span>Canggu, Bali, Indonesia</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Call
                                        size={18}
                                        className="flex-shrink-0 text-primary"
                                    />
                                    <span>
                                        {settings?.phone ||
                                            settings?.wa_number ||
                                            '+62 812 3456 789'}
                                    </span>
                                </li>
                                {settings?.email && (
                                    <li className="flex items-center gap-3">
                                        <Sms
                                            size={18}
                                            className="flex-shrink-0 text-primary"
                                        />
                                        <span>{settings.email}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500 sm:mt-12 sm:pt-8 sm:text-sm">
                        &copy; {new Date().getFullYear()}{' '}
                        {settings?.site_name || 'Prabu Scooter Bali'}. All
                        rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
