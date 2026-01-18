// Blog Post Content Renderer
// Safely renders Ghost HTML content with custom styling

'use client';

import { useEffect, useRef } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface Props {
  html: string;
  className?: string;
}

/**
 * Renders sanitized Ghost HTML and applies consistent styling and structural adjustments to common post elements.
 *
 * @param html - Raw HTML content to display; it will be sanitized before rendering.
 * @param className - Optional additional CSS classes applied to the root container.
 * @returns A div element containing the sanitized HTML with element-level styling and layout enhancements applied.
 */
export function PostContent({ html, className = '' }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Add custom classes to elements for styling
    const content = contentRef.current;

    // Style headings
    content.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
      heading.classList.add('font-bold', 'text-white', 'mb-4', 'mt-8');
    });

    // Style paragraphs
    content.querySelectorAll('p').forEach((p) => {
      p.classList.add('text-slate-300', 'leading-relaxed', 'mb-4');
    });

    // Style links
    content.querySelectorAll('a').forEach((a) => {
      a.classList.add('text-cyan-400', 'hover:text-cyan-300', 'underline', 'transition-colors');
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });

    // Style lists
    content.querySelectorAll('ul, ol').forEach((list) => {
      list.classList.add('text-slate-300', 'mb-4', 'pl-6');
    });

    // Style list items
    content.querySelectorAll('li').forEach((li) => {
      li.classList.add('mb-2');
    });

    // Style blockquotes
    content.querySelectorAll('blockquote').forEach((quote) => {
      quote.classList.add(
        'border-l-4',
        'border-cyan-500',
        'pl-6',
        'italic',
        'text-slate-400',
        'my-6'
      );
    });

    // Style code blocks
    content.querySelectorAll('pre').forEach((pre) => {
      pre.classList.add(
        'bg-slate-800/50',
        'border',
        'border-slate-700',
        'rounded-xl',
        'p-4',
        'overflow-x-auto',
        'mb-4'
      );
    });

    // Style inline code
    content.querySelectorAll('code').forEach((code) => {
      if (!code.parentElement?.tagName.toLowerCase().includes('pre')) {
        code.classList.add(
          'bg-slate-800/50',
          'px-2',
          'py-1',
          'rounded',
          'text-cyan-400',
          'text-sm'
        );
      }
    });

    // Style images
    content.querySelectorAll('img').forEach((img) => {
      img.classList.add('rounded-xl', 'my-6', 'w-full');
      
      // Wrap in figure if not already
      if (img.parentElement?.tagName !== 'FIGURE') {
        const figure = document.createElement('figure');
        figure.classList.add('my-6');
        img.parentNode?.insertBefore(figure, img);
        figure.appendChild(img);

        // Add caption if alt text exists
        if (img.alt) {
          const figcaption = document.createElement('figcaption');
          figcaption.classList.add('text-center', 'text-sm', 'text-slate-400', 'mt-2');
          figcaption.textContent = img.alt;
          figure.appendChild(figcaption);
        }
      }
    });

    // Style tables
    content.querySelectorAll('table').forEach((table) => {
      table.classList.add('w-full', 'mb-6', 'border-collapse');
      const wrapper = document.createElement('div');
      wrapper.classList.add('overflow-x-auto', 'rounded-xl', 'border', 'border-slate-700');
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    content.querySelectorAll('th').forEach((th) => {
      th.classList.add('bg-slate-800/50', 'p-3', 'text-left', 'text-white', 'font-semibold');
    });

    content.querySelectorAll('td').forEach((td) => {
      td.classList.add('p-3', 'text-slate-300', 'border-t', 'border-slate-700');
    });

    // Style hr
    content.querySelectorAll('hr').forEach((hr) => {
      hr.classList.add('border-slate-700', 'my-8');
    });
  }, [html]);

  // Sanitize HTML to prevent XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'], // Allow iframe for embeds
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  });

  return (
    <div
      ref={contentRef}
      className={`prose prose-lg prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}