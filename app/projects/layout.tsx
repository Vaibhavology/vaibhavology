import type { Metadata } from "next";
import { siteConfig } from "../config";

export const metadata: Metadata = {
    title: "All Projects",
    description: `Explore all projects by ${siteConfig.name} — from concept to production. Full-stack systems, AI pipelines, and automation platforms.`,
    openGraph: {
        title: `All Projects | ${siteConfig.name}`,
        description: `Explore all projects by ${siteConfig.name} — from concept to production.`,
        url: `${siteConfig.url}projects`,
    },
    alternates: {
        canonical: "/projects",
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
