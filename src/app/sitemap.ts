import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://messageyourmp.com/', 
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
} 