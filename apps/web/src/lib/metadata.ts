import { Metadata } from 'next';

export function getDefaultMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: overrides?.title || 'New World Kids',
    description: overrides?.description || 'Welcome to New World Kids',
    ...overrides,
  };
}
