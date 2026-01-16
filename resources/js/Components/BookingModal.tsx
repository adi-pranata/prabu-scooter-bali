import type { Scooter, SiteSettings } from '@/types';
import {
    Calendar,
    Call,
    CloseCircle,
    GasStation,
    SecuritySafe,
    Setting2,
    User,
    Whatsapp,
} from 'iconsax-react';
import { useMemo, useRef, useState } from 'react';

interface BookingModalProps {
    scooter: Scooter;
    siteSettings?: SiteSettings;
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({
    scooter,
    siteSettings,
    isOpen,
    onClose,
}: BookingModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        startDate: '',
        endDate: '',
        notes: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const waRef = useRef<HTMLAnchorElement | null>(null);

    const today = new Date().toISOString().split('T')[0];

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);

    const days = useMemo(() => {
        if (!formData.startDate || !formData.endDate) return 0;
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const diff = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );
        return diff > 0 ? diff : 0;
    }, [formData.startDate, formData.endDate]);

    const totalPrice = days * scooter.price_per_day;

    const imgSrc = useMemo(() => {
        if (!scooter.image_path)
            return 'https://placehold.co/1000x600?text=Scooter';
        if (scooter.image_path.startsWith('http')) return scooter.image_path;
        if (scooter.image_path.startsWith('storage/'))
            return `/${scooter.image_path}`;
        return `/storage/${scooter.image_path}`;
    }, [scooter.image_path]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const buildWaLink = (message: string) => {
        const raw = siteSettings?.wa_number || '6283119584477';
        let clean = raw.replace(/\D/g, '');

        if (clean.startsWith('0')) clean = `62${clean.slice(1)}`;
        if (!clean) return null;

        return `https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(message)}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!scooter.is_available) return;

        setIsSubmitting(true);

        const message =
            `*BOOKING REQUEST*\n\n` +
            `*Scooter:* ${scooter.brand} ${scooter.name}\n` +
            `*Price:* ${formatCurrency(scooter.price_per_day)}/day\n\n` +
            `*Customer Details:*\n` +
            `• Name: ${formData.fullName}\n` +
            `• Phone: ${formData.phone}\n\n` +
            `*Rental Period:*\n` +
            `• Start: ${formData.startDate}\n` +
            `• End: ${formData.endDate}\n` +
            `• Duration: ${days} day(s)\n\n` +
            `*Estimated Total:* ${formatCurrency(totalPrice)}\n` +
            (formData.notes ? `\n*Notes:* ${formData.notes}` : '');

        const link = buildWaLink(message);

        if (link) {
            if (waRef.current) {
                waRef.current.href = link;
                waRef.current.click();
            } else {
                window.open(link, '_blank', 'noopener,noreferrer');
            }

            setTimeout(() => {
                setIsSubmitting(false);
                onClose();
            }, 150);

            return;
        }

        setIsSubmitting(false);
    };

    if (!isOpen) return null;

    const specIconColor = 'rgba(255,255,255,0.92)';

    return (
        <div className="fixed inset-0 z-50">
            <button
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                    {/* hidden anchor */}
                    <a
                        ref={waRef}
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden"
                    />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 rounded-full bg-white p-1.5 shadow hover:bg-gray-100"
                    >
                        <CloseCircle size={26} color="#6B7280" />
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* LEFT */}
                        <div className="bg-gradient-to-br from-primary to-primary-600 p-6 text-white sm:p-8">
                            <div className="rounded-xl bg-white/10 p-4">
                                <div className="flex h-[240px] items-center justify-center">
                                    <img
                                        src={imgSrc}
                                        className="max-h-full w-auto object-contain"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <p className="text-xs tracking-widest text-white/60 uppercase">
                                        {scooter.brand}
                                    </p>
                                    <h3 className="text-3xl font-bold">
                                        {scooter.name}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                    <Spec
                                        icon={
                                            <User
                                                size={18}
                                                color={specIconColor}
                                            />
                                        }
                                        text={`${scooter.seats ?? 2} Passengers`}
                                    />
                                    <Spec
                                        icon={
                                            <Setting2
                                                size={18}
                                                color={specIconColor}
                                            />
                                        }
                                        text={scooter.transmission ?? 'Matic'}
                                    />
                                    <Spec
                                        icon={
                                            <GasStation
                                                size={18}
                                                color={specIconColor}
                                            />
                                        }
                                        text={scooter.fuel_type ?? 'Pertalite'}
                                    />
                                    <Spec
                                        icon={
                                            <SecuritySafe
                                                size={18}
                                                color={specIconColor}
                                            />
                                        }
                                        text="Helmets Included"
                                    />
                                </div>

                                <div className="mt-4 flex justify-between border-t border-white/20 pt-4">
                                    <span className="text-white/70">
                                        Price / day
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {formatCurrency(scooter.price_per_day)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl font-bold">
                                Book This Scooter
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                We’ll redirect you to WhatsApp
                            </p>

                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-4"
                            >
                                <Input
                                    icon={<User size={20} color="#9CA3AF" />}
                                    name="fullName"
                                    placeholder="Full Name"
                                    required
                                    onChange={handleInputChange}
                                />
                                <Input
                                    icon={<Call size={20} color="#9CA3AF" />}
                                    name="phone"
                                    placeholder="Phone / WhatsApp"
                                    required
                                    onChange={handleInputChange}
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        type="date"
                                        icon={
                                            <Calendar
                                                size={20}
                                                color="#9CA3AF"
                                            />
                                        }
                                        name="startDate"
                                        min={today}
                                        required
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="date"
                                        icon={
                                            <Calendar
                                                size={20}
                                                color="#9CA3AF"
                                            />
                                        }
                                        name="endDate"
                                        min={formData.startDate || today}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <textarea
                                    name="notes"
                                    rows={3}
                                    placeholder="Additional notes"
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white hover:brightness-95"
                                >
                                    <Whatsapp size={20} />
                                    {isSubmitting
                                        ? 'Processing...'
                                        : 'Confirm via WhatsApp'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------- SMALL COMPONENTS ---------- */

function Spec({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-3 text-sm text-white/90">
            <span className="flex h-5 w-5 items-center justify-center">
                {icon}
            </span>
            <span className="truncate">{text}</span>
        </div>
    );
}
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    icon: React.ReactNode;
};
function Input({ icon, className, ...props }: InputProps) {
    return (
        <div className="relative">
            {/* Icon */}
            <div className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400">
                {icon}
            </div>

            {/* Input */}
            <input
                {...props}
                className={`w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-11 text-sm text-gray-900 transition outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/15 ${className || ''} `}
            />
        </div>
    );
}
