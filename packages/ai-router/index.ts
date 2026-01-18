// AI Router - Multi-model orchestration
// Routes requests to appropriate AI provider (OpenAI, Claude, Gemini)

type ModelProvider = 'openai' | 'claude' | 'gemini';

export type RouteToAIRequest = {
  prompt: string;
  model?: string;
};

export type RouteToAIResult =
  | {
      ok: true;
      model: ModelProvider;
      response: string;
      routedBy: string;
      fallbacks: ModelProvider[];
    }
  | {
      ok: false;
      error: string;
      attempted: ModelProvider[];
      errors: Record<ModelProvider, string>;
    };

const MODEL_PRIORITY: ModelProvider[] = ['openai', 'claude', 'gemini'];

const keywordSets = {
  code: ['code', 'bug', 'debug', 'stack trace', 'typescript', 'javascript', 'python'],
  creative: ['story', 'poem', 'creative', 'narrative', 'roleplay', 'imagine'],
  quick: ['summarize', 'summary', 'translate', 'tl;dr', 'quick', 'short'],
  analysis: ['analyze', 'analysis', 'strategy', 'plan', 'reasoning'],
};

const forcedFailurePattern = /\[\[force_error:(openai|claude|gemini)\]\]/gi;

function normalizePrompt(prompt: string) {
  return prompt.replace(forcedFailurePattern, '').trim();
}

function containsKeyword(prompt: string, keywords: string[]) {
  const lowerPrompt = prompt.toLowerCase();
  return keywords.some((keyword) => lowerPrompt.includes(keyword));
}

function isSupportedModel(model?: string): model is ModelProvider {
  if (!model) {
    return false;
  }
  return MODEL_PRIORITY.includes(model.toLowerCase() as ModelProvider);
}

function decideModel(request: RouteToAIRequest): { model: ModelProvider; reason: string } {
  const prompt = normalizePrompt(request.prompt);
  const explicitModel = request.model?.toLowerCase();

  if (explicitModel && isSupportedModel(explicitModel)) {
    return { model: explicitModel, reason: 'explicit-model' };
  }

  if (prompt.length >= 500 || containsKeyword(prompt, keywordSets.analysis)) {
    return { model: 'openai', reason: 'analysis-or-length' };
  }

  if (containsKeyword(prompt, keywordSets.code)) {
    return { model: 'openai', reason: 'code-keywords' };
  }

  if (containsKeyword(prompt, keywordSets.creative)) {
    return { model: 'claude', reason: 'creative-keywords' };
  }

  if (prompt.length <= 80 || containsKeyword(prompt, keywordSets.quick)) {
    return { model: 'gemini', reason: 'quick-or-short' };
  }

  return { model: 'openai', reason: 'default' };
}

function getFallbackOrder(primaryModel: ModelProvider): ModelProvider[] {
  return [primaryModel, ...MODEL_PRIORITY.filter((model) => model !== primaryModel)];
}

function shouldForceFailure(prompt: string, model: ModelProvider) {
  return new RegExp(`\\[\\[force_error:${model}\\]\\]`, 'i').test(prompt);
}

async function callProvider(model: ModelProvider, prompt: string) {
  if (shouldForceFailure(prompt, model)) {
    throw new Error(`Forced failure for ${model}`);
  }

  const cleanPrompt = normalizePrompt(prompt);
  return `${model.toUpperCase()} response: ${cleanPrompt}`;
}

export async function routeToAI(request: RouteToAIRequest): Promise<RouteToAIResult> {
  const prompt = request.prompt?.trim();

  if (!prompt) {
    return {
      ok: false,
      error: 'Prompt is required for routing.',
      attempted: [],
      errors: {
        openai: 'Prompt missing',
        claude: 'Prompt missing',
        gemini: 'Prompt missing',
      },
    };
  }

  const decision = decideModel(request);
  const order = getFallbackOrder(decision.model);
  const errors: Record<ModelProvider, string> = {
    openai: '',
    claude: '',
    gemini: '',
  };
  const attempted: ModelProvider[] = [];

  for (const model of order) {
    attempted.push(model);

    try {
      const response = await callProvider(model, prompt);
      const fallbacks = attempted.slice(0, -1);

      return {
        ok: true,
        model,
        response,
        routedBy: decision.reason,
        fallbacks,
      };
    } catch (error) {
      errors[model] = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  return {
    ok: false,
    error: 'All providers failed to respond.',
    attempted,
    errors,
  };
}

export const aiRouter = {
  routeToAI,
};

export const __testing__ = {
  decideModel,
  getFallbackOrder,
};
