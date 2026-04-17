"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { siteConfig } from "../config";

export default function Banner(): React.JSX.Element {
  const texts = siteConfig.roles;
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentText = useMemo(() => texts[currentTextIndex], [texts, currentTextIndex]);

  useEffect(() => {
    const speed = isDeleting ? 50 : 100;

    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayedText, isDeleting, currentTextIndex, texts, currentText]);

  const progressWidth = useMemo(
    () => `${(displayedText.length / currentText.length) * 100}%`,
    [displayedText.length, currentText.length]
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-12 md:pt-20 md:pb-0 px-4 sm:px-6 relative"
    >
      <div className="container mx-auto max-w-6xl relative z-10 mt-8 md:mt-0">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Profile Image with animations */}
          <div className="flex justify-center lg:justify-center relative w-full lg:w-auto order-1 lg:order-2">
            <div className="relative">
              {/* Animated glow rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-[var(--accent)]/20 animate-scale-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-[var(--accent-purple)]/10 animate-scale-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Floating accent dots */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--accent-blue)] animate-float glow-accent" />
              <div className="absolute top-1/4 -left-6 sm:-left-8 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[var(--accent-purple)] animate-float-delay glow-purple" />
              <div className="absolute -bottom-1 right-1/4 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--accent-pink)] animate-float-slow glow-pink" />

              {/* Profile image with glow */}
              <div className="relative animate-float-slow">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)] rounded-3xl blur-xl sm:blur-2xl opacity-30 sm:opacity-40 scale-105 sm:scale-110" />
                <Image
                  src={siteConfig.images.profile}
                  alt={`${siteConfig.name}`}
                  width={320}
                  height={320}
                  className="relative z-10 w-48 h-auto sm:w-64 lg:w-[320px] rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl"
                  priority
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-5 sm:space-y-6 text-center lg:text-left order-2 lg:order-1 mt-4 md:mt-0">
            {/* Greeting chip with shimmer */}
            <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--background-secondary)] border border-[var(--separator)] relative overflow-hidden group">
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-xl sm:text-2xl animate-bounce-soft">:)</span>
              <span className="text-[var(--foreground-tertiary)] text-xs sm:text-sm md:text-base font-medium relative z-10">
                Hello, I&apos;m
              </span>
            </div>

            {/* Name with gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text">{siteConfig.name}</span>
            </h1>

            {/* Animated Role with accent underline */}
            <div className="h-10 sm:h-12 lg:h-16 relative">
              <p className="text-lg sm:text-2xl lg:text-3xl font-semibold text-[var(--foreground-secondary)]">
                {displayedText}
                <span className="text-[var(--accent)] animate-subtle-pulse">|</span>
              </p>
              {/* Animated underline */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 h-1 rounded-full overflow-hidden w-24 sm:w-32 bg-[var(--background-tertiary)]">
                <div
                  className="h-full bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)] transition-all duration-300"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>

            {/* Current Position badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2 sm:pt-0">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] hover:border-[var(--accent)]/30 transition-all group">
                <Image
                  src={siteConfig.currentPosition.companyLogo}
                  alt={siteConfig.currentPosition.company}
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
                <span className="text-[var(--foreground-secondary)] text-xs sm:text-sm font-medium">
                  {siteConfig.currentPosition.role} -{" "}
                  <span className="text-[var(--accent)]">
                    {siteConfig.currentPosition.company}
                  </span>
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base md:text-lg text-[var(--foreground-tertiary)] max-w-[280px] sm:max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {siteConfig.aboutDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
              <a href="#contact" className="btn-primary group w-full sm:w-auto text-center justify-center">
                <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                  Get in Touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a href="#lab" className="btn-secondary group w-full sm:w-auto text-center justify-center">
                <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                  View Projects
                  <svg className="w-4 h-4 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-row gap-6 sm:gap-8 justify-center lg:justify-start pt-4 sm:pt-6">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold gradient-text-static">1+</p>
                <p className="text-[10px] sm:text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider">Years Exp.</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold gradient-text-static">10+</p>
                <p className="text-[10px] sm:text-xs text-[var(--foreground-tertiary)] uppercase tracking-wider">Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator hidden on small mobile height */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce-soft">
        <span className="text-[10px] uppercase tracking-widest text-[var(--foreground-tertiary)] opacity-60">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-[var(--foreground-tertiary)]/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[var(--accent)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
