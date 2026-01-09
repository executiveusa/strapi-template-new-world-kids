// Ghost CMS Content API Client
// Headless CMS integration for New World Kids blog

import GhostContentAPI from '@tryghost/content-api';
import type { 
  GhostPost, 
  GhostTag, 
  GhostAuthor, 
  GhostSettings,
  PostsOrPages,
  Params 
} from './types';

// Singleton Ghost API instance
let ghostClient: GhostContentAPI | null = null;

/**
 * Get or create Ghost API client instance
 */
export function getGhostClient(): GhostContentAPI {
  if (ghostClient) return ghostClient;

  const url = process.env.GHOST_CONTENT_API_URL || process.env.NEXT_PUBLIC_GHOST_URL;
  const key = process.env.GHOST_CONTENT_API_KEY || process.env.NEXT_PUBLIC_GHOST_KEY;

  if (!url || !key) {
    throw new Error(
      'Ghost CMS not configured. Set GHOST_CONTENT_API_URL and GHOST_CONTENT_API_KEY environment variables.'
    );
  }

  ghostClient = new GhostContentAPI({
    url,
    key,
    version: 'v5.0',
  });

  return ghostClient;
}

/**
 * Check if Ghost CMS is configured
 */
export function isGhostConfigured(): boolean {
  const url = process.env.GHOST_CONTENT_API_URL || process.env.NEXT_PUBLIC_GHOST_URL;
  const key = process.env.GHOST_CONTENT_API_KEY || process.env.NEXT_PUBLIC_GHOST_KEY;
  return Boolean(url && key);
}

/**
 * Fetch all posts with pagination
 * @param options - Query options (limit, page, filter, etc.)
 */
export async function getPosts(options?: Params): Promise<PostsOrPages> {
  if (!isGhostConfigured()) {
    console.warn('Ghost CMS not configured. Set GHOST_CONTENT_API_URL and GHOST_CONTENT_API_KEY (or NEXT_PUBLIC_GHOST_URL and NEXT_PUBLIC_GHOST_KEY) environment variables. Returning empty posts.');
    return { posts: [], meta: { pagination: { page: 1, limit: 15, pages: 0, total: 0, next: null, prev: null } } };
  }

  try {
    const api = getGhostClient();
    const posts = await api.posts.browse({
      limit: 12,
      include: ['tags', 'authors'],
      ...options,
    });
    return { posts: posts as GhostPost[], meta: posts.meta };
  } catch (error) {
    console.error('Error fetching Ghost posts:', error);
    return { posts: [], meta: { pagination: { page: 1, limit: 15, pages: 0, total: 0, next: null, prev: null } } };
  }
}

/**
 * Fetch a single post by slug
 * @param slug - Post slug
 */
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  if (!isGhostConfigured()) {
    console.warn('Ghost CMS not configured. Returning null.');
    return null;
  }

  try {
    const api = getGhostClient();
    const posts = await api.posts.read(
      { slug },
      { include: ['tags', 'authors'] }
    );
    return posts as GhostPost;
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch posts by tag
 * @param tag - Tag slug
 * @param options - Query options
 */
export async function getPostsByTag(tag: string, options?: Params): Promise<PostsOrPages> {
  return getPosts({
    filter: `tag:${tag}`,
    ...options,
  });
}

/**
 * Fetch posts by author
 * @param author - Author slug
 * @param options - Query options
 */
export async function getPostsByAuthor(author: string, options?: Params): Promise<PostsOrPages> {
  return getPosts({
    filter: `author:${author}`,
    ...options,
  });
}

/**
 * Fetch all tags
 */
export async function getTags(): Promise<GhostTag[]> {
  if (!isGhostConfigured()) {
    return [];
  }

  try {
    const api = getGhostClient();
    const tags = await api.tags.browse({ limit: 'all' });
    return tags as GhostTag[];
  } catch (error) {
    console.error('Error fetching Ghost tags:', error);
    return [];
  }
}

/**
 * Fetch all authors
 */
export async function getAuthors(): Promise<GhostAuthor[]> {
  if (!isGhostConfigured()) {
    return [];
  }

  try {
    const api = getGhostClient();
    const authors = await api.authors.browse({ limit: 'all' });
    return authors as GhostAuthor[];
  } catch (error) {
    console.error('Error fetching Ghost authors:', error);
    return [];
  }
}

/**
 * Fetch site settings
 */
export async function getSettings(): Promise<GhostSettings | null> {
  if (!isGhostConfigured()) {
    return null;
  }

  try {
    const api = getGhostClient();
    const settings = await api.settings.browse();
    return settings as GhostSettings;
  } catch (error) {
    console.error('Error fetching Ghost settings:', error);
    return null;
  }
}

/**
 * Get full URL for Ghost images (handle relative URLs)
 */
export function getImageUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  
  // If already absolute URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Prepend Ghost site URL
  const siteUrl = process.env.GHOST_CONTENT_API_URL || process.env.NEXT_PUBLIC_GHOST_URL;
  if (!siteUrl) return url;

  const baseUrl = siteUrl.replace(/\/$/, ''); // Remove trailing slash
  const imagePath = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${imagePath}`;
}

/**
 * Calculate reading time from post HTML
 * @param html - Post HTML content
 * @returns Reading time in minutes
 */
export function calculateReadingTime(html: string): number {
  const wordsPerMinute = 200;
  const text = html.replace(/<[^>]*>/g, ''); // Strip HTML tags
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

/**
 * Format post excerpt (truncate if needed)
 * @param excerpt - Post excerpt
 * @param maxLength - Maximum character length
 */
export function formatExcerpt(excerpt: string | undefined, maxLength: number = 160): string {
  if (!excerpt) return '';
  if (excerpt.length <= maxLength) return excerpt;
  return excerpt.slice(0, maxLength).trim() + '...';
}
