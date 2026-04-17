"use client";

import Image from "next/image";
import { experienceCards } from "../config";
import { ScrollAnimate } from "./ScrollAnimate";

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <ScrollAnimate>
          <div className="text-center mb-16">
            <p className="text-[var(--accent)] text-subheadline font-medium mb-2 tracking-wide uppercase">
              Experience
            </p>
            <h2 className="text-title-1 text-[var(--foreground)] mb-4">
              Work Experience
            </h2>
            <p className="text-[var(--foreground-tertiary)] text-body max-w-2xl mx-auto">
              My professional journey across companies and roles that shaped my engineering skills.
            </p>
          </div>
        </ScrollAnimate>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)] opacity-30" />

          {/* Experience items */}
          <div className="space-y-12">
            {experienceCards.map((exp, index) => (
              <ScrollAnimate key={index} delay={index * 150}>
                <div className="relative flex gap-6 md:gap-8 group">
                  {/* Timeline node */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[var(--background-secondary)] border border-[var(--separator)] flex items-center justify-center overflow-hidden group-hover:border-[var(--accent)]/40 group-hover:shadow-lg group-hover:shadow-[var(--accent)]/5 transition-all duration-500">
                      <Image
                        src={exp.icon}
                        alt={exp.company}
                        width={48}
                        height={48}
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                        style={{ width: "48px", height: "48px" }}
                        loading="lazy"
                      />
                    </div>
                    {/* Green pulse dot for current role */}
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3">
                        <span className="absolute inset-0 rounded-full bg-[var(--accent-green)] animate-ping opacity-75" />
                        <span className="relative block w-3 h-3 rounded-full bg-[var(--accent-green)]" />
                      </div>
                    )}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 card-ios group-hover:border-[var(--accent)]/20 transition-all duration-500 pb-6">
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-body text-[var(--accent)] font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="flex items-center gap-1.5 text-footnote text-[var(--foreground-tertiary)] flex-shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {exp.duration}
                      </span>
                    </div>

                    {/* Description - bullet points */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-body text-[var(--foreground-secondary)]">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0 opacity-60" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-caption font-medium bg-[var(--background-tertiary)] border border-[var(--separator)] rounded-lg text-[var(--foreground-tertiary)] group-hover:border-[var(--accent)]/15 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
