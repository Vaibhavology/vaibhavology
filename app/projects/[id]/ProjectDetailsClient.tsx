"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "../../config";
import { ScrollAnimate } from "../../components/ScrollAnimate";
import { ArchitectureDiagram, sectionIcons, studyAccents } from "../../components/Projects";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AnimatedBackground from "../../components/AnimatedBackground";
import ScrollToTop from "../../components/ScrollToTop";

export default function ProjectDetailsClient({ id }: { id: string }) {
    const [isImageFullScreen, setIsImageFullScreen] = useState(false);
    const projectId = Number(id);
    const project = allProjects.find(p => p.id === projectId);

    // Close fullscreen on Escape key
    useEffect(() => {
        if (!isImageFullScreen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsImageFullScreen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isImageFullScreen]);

    // Prevent body scroll when fullscreen image is open
    useEffect(() => {
        if (isImageFullScreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isImageFullScreen]);

    const handleFullScreenClose = useCallback(() => {
        setIsImageFullScreen(false);
    }, []);

    if (!project) {
        return (
            <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center">
                <Header />
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="text-[var(--foreground-tertiary)] mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/projects" className="btn-primary">Back to Projects</Link>
                </div>
            </main>
        );
    }

    const index = allProjects.indexOf(project);
    const accent = studyAccents[index % studyAccents.length] || studyAccents[0];

    // Find prev/next projects for navigation
    const prevProject = index > 0 ? allProjects[index - 1] : null;
    const nextProject = index < allProjects.length - 1 ? allProjects[index + 1] : null;

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
            <AnimatedBackground />
            <Header />

            {/* Ambient Background Glow based on project accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-10 blur-[120px] pointer-events-none" style={{ background: accent.gradient }} aria-hidden="true" />

            <section className="pt-40 pb-16 md:pt-48 md:pb-24 px-4 md:px-8 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    
                    {/* ── Breadcrumb Navigation ── */}
                    <ScrollAnimate>
                        <nav aria-label="Breadcrumb" className="mb-8">
                            <ol className="flex items-center gap-2 text-sm text-[var(--foreground-tertiary)] flex-wrap">
                                <li>
                                    <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li aria-hidden="true">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li>
                                    <Link href="/projects" className="hover:text-[var(--foreground)] transition-colors">
                                        Projects
                                    </Link>
                                </li>
                                <li aria-hidden="true">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li>
                                    <span className="text-[var(--foreground)] font-medium" aria-current="page">
                                        {project.title}
                                    </span>
                                </li>
                            </ol>
                        </nav>
                    </ScrollAnimate>

                    {/* ── Top Nav ── */}
                    <ScrollAnimate>
                        <div className="flex items-center justify-between mb-12 md:mb-20">
                            <Link href="/projects" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[var(--foreground-secondary)] hover:text-white transition-all duration-300 backdrop-blur-md group">
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="font-medium text-sm tracking-wide">All Projects</span>
                            </Link>

                            {project.link && (
                                <a 
                                    href={project.link} 
                                    target={project.link !== "#" ? "_blank" : "_self"} 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 border border-white/20"
                                    style={{ background: accent.gradient }}
                                    onClick={(e) => {
                                        if (project.link === "#") {
                                            e.preventDefault();
                                            alert("Live project link coming soon!");
                                        }
                                    }}
                                    aria-label={project.link !== "#" ? `View ${project.title} live project` : "Live project link coming soon"}
                                >
                                    <span className="text-sm">Live Project</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </ScrollAnimate>

                    {/* ── Hero Header ── */}
                    <ScrollAnimate delay={100}>
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(10,10,15,0.65)] backdrop-blur-md shadow-lg mb-8">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent.primary, boxShadow: `0 0 10px ${accent.primary}` }} aria-hidden="true" />
                                <span className="text-xs font-bold uppercase tracking-widest text-white">Project {String(index + 1).padStart(2, '0')}</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight bg-clip-text text-transparent py-2" style={{ backgroundImage: accent.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {project.title}
                            </h1>
                            
                            <p className="text-lg sm:text-xl md:text-2xl text-[var(--foreground-secondary)] leading-relaxed font-light">
                                {project.tagline}
                            </p>
                        </div>
                    </ScrollAnimate>

                    {/* ── Presentation Image ── */}
                    <ScrollAnimate delay={200}>
                        <div 
                            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] p-1 sm:p-1.5 md:p-2 mb-16 sm:mb-24 group/image cursor-pointer hover:scale-[1.02] transition-transform duration-700" 
                            onClick={() => setIsImageFullScreen(true)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsImageFullScreen(true); } }}
                            aria-label={`View ${project.title} image in full screen`}
                        >
                            {/* Animated Glowing Border */}
                            <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] opacity-50 group-hover/image:opacity-100 transition-opacity duration-700" style={{ background: accent.gradient, filter: 'blur(20px)' }} aria-hidden="true" />
                            <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] opacity-80" style={{ background: accent.gradient }} aria-hidden="true" />
                            
                            {/* Inner Image Container */}
                            <div className="relative w-full h-full rounded-[1.75rem] md:rounded-[2.75rem] overflow-hidden bg-[var(--background-secondary)] z-10 shadow-2xl">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} — ${project.tagline}`}
                                    fill
                                    sizes="100vw"
                                    className="object-cover transition-transform duration-1000 group-hover/image:scale-105"
                                    priority
                                />
                                
                                {/* Fullscreen Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-3 text-white font-medium shadow-2xl transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                        <span>View Full Screen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimate>

                    {/* ── Content Grid: Problem + Solution ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16">
                        <ScrollAnimate direction="left" delay={100}>
                            <div className="h-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] bg-[var(--background-secondary)] border border-white/5 hover:border-white/15 transition-colors relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 opacity-20 group-hover:opacity-100 transition-opacity" style={{ background: accent.gradient }} aria-hidden="true" />
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--foreground-secondary)] group-hover:text-white transition-colors border border-white/5" aria-hidden="true">
                                        {sectionIcons.problem}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">The Challenge</h2>
                                </div>
                                <p className="text-[var(--foreground-secondary)] text-lg leading-relaxed font-light">{project.problem}</p>
                            </div>
                        </ScrollAnimate>

                        <ScrollAnimate direction="right" delay={200}>
                            <div className="h-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] bg-[var(--background-secondary)] border border-white/5 hover:border-white/15 transition-colors relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 opacity-20 group-hover:opacity-100 transition-opacity" style={{ background: accent.gradient }} aria-hidden="true" />
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--foreground-secondary)] group-hover:text-white transition-colors border border-white/5" aria-hidden="true">
                                        {sectionIcons.solution}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">The Solution</h2>
                                </div>
                                <p className="text-[var(--foreground-secondary)] text-lg leading-relaxed font-light">{project.solution}</p>
                            </div>
                        </ScrollAnimate>
                    </div>

                    {/* ── Bottom Row: Tech Stack + Impact ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-16 sm:mb-24">
                        <ScrollAnimate direction="left" delay={300}>
                            <div className="h-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] bg-[var(--background-secondary)] border border-white/5 hover:border-white/15 transition-colors">
                                <h2 className="text-xl font-bold text-white mb-8 tracking-wide">TECH STACK</h2>
                                <div className="flex flex-wrap gap-3">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 text-sm font-semibold tracking-wide text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                                            style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.05)` }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </ScrollAnimate>

                        <ScrollAnimate direction="right" delay={400}>
                            <div className="h-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] bg-[var(--background-secondary)] border border-white/5 hover:border-white/15 transition-colors">
                                <h2 className="text-xl font-bold text-white mb-8 tracking-wide">KEY IMPACT</h2>
                                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                                    {project.impact.map((item) => (
                                        <div key={item.label} className="flex flex-col">
                                            <span className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: accent.primary, textShadow: `0 0 20px ${accent.primary}40` }}>
                                                {item.metric}
                                            </span>
                                            <span className="text-xs md:text-sm font-medium text-[var(--foreground-tertiary)] uppercase tracking-wider">
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollAnimate>
                    </div>

                    {/* ── Architecture Diagram ── */}
                    <ScrollAnimate delay={500}>
                        <div className="w-full rounded-2xl sm:rounded-[2rem] bg-[var(--background-secondary)] border border-white/5 p-5 sm:p-8 md:p-12 overflow-hidden relative">
                            {/* Subtle background glow for architecture */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-10 blur-[100px] pointer-events-none" style={{ background: accent.primary }} aria-hidden="true" />
                            
                            <div className="relative z-10">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl font-bold text-white tracking-tight mb-4">System Architecture</h2>
                                    <p className="text-[var(--foreground-secondary)] max-w-2xl mx-auto font-light">
                                        High-level overview of the application layers, services, and data flow.
                                    </p>
                                </div>
                                <div className="p-4 md:p-8 rounded-2xl bg-[#0a0a0f]/50 border border-white/5 backdrop-blur-sm overflow-hidden">
                                    <ArchitectureDiagram
                                        layers={project.architecture.layers}
                                        accentColor={accent.primary}
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollAnimate>

                    {/* ── Project Navigation (Prev / Next) ── */}
                    <ScrollAnimate delay={600}>
                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {prevProject ? (
                                <Link 
                                    href={`/projects/${prevProject.id}`} 
                                    className="group p-6 rounded-2xl bg-[var(--background-secondary)] border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <span className="text-xs uppercase tracking-wider text-[var(--foreground-tertiary)] mb-2 block">← Previous</span>
                                    <span className="text-lg font-semibold text-[var(--foreground)] group-hover:text-white transition-colors">{prevProject.title}</span>
                                </Link>
                            ) : (
                                <div />
                            )}
                            {nextProject ? (
                                <Link 
                                    href={`/projects/${nextProject.id}`} 
                                    className="group p-6 rounded-2xl bg-[var(--background-secondary)] border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 text-right"
                                >
                                    <span className="text-xs uppercase tracking-wider text-[var(--foreground-tertiary)] mb-2 block">Next →</span>
                                    <span className="text-lg font-semibold text-[var(--foreground)] group-hover:text-white transition-colors">{nextProject.title}</span>
                                </Link>
                            ) : (
                                <div />
                            )}
                        </div>
                    </ScrollAnimate>

                </div>
            </section>
            
            <Footer />
            <ScrollToTop />

            {/* ── Full Screen Image Modal ── */}
            {isImageFullScreen && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out animate-in fade-in duration-300"
                    onClick={handleFullScreenClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Full screen view of ${project.title}`}
                >
                    <div className="absolute top-6 right-6 z-[110]">
                        <button 
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors border border-white/20 backdrop-blur-md"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsImageFullScreen(false);
                            }}
                            aria-label="Close full screen image"
                            autoFocus
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative w-full max-w-7xl h-full max-h-[85vh]">
                        <Image
                            src={project.image}
                            alt={`${project.title} — full screen view`}
                            fill
                            className="object-contain"
                            priority
                            sizes="100vw"
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
