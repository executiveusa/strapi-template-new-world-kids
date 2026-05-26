import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/tests': new URL('./__tests__', import.meta.url).pathname,
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'jsdom',
    clearMocks: true,
    include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
    setupFiles: [
      '__tests__/setup.ts',
      '__tests__/mocks/next-navigation.ts',
      '__tests__/mocks/navigation.tsx',
      '__tests__/mocks/next-image.tsx',
      '__tests__/mocks/next-mdx-remote.tsx',
      '__tests__/mocks/mdx-editor.tsx',
      '__tests__/mocks/sandpack.tsx',
    ],
    coverage: {
      enabled: false,
    },
  },
})
