'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollRevealProverb() {
  const containerRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const attributionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !quoteRef.current || !attributionRef.current) return

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([quoteRef.current, attributionRef.current], {
        opacity: 0,
        y: 40,
      })

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      })

      // Animate quote
      tl.to(quoteRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })

      // Animate attribution with slight delay
      tl.to(
        attributionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      )

      // Add subtle parallax to the whole container
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
        y: -50,
        ease: 'none',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="proverb-container relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Quote */}
          <div ref={quoteRef} className="quote-text mb-8">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-900 dark:text-gray-100">
              <span className="font-cursive italic">
                If you think you're too small to make a difference,
                <br className="hidden sm:block" />
                try going to sleep with a mosquito in the room
              </span>
            </p>
          </div>

          {/* Attribution */}
          <div ref={attributionRef} className="attribution-text">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
              — West African Proverb
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-12 flex justify-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

        .font-cursive {
          font-family: 'Dancing Script', 'Satisfy', 'Shadows Into Light', cursive;
          font-weight: 600;
          letter-spacing: 0.02em;
          line-height: 1.4;
        }

        /* Ensure legibility on all devices */
        @media (max-width: 640px) {
          .font-cursive {
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        }

        /* Enhance readability with subtle text shadow */
        .quote-text p {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        /* Add subtle hover effect */
        .proverb-container:hover .quote-text {
          transform: scale(1.02);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  )
}

export default ScrollRevealProverb
