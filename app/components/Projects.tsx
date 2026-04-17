"use client";

import Image from "next/image";
import { caseStudies } from "../config";
import { ScrollAnimate } from "./ScrollAnimate";

/* ═══════════════════════════════════════════
   Architecture node icons (inline SVGs)
   ═══════════════════════════════════════════ */
const archIcons: Record<string, React.ReactNode> = {
    server: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
            <circle cx="6" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="18" r="1" fill="currentColor" />
        </svg>
    ),
    queue: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="6" height="5" rx="1" /><rect x="9" y="4" width="6" height="5" rx="1" />
            <rect x="16" y="4" width="6" height="5" rx="1" /><rect x="2" y="15" width="6" height="5" rx="1" />
            <rect x="9" y="15" width="6" height="5" rx="1" /><rect x="16" y="15" width="6" height="5" rx="1" />
            <path d="M5 9v6M12 9v6M19 9v6" />
        </svg>
    ),
    cpu: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
            <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
        </svg>
    ),
    gpu: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10v4M10 10v4M14 10v4M18 10v4" />
            <line x1="6" y1="6" x2="6" y2="3" /><line x1="10" y1="6" x2="10" y2="3" />
            <line x1="14" y1="6" x2="14" y2="3" /><line x1="18" y1="6" x2="18" y2="3" />
        </svg>
    ),
    disk: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),
    upload: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    ),
    camera: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
        </svg>
    ),
    eye: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
        </svg>
    ),
    database: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),
    chip: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
    ),
    monitor: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    shield: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    clock: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    retry: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
    ),
    alert: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    ),
};

/* ═══════════════════════════════════════════
   Section label with icon
   ═══════════════════════════════════════════ */
function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="cs-section-label">
            <span className="cs-section-icon">{icon}</span>
            <span>{label}</span>
        </div>
    );
}

/* ═══════════════════════════════════════════
   Layered Architecture Diagram
   Production-grade, glassmorphism nodes
   ═══════════════════════════════════════════ */
interface ArchLayer {
    label: string;
    nodes: { id: string; label: string; icon: string }[];
}

