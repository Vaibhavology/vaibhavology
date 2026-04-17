"use client";

import { siteConfig } from "../config";
import { ScrollAnimate } from "./ScrollAnimate";

/* ═══════════════════════════════════════════
   Icons for the Solve section
   ═══════════════════════════════════════════ */
const icons: Record<string, React.ReactNode> = {
    automation: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    ),
    queue: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="6" height="5" rx="1" /><rect x="9" y="4" width="6" height="5" rx="1" /><rect x="16" y="4" width="6" height="5" rx="1" />
            <rect x="2" y="15" width="6" height="5" rx="1" /><rect x="9" y="15" width="6" height="5" rx="1" /><rect x="16" y="15" width="6" height="5" rx="1" />
            <path d="M5 9v6M12 9v6M19 9v6" />
        </svg>
    ),
    server: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
    ),
    performance: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    )
};

export default function About(): React.JSX.Element {
    return (
        <section id="about" className="py-16 md:py-24 px-4 md:px-6 relative">
            {/* Background elements for depth */}
            <div className="absolute inset-0 max-w-7xl mx-auto -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="container mx-auto max-w-5xl">
                {/* ── Section Header ── */}
                <ScrollAnimate>
                    <div className="text-center mb-12 md:mb-16">
                        <p className="text-[var(--accent)] text-subheadline font-medium mb-2 tracking-wide uppercase opacity-70">
                            Engineering Focus
                        </p>
                        <h2 className="text-title-1 text-[var(--foreground)] mb-6">
                            What I Solve
                        </h2>
                        <p className="text-body text-[var(--foreground-secondary)] max-w-2xl mx-auto leading-relaxed">
                            The types of problems I focus on and deliver solutions for.
                        </p>
                    </div>
                </ScrollAnimate>

                {/* ── 2x2 Grid of Output Cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative">
                    {siteConfig.whatISolve.map((item, index) => (
                        <ScrollAnimate key={index} delay={100 * (index + 1)}>
                            <div className="group relative flex flex-col h-full bg-black/5 dark:bg-white/[0.03] p-6 md:p-8 rounded-2xl border border-[var(--separator)] overflow-hidden transition-all duration-300 hover:border-black/10 dark:hover:border-white/10 hover:shadow-xl hover:-translate-y-1 backdrop-blur-md">
                                {/* Hover Gradient Backlight */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                                <div className="relative z-10 block mb-6 px-4 py-4 w-fit rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                                    {icons[item.icon] || icons.server}
                                </div>
                                <h3 className="relative z-10 text-xl font-bold text-[var(--foreground)] mb-3">
                                    {item.title}
                                </h3>
                                <p className="relative z-10 text-[var(--foreground-secondary)] text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </ScrollAnimate>
                    ))}
                </div>

                {/* ── Optional Bottom Tagline ── */}
                <ScrollAnimate delay={500}>
                    <div className="mt-16 text-center max-w-2xl mx-auto border-t border-[var(--separator)] pt-8">
                        <p className="text-[var(--foreground-tertiary)] text-base font-medium">
                            I focus on building systems that reduce manual effort, improve performance, and scale reliably.
                        </p>
                    </div>
                </ScrollAnimate>
            </div>
        </section>
    );
}
