import { MetadataRoute } from 'next';
import { seoConfig, siteConfig, allProjects } from './config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = seoConfig.openGraph?.url || siteConfig.url || "https://vaibhavology.vercel.app";
    // Ensure baseUrl doesn't have a trailing slash for consistent concatenation
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    // Generate project-specific URLs
    const projectUrls: MetadataRoute.Sitemap = allProjects.map((project) => ({
        url: `${cleanBaseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: `${cleanBaseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${cleanBaseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        ...projectUrls,
    ];
}
