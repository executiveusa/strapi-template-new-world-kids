// Blog Post Card Component with Glassmorphism
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import type { PostCardProps } from '@/lib/ghost/types';
import { formatExcerpt } from '@/lib/ghost/client';

interface Props {
  post: PostCardProps;
  index?: number;
}

/**
 * Renders a glassmorphism-styled blog post card that links to the post's detail page.
 *
 * @param post - Post data used to populate the card (expects properties like `slug`, `title`, `excerpt`, `feature_image`, `published_at`, `reading_time`, `primary_tag`, and `primary_author`).
 * @param index - Optional zero-based index used to stagger the entry animation; defaults to `0`.
 * @returns The JSX element for the interactive post card.
 */
export function PostCard({ post, index = 0 }: Props) {
  const {
    slug,
    title,
    excerpt,
    feature_image,
    published_at,
    reading_time,
    primary_tag,
    primary_author,
  } = post;

  // Format date
  const date = new Date(published_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Animation delay based on index
  const delay = index * 0.1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl glass-card hover:scale-[1.02] transition-all duration-300">
          {/* Feature Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            {feature_image ? (
              <Image
                src={feature_image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-cyan-900/50" />
            )}

            {/* Tag Overlay */}
            {primary_tag && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-cyan-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                  {primary_tag.name}
                </span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Metadata */}
            <div className="flex items-center gap-4 mb-3 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={published_at}>{formattedDate}</time>
              </div>
              {reading_time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{reading_time} min read</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-slate-300 line-clamp-3 mb-4">
              {formatExcerpt(excerpt, 150)}
            </p>

            {/* Author */}
            {primary_author && (
              <div className="flex items-center gap-2">
                {primary_author.profile_image ? (
                  <Image
                    src={primary_author.profile_image}
                    alt={primary_author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-sm text-slate-400">{primary_author.name}</span>
              </div>
            )}

            {/* Read More Indicator */}
            <div className="mt-4 flex items-center gap-2 text-cyan-400 font-semibold">
              <span>Read More</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300 -z-10" />
        </div>
      </Link>
    </motion.article>
  );
}