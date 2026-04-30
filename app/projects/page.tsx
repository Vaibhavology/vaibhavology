"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { allProjects } from "../config";
import { ScrollAnimate } from "../components/ScrollAnimate";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import ScrollToTop from "../components/ScrollToTop";

export default function ProjectsPage(): React.JSX.Element {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative">
            <AnimatedBackground />
            
            {/* Minimal Header just for back navigation and theme toggle */}
            <Header />

            <section className="pt-48 pb-16 md:pt-56 md:pb-24 px-4 md:px-6 min-h-screen relative z-10">
                <div className="container mx-auto max-w-6xl">
                    {/* ── Hero Section ── */}
                    <ScrollAnimate>
                        <div className="text-center mb-16 md:mb-24">
                            <Link href="/#lab" className="inline-flex items-center gap-2 text-[var(--foreground-tertiary)] hover:text-[var(--foreground)] transition-colors mb-8 group">
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Back to Home</span>
                            </Link>

                            <p className="text-[var(--accent)] text-subheadline font-medium mb-4 tracking-wide uppercase opacity-70">
                                PORTFOLIO
                            </p>
                            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent py-2 bg-gradient-to-r from-[#0a84ff] via-[#bf5af2] to-[#ff375f]">
                                All Projects
                            </h1>
                            <p className="text-[var(--foreground-tertiary)] text-lg max-w-2xl mx-auto">
                                Explore all the systems I've designed and built — from concept to production.
                            </p>
                        </div>
                    </ScrollAnimate>

                    {/* ── Projects Grid ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {allProjects.map((project, index) => {
                            // Define gradient accents for variety
                            const accents = [
                                { primary: "#0a84ff", gradient: "linear-gradient(135deg, #0a84ff 0%, #bf5af2 100%)" },
                                { primary: "#30d158", gradient: "linear-gradient(135deg, #30d158 0%, #64d2ff 100%)" },
                                { primary: "#ff375f", gradient: "linear-gradient(135deg, #ff375f 0%, #ff9f0a 100%)" },
                                { primary: "#bf5af2", gradient: "linear-gradient(135deg, #bf5af2 0%, #0a84ff 100%)" },
                            ];
                            const accent = accents[index % accents.length];

                            return (
                                <ScrollAnimate key={project.id} delay={index * 100}>
                                    <article className="h-full group relative bg-[var(--background-secondary)] border border-[var(--separator)] rounded-[24px] overflow-hidden transition-all duration-500 hover:border-[rgba(255,255,255,0.1)] hover:shadow-2xl hover:-translate-y-2 flex flex-col">
                                        
                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: accent.gradient }} />
                                        
                                        {/* ── Image Header ── */}
                                        <div className="relative aspect-[21/9] w-full overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] via-transparent to-transparent opacity-90" />
                                            
                                            {/* Badge */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(10,10,15,0.65)] backdrop-blur-md shadow-lg">
                                                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent.primary, boxShadow: `0 0 10px ${accent.primary}` }} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Project {String(index + 1).padStart(2, '0')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── Content Body ── */}
                                        <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                                            <h3 className="text-2xl font-bold mb-3 tracking-tight bg-clip-text text-transparent transition-all duration-300 drop-shadow-md" style={{ backgroundImage: accent.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                                {project.title}
                                            </h3>
                                            
                                            <p className="text-[var(--foreground-secondary)] text-sm leading-relaxed mb-6 flex-grow">
                                                {project.tagline}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.techStack.slice(0, 5).map(tech => (
                                                    <span key={tech} className="px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--foreground-secondary)] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-full transition-colors group-hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)]">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 5 && (
                                                    <span className="px-3 py-1 text-[11px] font-semibold text-[var(--foreground-tertiary)] bg-[rgba(255,255,255,0.02)] border border-transparent rounded-full">
                                                        +{project.techStack.length - 5}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Divider */}
                                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--separator)] to-transparent mb-6 opacity-50" />

                                            {/* Impact Metrics */}
                                            <div className="grid grid-cols-2 gap-4 mb-8">
                                                {project.impact.slice(0, 2).map((item, i) => (
                                                    <div key={i} className="flex flex-col">
                                                        <span className="text-xl font-bold mb-1 transition-transform group-hover:scale-105 origin-left" style={{ color: accent.primary }}>
                                                            {item.metric}
                                                        </span>
                                                        <span className="text-xs font-medium text-[var(--foreground-tertiary)] uppercase tracking-wider">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* View Details Link */}
                                            <Link href={`/projects/${project.id}`} className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold text-white bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.05)] transition-all duration-300">
                                                <span>View Details</span>
                                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </article>
                                </ScrollAnimate>
                            );
                        })}
                    </div>
                </div>
            </section>
            
            <Footer />
            <ScrollToTop />
        </main>
    );
}
