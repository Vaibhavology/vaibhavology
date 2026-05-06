import type { Metadata } from "next";
import { allProjects, siteConfig } from "../../config";
import ProjectDetailsClient from "./ProjectDetailsClient";

// Generate static params for all projects (enables SSG)
export async function generateStaticParams() {
    return allProjects.map((project) => ({
        id: String(project.id),
    }));
}

// Dynamic metadata for each project page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const projectId = Number(id);
    const project = allProjects.find((p) => p.id === projectId);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.tagline,
        openGraph: {
            title: `${project.title} | ${siteConfig.name}`,
            description: project.tagline,
            url: `${siteConfig.url}projects/${project.id}`,
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | ${siteConfig.name}`,
            description: project.tagline,
            images: [project.image],
        },
        alternates: {
            canonical: `/projects/${project.id}`,
        },
    };
}

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <ProjectDetailsClient id={id} />;
}
