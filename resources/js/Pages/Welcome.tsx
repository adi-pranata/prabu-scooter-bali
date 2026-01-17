import AnimatedNumber from '@/Components/AnimatedNumber';
import BookingModal from '@/Components/BookingModal';
import ContactRow from '@/Components/ContactRow';
import FeatureRow from '@/Components/FeatureRow';
import SocialIcon from '@/Components/SocialIcon';
import SpecItem from '@/Components/SpecItem';
import FrontendLayout from '@/Layouts/FrontendLayout';
import { Scooter, SiteSettings, Testimonial } from '@/types';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import {
    ArrowRight2,
    Calendar,
    Call,
    Clock,
    Facebook,
    GasStation,
    Instagram,
    Location,
    LocationTick,
    MessageQuestion,
    MoneySend,
    Profile,
    SecuritySafe,
    Setting2,
    Star1,
    TruckTime,
    User,
} from 'iconsax-react';
import { useState } from 'react';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    laravelVersion: string;
    phpVersion: string;
    scooters: Scooter[];
    testimonials: Testimonial[];
    site_settings: SiteSettings;
}

export default function Welcome({
    scooters,
    testimonials,
    site_settings,
}: Props) {
    const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const DEFAULT_VISIBLE = 4;
    const visibleScooters = showAll
        ? scooters
        : scooters.slice(0, DEFAULT_VISIBLE);
    const shouldShowToggle = scooters.length > DEFAULT_VISIBLE;

    const openBookingModal = (scooter: Scooter) => {
        setSelectedScooter(scooter);
        setIsModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsModalOpen(false);
        setSelectedScooter(null);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getWhatsAppLink = (scooterName?: string) => {
        const number = site_settings?.wa_number || '+6283119584477';
        const text = scooterName
            ? `Hello, I would like to rent the ${scooterName}. Is it available?`
            : 'Hello, I would like to rent a scooter.';
        return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    };

    const brands = [
        { src: '/images/brands/honda.png', alt: 'Honda' },
        { src: '/images/brands/yamaha.png', alt: 'Yamaha' },
        { src: '/images/brands/suzuki.png', alt: 'Suzuki' },
        { src: '/images/brands/kawasaki.png', alt: 'Kawasaki' },
        { src: '/images/brands/vespa.png', alt: 'Vespa' },
    ];

    return (
        <FrontendLayout settings={site_settings}>
            <Head>
                <title>{site_settings?.hero_title || 'Prabu'}</title>
                <meta
                    name="description"
                    content={
                        site_settings?.hero_subtitle ||
                        'Find, book and rent scooters easily in Bali. Free delivery around Canggu area.'
                    }
                />
                <meta
                    name="keywords"
                    content="rental motor bali, scooter rental bali, sewa motor bali, canggu scooter rental, bali bike rental"
                />
            </Head>

            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden bg-white">
                {/* World Map Background */}
                <div
                    className="pointer-events-none absolute top-20 right-0 z-0"
                    style={{ width: '790px', height: '534px' }}
                >
                    <img src="/images/map-line.png" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8 lg:pt-28">
                    <div className="grid min-h-[calc(100vh-280px)] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-4">
                        {/* Left Content */}
                        <div className="z-10 space-y-6">
                            <div className="space-y-3">
                                <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-dark sm:text-5xl lg:text-[3.2rem]">
                                    Find, book and rent
                                    <br />
                                    Scooters{' '}
                                    <span className="relative inline-block text-primary">
                                        Easily
                                        <img
                                            src="/images/svgs/easily-line.svg"
                                            alt=""
                                            className="absolute -bottom-1 left-0 w-full sm:-bottom-2"
                                        />
                                    </span>
                                </h1>
                                <p className="max-w-md text-[15px] leading-relaxed text-gray-600 sm:text-base">
                                    {site_settings?.hero_subtitle ||
                                        'Get a scooter wherever and whenever you need it with free delivery around Canggu.'}
                                </p>
                            </div>
                        </div>

                        {/* Right - Scooter Image */}
                        <div className="pointer-events-none absolute top-[70px] right-[-200px] z-10 hidden lg:block">
                            <img
                                src="/images/xmax-black-premium.png"
                                alt="Premium Scooter"
                                className="h-[571px] w-[648px] max-w-none object-contain drop-shadow-2xl"
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="relative mt-6 py-10 sm:py-12">
                        {/* Background map dotted */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
                            <img
                                src="/images/svgs/mapbase.svg"
                                alt=""
                                className="w-full max-w-6xl object-contain brightness-75 contrast-125"
                                draggable={false}
                            />
                        </div>

                        {/* content */}
                        <div className="relative z-10 grid grid-cols-3 gap-6 sm:gap-10">
                            <div className="text-center">
                                <div className="text-[28px] leading-none font-bold tracking-tight text-dark sm:text-[36px]">
                                    <AnimatedNumber value={15} />
                                    <span className="text-primary">K+</span>
                                </div>
                                <p className="mt-1 text-[14px] leading-none text-gray-400 sm:text-[16px]">
                                    Rented
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="text-[28px] leading-none font-bold tracking-tight text-dark sm:text-[36px]">
                                    <AnimatedNumber value={20} />
                                    <span className="text-primary">K+</span>
                                </div>
                                <p className="mt-1 text-[14px] leading-none text-gray-400 sm:text-[16px]">
                                    Customers
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="text-[28px] leading-none font-bold tracking-tight text-dark sm:text-[36px]">
                                    <AnimatedNumber value={150} />
                                    <span className="text-primary">+</span>
                                </div>
                                <p className="mt-1 text-[14px] leading-none text-gray-400 sm:text-[16px]">
                                    Brand
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Work */}
            <section id="how-it-works" className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 px-8 py-3">
                            <span className="text-xs font-semibold tracking-[0.18em] text-primary">
                                HOW IT WORK
                            </span>
                        </div>

                        <h2 className="mt-8 text-[38px] font-medium text-dark">
                            Rent with following 3 working steps
                        </h2>
                    </div>

                    {/* Steps */}
                    <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-2xl bg-primary/10">
                                <LocationTick
                                    size={48}
                                    variant="Bold"
                                    color="#FF9500"
                                />
                            </div>

                            <h3 className="mt-5 text-lg font-medium text-dark">
                                Choose location
                            </h3>

                            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
                                Choose your and find <br /> your best scooter
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-2xl bg-primary/10">
                                <Calendar
                                    size={48}
                                    variant="Bold"
                                    color="#FF9500"
                                />
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-dark">
                                Pick-up date
                            </h3>

                            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
                                Select your pick up date and <br /> time to book
                                your scooter
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-2xl bg-primary/10">
                                <Icon
                                    icon="mdi:scooter"
                                    width={48}
                                    height={48}
                                    color="#FF9500"
                                />
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-dark">
                                Book your scooter
                            </h3>

                            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
                                Book your scooter and we will deliver <br /> it
                                directly to you
                            </p>
                        </div>
                    </div>

                    {/* Brand logos - marquee */}
                    <div className="mt-20 overflow-hidden">
                        <div className="relative">
                            {/* fade kiri kanan */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

                            {/* TRACK (1 track) */}
                            <div className="flex w-max animate-marquee items-center gap-14 opacity-70 hover:[animation-play-state:paused]">
                                {/* set 1 */}
                                {brands.map((b) => (
                                    <img
                                        key={b.alt}
                                        src={b.src}
                                        alt={b.alt}
                                        className="h-9 w-auto shrink-0 grayscale"
                                        draggable={false}
                                    />
                                ))}

                                {/* set 2 (duplikat persis) */}
                                {brands.map((b) => (
                                    <img
                                        key={`${b.alt}-dup`}
                                        src={b.src}
                                        alt={b.alt}
                                        className="h-9 w-auto shrink-0 grayscale"
                                        draggable={false}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Why Choose Us */}
            <section id="features" className="mb-12 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
                        {/* LEFT: Image + big single watermark */}
                        <div className="relative overflow-visible">
                            {/* Logo background */}
                            <img
                                src="/images/logo-a-prabu.png"
                                alt="Watermark"
                                className="pointer-events-none absolute -left-50 w-[700px] max-w-none"
                                draggable={false}
                            />

                            {/* Motor */}
                            <img
                                src="/images/fazzio-pink-gray.png"
                                alt="Scooter"
                                className="object-contains relative z-10 w-full max-w-[600px] -translate-x-10 lg:-translate-x-50"
                                draggable={false}
                            />
                        </div>
                        {/* RIGHT: content */}
                        <div className="lg:pl-10">
                            {/* badge */}
                            <div className="inline-flex items-center rounded-xl bg-primary-50 px-7 py-3">
                                <span className="text-xs font-semibold tracking-[0.18em] text-primary">
                                    WHY CHOOSE US
                                </span>
                            </div>

                            {/* title */}
                            <h2 className="mt-7 text-[38px] leading-[1.15] font-semibold text-dark">
                                We offer the best experience <br />
                                with our rental deals
                            </h2>

                            {/* list */}
                            <div className="mt-10 space-y-7">
                                <FeatureRow
                                    icon={
                                        <MoneySend
                                            size={22}
                                            variant="Bold"
                                            color="var(--color-primary)"
                                        />
                                    }
                                    title="Best price guaranteed"
                                    description="Find a lower price? We’ll refund you 100% of the difference."
                                />
                                <FeatureRow
                                    icon={
                                        <Profile
                                            size={22}
                                            variant="Bold"
                                            color="var(--color-primary)"
                                        />
                                    }
                                    title="Experience driver"
                                    description="Don’t have driver? Don’t worry, we have many experienced driver for you."
                                />
                                <FeatureRow
                                    icon={
                                        <TruckTime
                                            size={22}
                                            variant="Bold"
                                            color="var(--color-primary)"
                                        />
                                    }
                                    title="24 hour delivery"
                                    description="Book anytime and we will deliver it directly to you."
                                />
                                <FeatureRow
                                    icon={
                                        <MessageQuestion
                                            size={22}
                                            variant="Bold"
                                            color="var(--color-primary)"
                                        />
                                    }
                                    title="24/7 technical support"
                                    description="Have a question? Contact support any time."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scooters Fleet */}
            <section id="scooters" className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 px-8 py-3">
                            <span className="text-xs font-semibold tracking-[0.18em] text-primary">
                                POPULAR RENTAL DEALS
                            </span>
                        </div>

                        <h2 className="mt-6 text-[32px] font-medium text-dark sm:text-[44px]">
                            Most popular scooters rental deals
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {visibleScooters.map((scooter) => {
                            // const ratingRaw = scooter.rating ?? 5.0;
                            // const rating = isNaN(Number(ratingRaw))
                            //     ? 5.0
                            //     : Number(ratingRaw);

                            // const reviews = scooter.reviews_count ?? 2436;
                            return (
                                <div
                                    key={scooter.id}
                                    className="rounded-2xl border border-gray-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.10)] transition hover:shadow-[0_22px_55px_rgba(15,23,42,0.14)]"
                                >
                                    <div className="px-5 pt-5 sm:px-6 sm:pt-6">
                                        {/* Image */}
                                        <div className="flex h-[140px] items-center justify-center overflow-hidden sm:h-[160px]">
                                            <img
                                                src={
                                                    scooter.image_url ??
                                                    '/images/placeholder-scooter.png'
                                                }
                                                alt={scooter.name}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>

                                        {/* Name */}
                                        <h3 className="mt-4 text-[20px] leading-tight font-semibold text-dark sm:text-[22px]">
                                            {scooter.name}
                                        </h3>

                                        {/* Rating */}
                                        {/* <div className="mt-2 flex items-center gap-2 text-[14px] sm:text-[15px]">
                                            <Star1
                                                size={20}
                                                variant="Bold"
                                                color="#F59E0B"
                                            /> */}
                                        {/* <span className="font-semibold text-dark">
                                                {rating}
                                            </span>
                                            <span className="text-gray-400">
                                                (
                                                {Number(
                                                    reviews,
                                                ).toLocaleString()}{' '}
                                                reviews)
                                            </span> */}
                                        {/* </div> */}

                                        {/* Specs 2x2 (rapi) */}
                                        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-5">
                                            <SpecItem
                                                icon={User}
                                                text="2 Passengers"
                                            />
                                            <SpecItem
                                                icon={Setting2}
                                                text="Matic"
                                            />
                                            <SpecItem
                                                icon={GasStation}
                                                text="Pertamax"
                                            />
                                            <SpecItem
                                                icon={SecuritySafe}
                                                text="Included"
                                            />
                                        </div>

                                        {/* Divider */}
                                        <div className="mt-5 h-px w-full bg-gray-100" />

                                        {/* Price */}
                                        <div className="mt-4 flex items-baseline justify-between">
                                            <span className="text-[13px] text-gray-400 sm:text-sm">
                                                Price
                                            </span>

                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[18px] font-semibold text-dark sm:text-[20px]">
                                                    {formatCurrency(
                                                        scooter.price_per_day,
                                                    )}
                                                </span>
                                                <span className="text-[13px] text-gray-400 sm:text-sm">
                                                    /day
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Button */}
                                    <div className="px-5 pt-4 pb-5 sm:px-6 sm:pb-6">
                                        <button
                                            onClick={() =>
                                                scooter.is_available &&
                                                openBookingModal(scooter)
                                            }
                                            disabled={!scooter.is_available}
                                            className={[
                                                'flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition',
                                                scooter.is_available
                                                    ? 'bg-primary text-white hover:brightness-95'
                                                    : 'cursor-not-allowed bg-gray-200 text-gray-400',
                                            ].join(' ')}
                                        >
                                            Rent Now
                                            <ArrowRight2
                                                size={18}
                                                variant="Linear"
                                                color="#FFFFFF"
                                            />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Optional: Show all */}
                    {shouldShowToggle && (
                        <div className="mt-12 flex justify-center">
                            <button
                                type="button"
                                onClick={() => setShowAll((prev) => !prev)}
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            >
                                {showAll ? 'Show less' : 'Show all scooters'}{' '}
                                <span aria-hidden>→</span>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Us */}
            <section id="contact" className="bg-white py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 px-8 py-3">
                            <span className="text-xs font-semibold tracking-[0.18em] text-primary">
                                CONTACT US
                            </span>
                        </div>

                        <h2 className="mt-6 text-[34px] font-semibold text-dark sm:text-[46px]">
                            {site_settings?.contact_title ||
                                'Office Center Map'}
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left info */}
                        <div className="space-y-10">
                            <p className="max-w-md text-[15px] leading-relaxed text-gray-400">
                                {site_settings?.contact_description ||
                                    'if you need consultation with us, you can write a message or call us, we will respond as quickly as possible'}
                            </p>

                            <div className="space-y-8">
                                <ContactRow
                                    icon={
                                        <Call
                                            variant="Linear"
                                            color="var(--color-primary)"
                                        />
                                    }
                                >
                                    <a
                                        href={`tel:${site_settings?.phone ?? '+6283119584477'}`}
                                        className="hover:text-dark"
                                    >
                                        {site_settings?.phone ??
                                            '+62 831 1958 4477'}
                                    </a>
                                </ContactRow>

                                <ContactRow
                                    icon={
                                        <Clock
                                            variant="Linear"
                                            color="var(--color-primary)"
                                        />
                                    }
                                >
                                    {site_settings?.open_hours ??
                                        'Everyday : 08.00-21.00'}
                                </ContactRow>

                                <ContactRow
                                    icon={
                                        <Location
                                            variant="Linear"
                                            color="var(--color-primary)"
                                        />
                                    }
                                >
                                    {site_settings?.address ??
                                        'Jl. Pantai Pererenan No.40, Pererenan, Kec. Mengwi, Mangupura, Bali 80351'}
                                </ContactRow>
                            </div>

                            {/* Socials */}
                            <div className="pt-4">
                                <div className="flex items-center gap-4">
                                    {site_settings?.social_links?.instagram && (
                                        <SocialIcon
                                            href={
                                                site_settings.social_links
                                                    .instagram
                                            }
                                            label="Instagram"
                                            icon={
                                                <Instagram variant="Linear" />
                                            }
                                        />
                                    )}

                                    {site_settings?.social_links?.facebook && (
                                        <SocialIcon
                                            href={
                                                site_settings.social_links
                                                    .facebook
                                            }
                                            label="Facebook"
                                            icon={<Facebook variant="Linear" />}
                                        />
                                    )}

                                    {site_settings?.social_links?.tiktok && (
                                        <SocialIcon
                                            href={
                                                site_settings.social_links
                                                    .tiktok
                                            }
                                            label="TikTok"
                                            icon={
                                                <Icon
                                                    icon="ic:baseline-tiktok"
                                                    width={20}
                                                    height={20}
                                                />
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right map */}
                        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                            <div className="aspect-[16/10] w-full">
                                <iframe
                                    title="Google Map"
                                    src={
                                        site_settings?.map_embed_url ??
                                        'https://www.google.com/maps?q=Jl.+Pantai+Pererenan+No.40,+Pererenan,+Bali&z=16&output=embed'
                                    }
                                    className="h-full w-full"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section id="testimonials" className="bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center rounded-xl bg-primary/10 px-8 py-3">
                                <span className="text-xs font-semibold tracking-[0.18em] text-primary">
                                    Contact Us
                                </span>
                            </div>

                            <h2 className="mt-6 text-[32px] font-medium text-dark sm:text-[44px]">
                                What Our Customers Say
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="relative rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8"
                                >
                                    <div className="mb-4 flex items-center gap-1 text-primary">
                                        {[...Array(5)].map((_, i) => (
                                            <Star1
                                                key={i}
                                                size={16}
                                                variant={
                                                    i < testimonial.rating
                                                        ? 'Bold'
                                                        : 'Linear'
                                                }
                                            />
                                        ))}
                                    </div>
                                    <p className="mb-5 text-sm text-gray-600 italic sm:mb-6 sm:text-base">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <img
                                            src={
                                                testimonial.photo_url ??
                                                'https://placehold.co/100'
                                            }
                                            alt={testimonial.name}
                                            className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                                        />
                                        <div>
                                            <h4 className="text-sm font-bold text-dark sm:text-base">
                                                {testimonial.name}
                                            </h4>
                                            <span className="text-xs text-gray-400">
                                                Customer
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-dark py-16 text-white sm:py-20">
                <div className="absolute inset-0 opacity-5">
                    <img
                        src="/images/svgs/map-world.svg"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-5xl">
                        Ready to Explore Bali?
                    </h2>
                    <p className="mx-auto mb-6 max-w-2xl text-base text-gray-400 sm:mb-8 sm:text-xl">
                        Don't let transportation hold you back. Book your
                        scooter today and enjoy the freedom of the road.
                    </p>
                    <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-600 sm:px-8 sm:py-4 sm:text-lg"
                    >
                        Book Your Bike Now
                    </a>
                </div>
            </section>

            {/* Booking Modal */}
            {selectedScooter && (
                <BookingModal
                    scooter={selectedScooter}
                    siteSettings={site_settings}
                    isOpen={isModalOpen}
                    onClose={closeBookingModal}
                />
            )}
        </FrontendLayout>
    );
}
