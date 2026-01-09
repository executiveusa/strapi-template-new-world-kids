// Image Enrichment for Ghost Posts
// Generates fallback images for posts missing feature images

import OpenAI from 'openai';

// In-memory cache for generated image URLs
const imageCache = new Map<string, string>();

/**
 * Generate a stock-photo-style header image for a blog post and return its URL.
 *
 * Uses an in-memory cache (keyed by a trimmed combination of title and excerpt) to avoid duplicate generation.
 * If neither IMAGE_GEN_API_KEY nor OPENAI_API_KEY is set, image generation is skipped and `null` is returned.
 *
 * @param postTitle - The blog post title used to inform the image prompt
 * @param postExcerpt - The post excerpt or description used to inform the image prompt
 * @param niche - Site niche or context to shape the prompt (defaults to "nonprofit social impact education")
 * @returns The generated image URL, or `null` if generation is skipped or fails
 */
export async function generatePostImage(
  postTitle: string,
  postExcerpt: string,
  niche: string = 'nonprofit social impact education'
): Promise<string | null> {
  // Check cache first
  const cacheKey = `${postTitle}-${postExcerpt}`.slice(0, 100);
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey)!;
  }

  const apiKey = process.env.IMAGE_GEN_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('No IMAGE_GEN_API_KEY or OPENAI_API_KEY set. Skipping image generation.');
    return null;
  }

  try {
    const openai = new OpenAI({ apiKey });

    // Create a prompt that captures the essence of the post
    const prompt = `Create a professional, high-quality stock photo style image for a blog post about ${niche}. 
Title: "${postTitle}"
Context: ${postExcerpt}

Style: Modern, clean, inspiring. Suitable for a nonprofit organization website. 
Focus on people, community, impact, and positive change.
No text or words in the image.`;

    const response = await openai.images.generate({
      model: process.env.IMAGE_GEN_MODEL || 'dall-e-3',
      prompt: prompt.slice(0, 1000), // DALL-E has character limits
      n: 1,
      size: '1792x1024', // Wide format for blog headers
      quality: 'standard',
      style: 'natural',
    });

    const imageUrl = response.data[0]?.url;
    if (imageUrl) {
      // Cache for future requests
      imageCache.set(cacheKey, imageUrl);
      return imageUrl;
    }

    return null;
  } catch (error) {
    console.error('Error generating image with DALL-E:', error);
    return null;
  }
}

/**
 * Return a CSS linear-gradient string that corresponds to a post tag.
 *
 * Matches known category keywords case-insensitively by substring and returns the associated gradient; if none match, returns the default gradient.
 *
 * @param tag - Primary tag or category name to match against (case-insensitive, substring match)
 * @returns A CSS `linear-gradient(...)` string for the matched tag, or the default gradient if no match is found.
 */
export function getFallbackGradient(tag?: string): string {
  const gradients: Record<string, string> = {
    food: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', // Green
    water: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', // Cyan
    energy: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', // Yellow
    shelter: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)', // Purple
    education: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', // Blue
    sports: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', // Red
    media: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', // Pink
    default: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', // Indigo
  };

  const tagLower = tag?.toLowerCase() || '';
  for (const [key, gradient] of Object.entries(gradients)) {
    if (tagLower.includes(key)) {
      return gradient;
    }
  }

  return gradients.default;
}

/**
 * Provide an image for a Ghost post by preferring an existing feature image, attempting generation when an image API key is available, and falling back to a category-based gradient.
 *
 * Attempts to generate a post image only if no `feature_image` is present and an image generation API key exists; otherwise returns an appropriate fallback.
 *
 * @param post - Ghost post object; `primary_tag?.name` is used to select a gradient when no image is available
 * @returns An object with `type` indicating the image source (`'existing'`, `'generated'`, or `'gradient'`) and `url` containing either the image URL or a CSS gradient string
 */
export async function enrichPostImage(post: {
  title: string;
  excerpt: string;
  feature_image?: string | null;
  primary_tag?: { name: string; slug: string };
}): Promise<{ type: 'existing' | 'generated' | 'gradient'; url: string }> {
  // If post already has feature image, use it
  if (post.feature_image) {
    return {
      type: 'existing',
      url: post.feature_image,
    };
  }

  // Try to generate an image
  if (process.env.IMAGE_GEN_API_KEY || process.env.OPENAI_API_KEY) {
    const generatedUrl = await generatePostImage(
      post.title,
      post.excerpt,
      process.env.SITE_NICHE || 'nonprofit social impact'
    );

    if (generatedUrl) {
      return {
        type: 'generated',
        url: generatedUrl,
      };
    }
  }

  // Fallback to gradient
  const gradient = getFallbackGradient(post.primary_tag?.name);
  return {
    type: 'gradient',
    url: gradient,
  };
}

/**
 * Create an SVG placeholder image and return it as a base64 data URL for use during loading states.
 *
 * @param width - Width of the placeholder in pixels
 * @param height - Height of the placeholder in pixels
 * @param color - Background color for the placeholder (any valid CSS color string, e.g. `#1e293b`)
 * @returns A `data:image/svg+xml;base64,...` URL containing the generated SVG placeholder
 */
export function generatePlaceholder(
  width: number = 1200,
  height: number = 675,
  color: string = '#1e293b' // slate-800
): string {
  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="system-ui, sans-serif" 
        font-size="24" 
        fill="#64748b" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        Loading...
      </text>
    </svg>
  `.trim();

  // Convert to base64 data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}