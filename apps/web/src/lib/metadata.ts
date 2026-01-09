import { Metadata } from 'next';

/**
 * Provide a Metadata object with default title and description merged with any provided overrides.
 *
 * @param overrides - Optional partial Metadata whose properties override defaults. Defaults: title "New World Kids", description "Welcome to New World Kids".
 * @returns A Metadata object whose `title` and `description` come from `overrides` when present or from the defaults, and which includes any other properties from `overrides`.
 */
export function getDefaultMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: overrides?.title || 'New World Kids',
    description: overrides?.description || 'Welcome to New World Kids',
    ...overrides,
  };
}