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
