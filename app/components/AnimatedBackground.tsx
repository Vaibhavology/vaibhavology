"use client";

// Pure CSS animated background - no JS overhead
export default function AnimatedBackground(): React.JSX.Element {
    return (
        <div className="animated-bg" aria-hidden="true">
            <div className="floating-shape shape-1" />
            <div className="floating-shape shape-2" />
            <div className="floating-shape shape-3" />
        </div>
    );
}
