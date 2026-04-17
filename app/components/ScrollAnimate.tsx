"use client";

import { useEffect, useRef, useState, memo } from "react";

export function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Disconnect after becoming visible - no need to observe anymore
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(currentRef);

        return () => {
            observer.disconnect();
        };
    }, []);

    return { ref, isVisible };
}

interface ScrollAnimateProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right";
}

export const ScrollAnimate = memo(function ScrollAnimate({
    children,
    className = "",
    delay = 0,
    direction = "up"
}: ScrollAnimateProps) {
    const { ref, isVisible } = useScrollAnimation();

    const directionClass = {
        up: "scroll-animate",
        left: "scroll-animate-left",
        right: "scroll-animate-right",
    }[direction];

    return (
        <div
            ref={ref}
            className={`${directionClass} ${isVisible ? "visible" : ""} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
});
