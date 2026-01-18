import { describe, expect, it } from 'vitest';
import { routeToAI } from '../../index';

describe('routeToAI routing decisions', () => {
  it('routes to explicit model when provided', async () => {
    const result = await routeToAI({
      prompt: 'Write a short poem about the sea.',
      model: 'claude',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.model).toBe('claude');
      expect(result.routedBy).toBe('explicit-model');
    }
  });

  it('routes code-related prompts to OpenAI', async () => {
    const result = await routeToAI({
      prompt: 'Help me debug this TypeScript error in my code.',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.model).toBe('openai');
      expect(result.routedBy).toBe('code-keywords');
    }
  });

  it('routes creative prompts to Claude', async () => {
    const result = await routeToAI({
      prompt: 'Write a creative bedtime story about space explorers.',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.model).toBe('claude');
      expect(result.routedBy).toBe('creative-keywords');
    }
  });

  it('routes short prompts to Gemini', async () => {
    const result = await routeToAI({
      prompt: 'Summarize this quickly.',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.model).toBe('gemini');
      expect(result.routedBy).toBe('quick-or-short');
    }
  });

  it('falls back when the selected model fails', async () => {
    const result = await routeToAI({
      prompt: 'Debug this code. [[force_error:openai]]',
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.model).toBe('claude');
      expect(result.fallbacks).toEqual(['openai']);
    }
  });

  it('returns error when all providers fail', async () => {
    const result = await routeToAI({
      prompt:
        'Analyze failure [[force_error:openai]] [[force_error:claude]] [[force_error:gemini]]',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.attempted).toEqual(['openai', 'claude', 'gemini']);
      expect(result.error).toBe('All providers failed to respond.');
    }
  });
});
