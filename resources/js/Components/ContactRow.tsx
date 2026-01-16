import React from 'react';

type Props = {
    icon: React.ReactNode;
    children: React.ReactNode;
};

export default function ContactRow({ icon, children }: Props) {
    return (
        <div className="flex items-start gap-5">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full">
                {/* icon warna orange */}
                <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-primary">{icon}</span>
            </div>

            <div className="min-w-0 text-[16px] leading-relaxed text-gray-500">{children}</div>
        </div>
    );
}
