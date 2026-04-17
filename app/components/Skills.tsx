"use client";

import { skills } from "../config";
import { ScrollAnimate } from "./ScrollAnimate";

// SVG icons for each category — clean, inline, no dependencies
const categoryIcons: Record<string, React.ReactNode> = {
    terminal: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
        </svg>
    ),
    server: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
    ),
    cpu: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
        </svg>
    ),
    film: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
            <line x1="17" y1="17" x2="22" y2="17" />
        </svg>
    ),
    database: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),
    cloud: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
    ),
};

// Accent color palette per category for visual variety
const categoryAccents = [
    { color: "var(--accent-blue)", bg: "rgba(10, 132, 255, 0.08)", border: "rgba(10, 132, 255, 0.2)" },
    { color: "var(--accent-purple)", bg: "rgba(191, 90, 242, 0.08)", border: "rgba(191, 90, 242, 0.2)" },
    { color: "var(--accent-teal)", bg: "rgba(100, 210, 255, 0.08)", border: "rgba(100, 210, 255, 0.2)" },
    { color: "var(--accent-orange)", bg: "rgba(255, 159, 10, 0.08)", border: "rgba(255, 159, 10, 0.2)" },
    { color: "var(--accent-green)", bg: "rgba(48, 209, 88, 0.08)", border: "rgba(48, 209, 88, 0.2)" },
    { color: "var(--accent-pink)", bg: "rgba(255, 55, 95, 0.08)", border: "rgba(255, 55, 95, 0.2)" },
];

export default function Skills(): React.JSX.Element {
    return (
        <section id="skills" className="py-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <ScrollAnimate>
                    <div className="text-center mb-16">
                        <p className="text-[var(--accent)] text-subheadline font-medium mb-2 tracking-wide uppercase">
                            Toolbox
                        </p>
                        <h2 className="text-title-1 text-[var(--foreground)] mb-4">
                            Core Skills
                        </h2>
                        <p className="text-[var(--foreground-tertiary)] text-body max-w-2xl mx-auto">
                            Technologies I build with daily — across backend systems, infrastructure, and media pipelines.
                        </p>
                    </div>
                </ScrollAnimate>

                {/* Skills Grid — 2×3 card layout */}
                <div className="skills-grid">
                    {skills.core.map((group, i) => {
                        const accent = categoryAccents[i % categoryAccents.length];
                        return (
                            <ScrollAnimate
                                key={group.category}
                                delay={i * 100}
                                direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
                            >
                                <div className="skill-card">
                                    {/* Accent top border glow */}
                                    <div
                                        className="skill-card-accent"
                                        style={{ background: `linear-gradient(90deg, ${accent.color}, transparent)` }}
                                    />

                                    {/* Category header */}
                                    <div className="skill-card-header">
                                        <span
                                            className="skill-card-icon"
                                            style={{ color: accent.color, backgroundColor: accent.bg }}
                                        >
                                            {categoryIcons[group.icon] || "●"}
                                        </span>
                                        <h3 className="skill-card-title">
                                            {group.category}
                                        </h3>
                                    </div>

                                    {/* Skill tags */}
                                    <div className="skill-tags">
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className="skill-tag"
                                                style={{
                                                    "--tag-accent": accent.color,
                                                    "--tag-bg": accent.bg,
                                                    "--tag-border": accent.border,
                                                } as React.CSSProperties}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </ScrollAnimate>
                        );
                    })}
                </div>

                {/* "Also Worked With" — secondary section */}
                <ScrollAnimate delay={400}>
                    <div className="familiar-section">
                        <div className="familiar-header">
                            <div className="familiar-line" />
                            <p className="familiar-label">
                                Also familiar with
                            </p>
                            <div className="familiar-line" />
                        </div>
                        <div className="familiar-tags">
                            {skills.familiar.map((tag, index) => (
                                <span
                                    key={tag}
                                    className="familiar-tag"
                                    style={{ animationDelay: `${index * 60}ms` }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </ScrollAnimate>
            </div>
        </section>
    );
}
