// Newsletter CTA Component
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface Props {
  variant?: 'sidebar' | 'footer' | 'inline';
  className?: string;
}

export function NewsletterCTA({ variant = 'sidebar', className = '' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thanks for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  const variantStyles = {
    sidebar: 'sticky top-24 glass-card p-6 rounded-2xl',
    footer: 'glass-card p-8 rounded-2xl',
    inline: 'bg-gradient-to-br from-purple-900/50 to-cyan-900/50 p-6 rounded-2xl border border-cyan-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${variantStyles[variant]} ${className}`}
    >
      {/* Icon */}
      <div className="mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-bold text-white mb-2">
        Stay Connected
      </h3>
      <p className="text-slate-300 mb-4">
        Get impact stories and updates delivered to your inbox. Join 1,500+ changemakers.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          )}
          {status === 'success' && <Check className="w-5 h-5" />}
          {status === 'idle' && 'Subscribe'}
          {status === 'loading' && 'Subscribing...'}
          {status === 'success' && 'Subscribed!'}
          {status === 'error' && 'Try Again'}
        </button>
      </form>

      {/* Status Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 p-3 rounded-lg text-sm flex items-start gap-2 ${
            status === 'success'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {status === 'error' && <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
          {status === 'success' && <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />}
          <span>{message}</span>
        </motion.div>
      )}

      {/* Privacy Note */}
      <p className="text-xs text-slate-500 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
}
