"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { testimonials } from "../config";
import { ScrollAnimate } from "./ScrollAnimate";

export default function Testimonials(): React.JSX.Element {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = useCallback(() => {
        setActiveIndex((prev) => {
            const next = (prev + 1) % testimonials.length;
            console.log('Next clicked:', prev, '->', next);
            return next;
        });
    }, []);

    const prevTestimonial = useCallback(() => {
        setActiveIndex((prev) => {
            const next = (prev - 1 + testimonials.length) % testimonials.length;
            console.log('Prev clicked:', prev, '->', next);
            return next;
        });
    }, []);

    const setIndex = useCallback((index: number) => {
        console.log('Dot clicked:', index);
        setActiveIndex(index);
    }, []);

    if (testimonials.length === 0) return <></>;

    const active = testimonials[activeIndex];

    return (
        <section id="testimonials" className="py-24 px-6">
            <div className="container mx-auto max-w-4xl">
                {/* Section Header */}
                <ScrollAnimate>
                    <div className="text-center mb-16">
                        <p className="text-[var(--accent)] text-subheadline font-medium mb-2 tracking-wide uppercase">
                            Testimonials
                        </p>
                        <h2 className="text-title-1 text-[var(--foreground)] mb-4">
                            What People Say
                        </h2>
                        <p className="text-[var(--foreground-tertiary)] text-body max-w-2xl mx-auto">
                            Feedback from colleagues and clients I&apos;ve had the pleasure of working with.
                        </p>
                    </div>
                </ScrollAnimate>

                {/* Testimonial Card */}
                <ScrollAnimate delay={200}>
                    <div className="card-widget relative overflow-hidden group">
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[var(--accent-blue)]/5 via-transparent to-[var(--accent-purple)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Quote Icon with animation */}
                        <div className="absolute top-6 left-6 text-7xl font-serif gradient-text-static opacity-20 select-none pointer-events-none">
                            &ldquo;
                        </div>

                        {/* Content */}
                        <div className="relative pt-10 pb-6 px-6" key={activeIndex}>
                            <blockquote className="text-xl lg:text-2xl text-[var(--foreground-secondary)] text-center leading-relaxed mb-10 min-h-[120px] transition-all duration-500">
                                {active.quote}
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-full blur animate-pulse-glow" />
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[var(--background-tertiary)] border-2 border-[var(--accent)]/30">
                                        {active.avatar ? (
                                            <Image
                                                src={active.avatar}
                                                alt={active.name}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold gradient-text">
                                                {active.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="text-headline text-[var(--foreground)] font-semibold">
                                        {active.name}
                                    </p>
                                    <p className="text-footnote text-[var(--foreground-tertiary)]">
                                        {active.role} at{" "}
                                        <span className="text-[var(--accent)]">{active.company}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        {testimonials.length > 1 && (
                            <div className="relative z-10 flex items-center justify-center gap-6 pt-6 border-t border-[var(--separator)] mt-6">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] hover:bg-[var(--background-tertiary)] hover:border-[var(--accent)]/30 active:scale-95 transition-all group/btn"
                                    aria-label="Previous testimonial"
                                >
                                    <svg className="w-5 h-5 text-[var(--foreground-tertiary)] group-hover/btn:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Animated Dots */}
                                <div className="flex gap-3">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setIndex(index)}
                                            className={`h-2 rounded-full transition-all duration-500 ${index === activeIndex
                                                    ? "w-8 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]"
                                                    : "w-2 bg-[var(--gray-3)] hover:bg-[var(--gray-2)]"
                                                }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextTestimonial}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] hover:bg-[var(--background-tertiary)] hover:border-[var(--accent)]/30 active:scale-95 transition-all group/btn"
                                    aria-label="Next testimonial"
                                >
                                    <svg className="w-5 h-5 text-[var(--foreground-tertiary)] group-hover/btn:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </ScrollAnimate>
            </div>
        </section>
    );
}
