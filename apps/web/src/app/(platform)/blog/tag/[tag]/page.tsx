// Blog Tag Filter Page
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { getPosts, getTags, isGhostConfigured } from '@/lib/ghost/client';
import { PostCard } from '@/components/blog/PostCard';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { StarField3D } from '@/components/cockpit/GameUI/StarField3D';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';

export const revalidate = 60;

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

/**
 * Generate static route parameters for each blog tag.
 *
 * @returns An array of objects of the form `{ tag: string }` where `tag` is the slug for each tag. If Ghost is not configured, returns an empty array.
 */
export async function generateStaticParams() {
  if (!isGhostConfigured()) return [];

  const tags = await getTags();
  return tags.map((tag) => ({
    tag: tag.slug,
  }));
}

/**
 * Generate page metadata for a blog tag.
 *
 * @param params - Promise resolving to an object containing the route `tag` slug
 * @returns Metadata for the tag page. If the tag exists, includes `title` as "`<tag name> - Blog`", `description` set to the tag's description or a default "Posts tagged with \"<tag name>\"" string, and `openGraph` with `title`, `description`, and `type: 'website'`. If Ghost is not configured or the tag is not found, returns metadata with `title: 'Tag Not Found'`.
 */
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  if (!isGhostConfigured()) return { title: 'Tag Not Found' };

  const resolvedParams = await params;

  const tags = await getTags();
  const tag = tags.find((t) => t.slug === resolvedParams.tag);

  if (!tag) return { title: 'Tag Not Found' };

  return {
    title: `${tag.name} - Blog`,
    description: tag.description || `Posts tagged with "${tag.name}"`,
    openGraph: {
      title: `${tag.name} - Blog`,
      description: tag.description,
      type: 'website',
    },
  };
}

/**
 * Render the blog listing page for a specific tag slug.
 *
 * Fetches tags and posts, determines the current tag and its themed styling, and returns the page UI showing the tag hero, post grid (or an empty state), and newsletter CTA.
 * Invokes the Next.js `notFound()` flow to produce a 404 when Ghost is not configured or the requested tag cannot be found.
 *
 * @param params - An object containing the route `tag` slug used to select the current tag
 * @returns The React element for the tag-specific blog page
 */
export default async function TagPage({ params }: TagPageProps) {
  if (!isGhostConfigured()) {
    notFound();
  }

  const resolvedParams = await params;

  // Get all tags and find the current tag
  const allTags = await getTags();
  const currentTag = allTags.find((t) => t.slug === resolvedParams.tag);

  if (!currentTag) {
    notFound();
  }

  // Get posts with the current tag
  const { posts } = await getPosts({ limit: 100 });
  const taggedPosts = posts.filter((post) =>
    post.tags?.some((t) => t.slug === resolvedParams.tag)
  );

  // Get tag colors based on name
  const getTagColor = (tagName: string): string => {
    const colorMap: Record<string, string> = {
      impact: 'from-green-500 to-emerald-600',
      water: 'from-blue-500 to-cyan-600',
      food: 'from-amber-500 to-yellow-600',
      energy: 'from-red-500 to-orange-600',
      shelter: 'from-purple-500 to-pink-600',
      technology: 'from-indigo-500 to-blue-600',
      partnerships: 'from-violet-500 to-purple-600',
      transparency: 'from-cyan-500 to-blue-600',
      innovation: 'from-pink-500 to-rose-600',
    };
    return colorMap[tagName.toLowerCase()] || 'from-slate-600 to-slate-700';
  };

  const tagColor = getTagColor(currentTag.name);

  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <StarField3D />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Navigation */}
        <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900/50 to-transparent backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors w-fit"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Tag Hero Section */}
        <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900/80 via-purple-900/40 to-slate-900/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Tag Icon */}
              <div className={`mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${tagColor} shadow-2xl`}>
                <Tag className="w-10 h-10 text-white" />
              </div>

              {/* Tag Name */}
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className={`bg-gradient-to-r ${tagColor} bg-clip-text text-transparent`}>
                  {currentTag.name}
                </span>
              </h1>

              {/* Tag Description */}
              {currentTag.description && (
                <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-6">
                  {currentTag.description}
                </p>
              )}

              {/* Post Count */}
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/50 px-4 py-2 border border-slate-700">
                <span className={`text-sm font-mono font-bold bg-gradient-to-r ${tagColor} bg-clip-text text-transparent`}>
                  {taggedPosts.length}
                </span>
                <span className="text-sm text-slate-400">
                  {taggedPosts.length === 1 ? 'post' : 'posts'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mx-auto max-w-7xl px-8 py-16">
          {taggedPosts.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
              >
                {taggedPosts.map((post, index) => (
                  <div key={post.id} className="h-full">
                    <PostCard post={post} index={index} />
                  </div>
                ))}
              </motion.div>

              {/* Newsletter CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <NewsletterCTA variant="inline" />
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
                <Tag className="w-16 h-16 text-slate-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-3">
                  No posts yet
                </h2>
                <p className="text-slate-400 mb-6">
                  There are no posts tagged with &quot;{currentTag.name}&quot;. Check back soon!
                </p>
                <Link
                  href="/blog"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  Explore All Posts
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}