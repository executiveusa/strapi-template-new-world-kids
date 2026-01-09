// Blog Index Page - Main Blog Listing
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { getPosts, getTags, isGhostConfigured } from '@/lib/ghost/client';
import { PostCard } from '@/components/blog/PostCard';
import { NewsletterCTA } from '@/components/blog/NewsletterCTA';
import { StarField3D } from '@/components/cockpit/GameUI/StarField3D';
import Link from 'next/link';
import { BookOpen, Rss, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - New World Kids',
  description: 'Stories, insights, and updates on building for 7 generations. Food, water, energy, and shelter for a sustainable future.',
  openGraph: {
    title: 'Blog - New World Kids',
    description: 'Stories, insights, and updates on building for 7 generations.',
    type: 'website',
  },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

/**
 * Renders the blog index page or a "coming soon" placeholder depending on content configuration.
 *
 * When the content service is configured, this component fetches posts and tags, and renders
 * a hero section, tag filters, a responsive grid of post cards with pagination (when applicable),
 * and a newsletter sidebar. If the content service is not configured, it renders a full-screen
 * "Blog Coming Soon" placeholder with a CTA.
 *
 * @returns A React element representing the blog index page or the placeholder UI when the content service is not configured.
 */
export default async function BlogIndexPage() {
  // Check if Ghost is configured
  if (!isGhostConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <StarField3D />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
          <div className="glass-card p-12 rounded-2xl">
            <BookOpen className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Blog Coming Soon
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              We're setting up our content platform. Check back soon for stories, insights, and updates on building for 7 generations.
            </p>
            <Link
              href="/impact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              View Our Impact
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch posts and tags
  const [postsData, tags] = await Promise.all([
    getPosts({ limit: 12 }),
    getTags(),
  ]);

  const { posts, meta } = postsData;

  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <StarField3D />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-purple-900/40 to-slate-900/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-8 py-16">
            <div className="text-center">
              {/* Live indicator */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 border border-green-500/30">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-mono text-green-400 uppercase tracking-wide">
                  Live Blog
                </span>
              </div>

              {/* Main heading */}
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Stories & Insights
                </span>
              </h1>

              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                Updates on our projects, lessons from the field, and resources for building a sustainable future for 7 generations.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur rounded-xl font-semibold text-slate-300 border border-slate-700/50 hover:border-cyan-500/50 hover:text-white transition-all">
                  <Search className="w-5 h-5" />
                  Search
                </button>
                <Link
                  href="/blog/feed.xml"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur rounded-xl font-semibold text-slate-300 border border-slate-700/50 hover:border-cyan-500/50 hover:text-white transition-all"
                >
                  <Rss className="w-5 h-5" />
                  RSS Feed
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Filter */}
        {tags.length > 0 && (
          <div className="mx-auto max-w-7xl px-8 py-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/blog"
                className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-full hover:bg-cyan-700 transition-colors"
              >
                All Posts
              </Link>
              {tags.slice(0, 10).map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog/tag/${tag.slug}`}
                  className="px-4 py-2 bg-slate-800/50 backdrop-blur text-slate-300 font-semibold rounded-full border border-slate-700/50 hover:border-cyan-500/50 hover:text-white transition-all"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Posts */}
            <div className="lg:col-span-2">
              {posts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {posts.map((post, index) => (
                      <PostCard key={post.id} post={post} index={index} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {meta.pagination.pages > 1 && (
                    <div className="flex justify-center gap-4">
                      {meta.pagination.prev && (
                        <Link
                          href={`/blog?page=${meta.pagination.prev}`}
                          className="px-6 py-3 glass-card rounded-xl font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          ← Previous
                        </Link>
                      )}
                      <div className="px-6 py-3 glass-card rounded-xl font-semibold text-white">
                        Page {meta.pagination.page} of {meta.pagination.pages}
                      </div>
                      {meta.pagination.next && (
                        <Link
                          href={`/blog?page=${meta.pagination.next}`}
                          className="px-6 py-3 glass-card rounded-xl font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                          Next →
                        </Link>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 glass-card rounded-2xl">
                  <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-xl text-slate-400">No posts yet. Check back soon!</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <NewsletterCTA variant="sidebar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}