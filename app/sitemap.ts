import { MetadataRoute } from 'next';
import { seoConfig, siteConfig } from './config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = seoConfig.openGraph?.url || siteConfig.url || "https://vaibhavology.vercel.app";
    // Ensure baseUrl doesn't have a trailing slash for consistent concatenation
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    return [
        {
            url: `${cleanBaseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];
}
