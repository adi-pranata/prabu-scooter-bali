import type { IconProps as IconsaxIconProps } from 'iconsax-react';
import type { ElementType } from 'react';

type Props = {
    icon: ElementType<IconsaxIconProps>;
    text: string;
    className?: string;
};

export default function SpecItem({ icon: Icon, text, className }: Props) {
    return (
        <div className={['flex items-center gap-1 text-[14px] text-gray-500', className].filter(Boolean).join(' ')}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                <Icon size={20} variant="Linear" color="#9CA3AF" />
            </span>
            <span className="leading-tight whitespace-nowrap">{text}</span>
        </div>
    );
}
