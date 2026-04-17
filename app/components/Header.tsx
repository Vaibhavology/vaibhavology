"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { siteConfig } from "../config";
import { ThemeToggle } from "./ThemeProvider";

const navItems = [
  { href: "#home", label: "Home", icon: "🏠" },
  { href: "#skills", label: "Skills", icon: "⚡" },
  { href: "#lab", label: "Projects", icon: "🚀" },
  { href: "#contact", label: "Contact", icon: "✉️" },
];

export default function Header(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 50);

          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const progress = documentHeight > 0
            ? Math.min(Math.max(scrollY / documentHeight, 0), 1)
            : 0;
          setScrollProgress(progress);

          // Determine active section
          const sections = ["home", "skills", "lab", "contact"];
          if (progress >= 0.9) {
            setActiveSection("contact");
          } else {
            for (const section of [...sections].reverse()) {
              const element = document.getElementById(section);
              if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 150) {
                  setActiveSection(section);
                  break;
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const scrollProgressPercent = useMemo(() => `${scrollProgress * 100}%`, [scrollProgress]);
  const scrollProgressLabel = useMemo(() => `${Math.round(scrollProgress * 100)}%`, [scrollProgress]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "glass py-3"
          : "bg-transparent py-5"
          }`}
      >
        <nav className="px-6">
          <div className="container mx-auto max-w-6xl flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="transition-all duration-300 hover:opacity-80 active:scale-95 z-50"
            >
              <Image
                src={siteConfig.images.logo}
                alt="Logo"
                width={80}
                height={80}
                style={{ width: "auto", height: "auto" }}
                className={`transition-all duration-300 ${scrolled ? "h-8" : "h-10"}`}
                priority
              />
            </Link>

            {/* Desktop Navigation - Dynamic Island Style */}
            <div className="hidden md:flex items-center gap-4">
              {/* Dynamic Island Container */}
              <div className={`dynamic-island ${scrolled ? "active" : "idle"}`}>
                {/* Gradient overlay for active state */}
                <div className="dynamic-island-gradient" />

                {/* Nav Items */}
                <div className="dynamic-island-items">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.slice(1);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`dynamic-island-item ${isActive ? "active" : ""}`}
                      >
                        <span className="dynamic-island-text">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-3 md:hidden">
              {/* Mobile Slider Indicator */}
              <div className="ios-slider-mobile">
                <div
                  className="ios-slider-fill-mobile"
                  style={{ width: scrollProgressPercent }}
                />
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] active:scale-95 transition-transform z-50"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-[var(--foreground)] rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                      }`}
                  />
                  <span
                    className={`block h-0.5 bg-[var(--foreground)] rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-0" : ""
                      }`}
                  />
                  <span
                    className={`block h-0.5 bg-[var(--foreground)] rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                      }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop blur */}
        <div
          className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-xl"
          onClick={closeMobileMenu}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          {/* Large Horizontal Slider in Menu */}
          <div className="ios-slider-large mb-12">
            <div
              className="ios-slider-fill-large"
              style={{ width: scrollProgressPercent }}
            />
            <span className="ios-slider-label">{scrollProgressLabel}</span>
          </div>

          <nav className="space-y-2 w-full max-w-sm">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden border border-[var(--separator)] ${mobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                    } ${isActive ? "scale-105" : "active:scale-[0.98]"}`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 75}ms` : "0ms"
                  }}
                >
                  {/* Horizontal fill based on scroll */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)]/30 via-[var(--accent-purple)]/30 to-[var(--accent-pink)]/30 transition-all duration-500"
                    style={{
                      clipPath: `inset(0 ${100 - scrollProgress * 100}% 0 0)`,
                    }}
                  />

                  <span className={`text-2xl relative z-10 transition-transform duration-300 ${isActive ? "scale-125" : ""}`}>
                    {item.icon}
                  </span>
                  <span className={`text-xl font-semibold relative z-10 transition-all duration-300 ${isActive ? "scale-110 text-white" : "text-[var(--foreground)]"
                    }`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Social links in mobile menu */}
          <div className="absolute bottom-12 flex gap-4">
            {siteConfig.socials.github && (
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5 text-[var(--foreground-tertiary)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {siteConfig.socials.linkedin && (
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] active:scale-95 transition-transform"
              >
                <svg className="w-5 h-5 text-[var(--foreground-tertiary)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
