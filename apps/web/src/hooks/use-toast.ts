import { useState } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

/**
 * Provides state and an enqueue function for toast notifications.
 *
 * @returns An object with:
 * - `toasts`: an array of toast objects `{ id, message, type, duration? }`.
 * - `toast(message, type = 'info', duration = 3000)`: enqueues a toast with the given `message`, `type` (`'success' | 'error' | 'info' | 'warning'`), and optional `duration` in milliseconds; if `duration` is truthy the toast is removed after that many milliseconds.
 */
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    if (duration) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  };

  return { toasts, toast };
}

export const toast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
  console.log(`[${type.toUpperCase()}] ${message}`);
};