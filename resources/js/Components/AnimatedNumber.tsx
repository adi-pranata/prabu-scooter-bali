import { useEffect, useState } from "react";

interface Props {
    value: number;
    duration?: number; // ms
}

export default function AnimatedNumber({ value, duration = 1200 }: Props) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = value / (duration / 16); // ~60fps

        const counter = setInterval(() => {
            start += increment;
            if (start >= value) {
                setDisplay(value);
                clearInterval(counter);
            } else {
                setDisplay(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(counter);
    }, [value, duration]);

    return <>{display}</>;
}
