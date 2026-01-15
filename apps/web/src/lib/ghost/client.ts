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
 * Get the memoized Ghost Content API client configured from environment variables.
 *
 * @returns The singleton GhostContentAPI instance.
 * @throws Error if GHOST_CONTENT_API_URL or NEXT_PUBLIC_GHOST_URL, or GHOST_CONTENT_API_KEY or NEXT_PUBLIC_GHOST_KEY are not set.
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
 * Determines whether the Ghost content API has been configured via environment variables.
 *
 * @returns `true` if both the Ghost content API URL and key environment variables are set, `false` otherwise.
 */
export function isGhostConfigured(): boolean {
  const url = process.env.GHOST_CONTENT_API_URL || process.env.NEXT_PUBLIC_GHOST_URL;
  const key = process.env.GHOST_CONTENT_API_KEY || process.env.NEXT_PUBLIC_GHOST_KEY;
  return Boolean(url && key);
}

/**
 * Retrieve posts from Ghost CMS using optional query parameters and include pagination metadata.
 *
 * @param options - Query options to customize the request (e.g., `limit`, `page`, `filter`, `include`). When omitted, defaults are applied.
 * @returns An object with `posts` (array of posts) and `meta` (pagination and related metadata). If Ghost is not configured or the request fails, returns an empty `posts` array and a default `meta.pagination` structure.
 */
export async function getPosts(options?: Params): Promise<PostsOrPages> {
  if (!isGhostConfigured()) {
    console.warn('Ghost CMS not configured. Returning empty posts.');
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
 * Fetches a single post identified by its slug.
 *
 * @param slug - The post's URL slug
 * @returns The post as a `GhostPost`, or `null` if Ghost is not configured or an error occurs
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
 * Retrieve posts filtered to a specific tag.
 *
 * @param tag - The tag slug to filter posts by
 * @param options - Additional query parameters to merge with the tag filter
 * @returns An object containing `posts` (array of posts) and `meta` (pagination/metadata)
 */
export async function getPostsByTag(tag: string, options?: Params): Promise<PostsOrPages> {
  return getPosts({
    filter: `tag:${tag}`,
    ...options,
  });
}

/**
 * Fetches posts filtered by an author slug.
 *
 * @param author - The author's slug used to filter posts
 * @param options - Optional query parameters to merge with the request
 * @returns An object containing `posts` (array of posts) and `meta` (request metadata and pagination)
 */
export async function getPostsByAuthor(author: string, options?: Params): Promise<PostsOrPages> {
  return getPosts({
    filter: `author:${author}`,
    ...options,
  });
}

/**
 * Retrieve all tags from the configured Ghost site.
 *
 * @returns An array of `GhostTag` objects; returns an empty array if Ghost is not configured or if fetching fails.
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
 * Retrieve all authors from the configured Ghost site.
 *
 * If Ghost is not configured or the request fails, an empty array is returned.
 *
 * @returns An array of Ghost authors; empty array if Ghost is not configured or the request fails.
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
 * Retrieve the site's Ghost settings.
 *
 * @returns The site's settings as `GhostSettings`, or `null` if Ghost is not configured or fetching the settings fails.
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
 * Resolves a Ghost image URL to an absolute site URL when given a relative path.
 *
 * @param url - The image URL or path; may be an absolute `http(s)` URL or a relative path.
 * @returns The absolute image URL, the original `url` if the site base is unavailable, or `null` if `url` is falsy.
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
 * Estimate the reading time for HTML content.
 *
 * @param html - HTML string whose visible text will be measured
 * @returns The estimated reading time in minutes, rounded up to the nearest whole minute
 */
export function calculateReadingTime(html: string): number {
  const wordsPerMinute = 200;
  const text = html.replace(/<[^>]*>/g, ''); // Strip HTML tags
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

/**
 * Return a post excerpt truncated to a maximum length.
 *
 * @param excerpt - The original post excerpt; may be undefined
 * @param maxLength - Maximum allowed characters for the returned excerpt (default: 160)
 * @returns The original excerpt if its length is less than or equal to `maxLength`; otherwise a truncated excerpt of at most `maxLength` characters with `...` appended. Returns an empty string if `excerpt` is falsy.
 */
export function formatExcerpt(excerpt: string | undefined, maxLength: number = 160): string {
  if (!excerpt) return '';
  if (excerpt.length <= maxLength) return excerpt;
  return excerpt.slice(0, maxLength).trim() + '...';
}