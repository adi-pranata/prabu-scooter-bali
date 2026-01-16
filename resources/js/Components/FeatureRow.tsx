import { ReactNode } from "react";

interface FeatureRowProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export default function FeatureRow({
    icon,
    title,
    description,
}: FeatureRowProps) {
    return (
        <div className="flex items-start gap-5">
            {/* Icon box */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary shadow-sm">
                {icon}
            </div>

            {/* Text */}
            <div>
                <h4 className="text-lg font-semibold text-dark">
                    {title}
                </h4>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
}
