// Related Posts Component
'use client';

import { motion } from 'framer-motion';
import { PostCard } from './PostCard';
import type { PostCardProps } from '@/lib/ghost/types';

interface Props {
  posts: PostCardProps[];
  currentPostId: string;
  limit?: number;
}

/**
 * Render a "Read Next" section displaying related post cards excluding the current post.
 *
 * @param posts - Array of post data to select related posts from
 * @param currentPostId - ID of the post to exclude from the related list
 * @param limit - Maximum number of related posts to display (default: 3)
 * @returns `null` if no related posts remain; otherwise a section element containing up to `limit` related PostCard components
 */
export function RelatedPosts({ posts, currentPostId, limit = 3 }: Props) {
  // Filter out current post and limit results
  const relatedPosts = posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, limit);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-slate-700/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Read Next
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}