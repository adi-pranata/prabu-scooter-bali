import React from 'react';

type Props = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

export default function SocialIcon({ href, label, icon }: Props) {
    return (
        <a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary/30 bg-white transition hover:bg-primary"
        >
            <span className="text-primary transition group-hover:text-white [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        </a>
    );
}