function ArchitectureDiagram({ layers, accentColor }: {
    layers: ArchLayer[];
    accentColor: string;
}) {
    return (
        <div className="arch-v2">
            {layers.map((layer, layerIdx) => (
                <div key={layer.label} className="arch-v2-layer">
                    {/* Vertical connector from previous layer */}
                    {layerIdx > 0 && (
                        <div className="arch-v2-connector">
                            <svg width="2" height="28" viewBox="0 0 2 28" className="arch-v2-line">
                                <line x1="1" y1="0" x2="1" y2="28" stroke={accentColor} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
                            </svg>
                            <svg width="12" height="8" viewBox="0 0 12 8" className="arch-v2-chevron" style={{ color: accentColor }}>
                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}

                    {/* Layer label */}
                    <div className="arch-v2-label">{layer.label}</div>

                    {/* Nodes row */}
                    <div className="arch-v2-nodes">
                        {layer.nodes.map((node, nodeIdx) => (
                            <div key={node.id} className="arch-v2-node-wrapper">
                                {/* Horizontal arrow between nodes */}
                                {nodeIdx > 0 && (
                                    <div className="arch-v2-harrow" style={{ color: accentColor }}>
                                        <svg width="24" height="2" viewBox="0 0 24 2">
                                            <line x1="0" y1="1" x2="24" y2="1" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
                                        </svg>
                                    </div>
                                )}
                                <div
                                    className="arch-v2-node"
                                    style={{ "--arch-accent": accentColor } as React.CSSProperties}
                                >
                                    <div className="arch-v2-node-glow" style={{ background: accentColor }} />
                                    <div className="arch-v2-node-icon">
                                        {archIcons[node.icon] || archIcons.server}
                                    </div>
                                    <span className="arch-v2-node-text">
                                        {node.label.split("\n").map((line, j) => (
                                            <span key={j}>
                                                {line}
                                                {j < node.label.split("\n").length - 1 && <br />}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════
   Case study accent palette
   ═══════════════════════════════════════════ */
const studyAccents = [
    { primary: "#0a84ff", gradient: "linear-gradient(135deg, #0a84ff 0%, #bf5af2 100%)" },
    { primary: "#30d158", gradient: "linear-gradient(135deg, #30d158 0%, #64d2ff 100%)" },
];

/* ═══════════════════════════════════════════
   SVG icons for section labels
   ═══════════════════════════════════════════ */
const sectionIcons = {
    problem: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
    solution: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    ),
    techStack: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    impact: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    ),
    architecture: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    ),
};

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */
export default function Projects(): React.JSX.Element {
    return (
        <section id="lab" className="py-16 md:py-24 px-4 md:px-6">
            <div className="container mx-auto max-w-6xl">
                {/* ── Section Header ── */}
                <ScrollAnimate>
                    <div className="text-center mb-12 md:mb-20">
                        <p className="text-[var(--accent)] text-subheadline font-medium mb-2 tracking-wide uppercase opacity-70">
                            PROJECTS
                        </p>
                        <h2 className="text-title-1 text-[var(--foreground)] mb-4">
                            System Case Studies
                        </h2>
                        <p className="text-[var(--foreground-tertiary)] text-body max-w-2xl mx-auto">
                            End-to-end systems I designed and built — from problem to production.
                        </p>
                    </div>
                </ScrollAnimate>

                {/* ── Case Studies ── */}
                <div className="space-y-24 md:space-y-32">
                    {caseStudies.map((study, index) => {
                        const accent = studyAccents[index % studyAccents.length];
                        return (
                            <article key={study.id} className="cs-article">
                                {/* ── Hero: Image + Title ── */}
                                <ScrollAnimate>
                                    <div className="cs-hero">
                                        <div className="cs-hero-glow" style={{ background: accent.gradient }} />
                                        <div className="cs-hero-inner">
                                            <div className="cs-hero-image">
                                                <Image
                                                    src={study.image}
                                                    alt={study.title}
                                                    fill
                                                    sizes="(max-width: 1024px) 100vw, 1152px"
                                                    className="object-cover"
                                                    loading="lazy"
                                                />
                                                <div className="cs-hero-overlay" />
                                                <div className="cs-hero-content">
                                                    <div className="cs-badge" style={{ borderColor: `${accent.primary}40`, background: `${accent.primary}15` }}>
                                                        <span className="cs-badge-dot" style={{ background: accent.primary }} />
                                                        <span style={{ color: accent.primary }}>Project {String(index + 1).padStart(2, "0")}</span>
                                                    </div>
                                                    <h3 className="cs-title">{study.title}</h3>
                                                    <p className="cs-tagline">{study.tagline}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollAnimate>

                                {/* ── Content Grid: Problem + Solution ── */}
                                <div className="cs-content-grid">
                                    <ScrollAnimate direction="left" delay={100}>
                                        <div className="cs-card">
                                            <SectionLabel icon={sectionIcons.problem} label="Problem" />
                                            <p className="cs-text">{study.problem}</p>
                                        </div>
                                    </ScrollAnimate>
                                    <ScrollAnimate direction="right" delay={200}>
                                        <div className="cs-card">
                                            <SectionLabel icon={sectionIcons.solution} label="Solution" />
                                            <p className="cs-text">{study.solution}</p>
                                        </div>
                                    </ScrollAnimate>
                                </div>

                                {/* ── Architecture Diagram ── */}
                                <ScrollAnimate delay={250}>
                                    <div className="cs-card cs-arch-card">
                                        <SectionLabel icon={sectionIcons.architecture} label="System Architecture" />
                                        <ArchitectureDiagram
                                            layers={study.architecture.layers}
                                            accentColor={accent.primary}
                                        />
                                    </div>
                                </ScrollAnimate>

                                {/* ── Bottom Row: Tech Stack + Impact ── */}
                                <div className="cs-content-grid">
                                    <ScrollAnimate direction="left" delay={300}>
                                        <div className="cs-card">
                                            <SectionLabel icon={sectionIcons.techStack} label="Tech Stack" />
                                            <div className="cs-tags">
                                                {study.techStack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="cs-tag"
                                                        style={{
                                                            "--cs-accent": accent.primary,
                                                        } as React.CSSProperties}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollAnimate>
                                    <ScrollAnimate direction="right" delay={400}>
                                        <div className="cs-card">
                                            <SectionLabel icon={sectionIcons.impact} label="Impact" />
                                            <div className="cs-metrics">
                                                {study.impact.map((item) => (
                                                    <div key={item.label} className="cs-metric">
                                                        <span className="cs-metric-value" style={{ color: accent.primary }}>
                                                            {item.metric}
                                                        </span>
                                                        <span className="cs-metric-label">{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollAnimate>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
