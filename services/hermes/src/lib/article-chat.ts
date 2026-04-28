type ArticleChatRequest = {
  title: string
  url?: string
  question: string
  content: string
  locale?: string
  tags?: string[]
}

type ArticleChatResponse = {
  answer: string
  citations: string[]
  mode: 'gateway' | 'local'
}

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'how',
  'in',
  'is',
  'it',
  'of',
  'on',
  'or',
  'that',
  'the',
  'this',
  'to',
  'what',
  'when',
  'where',
  'which',
  'who',
  'why',
  'with',
  'you',
])

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token))
}

function splitIntoPassages(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter((part) => part.length > 40)
}

function rankPassages(question: string, content: string): string[] {
  const keywords = tokenize(question)
  const passages = splitIntoPassages(content)

  return passages
    .map((passage, index) => {
      const lowerPassage = passage.toLowerCase()
      const score = keywords.reduce((total, keyword) => {
        return total + (lowerPassage.includes(keyword) ? 1 : 0)
      }, 0)

      return { passage, index, score }
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      if (right.score === left.score) {
        return left.index - right.index
      }

      return right.score - left.score
    })
    .slice(0, 3)
    .sort((left, right) => left.index - right.index)
    .map((item) => item.passage)
}

async function callGateway(
  request: ArticleChatRequest,
  passages: string[],
  env: NodeJS.ProcessEnv
): Promise<string | null> {
  const baseUrl = env.SYNTHIA_GATEWAY_URL
  if (!baseUrl) {
    return null
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(env.SYNTHIA_GATEWAY_API_KEY
          ? { Authorization: `Bearer ${env.SYNTHIA_GATEWAY_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({
        model: env.SYNTHIA_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content:
              'Answer strictly from the supplied article context. If the answer is not present, say that clearly. Do not invent facts.',
          },
          {
            role: 'user',
            content: [
              `Article title: ${request.title}`,
              request.url ? `Article URL: ${request.url}` : '',
              `Question: ${request.question}`,
              'Context:',
              passages.join('\n\n'),
            ]
              .filter(Boolean)
              .join('\n'),
          },
        ],
      }),
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string
        }
      }>
    }

    return payload.choices?.[0]?.message?.content?.trim() || null
  } catch {
    return null
  }
}

export async function answerArticleQuestion(
  request: ArticleChatRequest,
  env: NodeJS.ProcessEnv
): Promise<ArticleChatResponse> {
  const passages = rankPassages(request.question, request.content)

  if (passages.length === 0) {
    return {
      answer:
        request.locale === 'es'
          ? 'No veo suficiente informacion en este articulo para responder esa pregunta sin inventar.'
          : 'I do not see enough information in this article to answer that without making something up.',
      citations: [],
      mode: 'local',
    }
  }

  const gatewayAnswer = await callGateway(request, passages, env)
  if (gatewayAnswer) {
    return {
      answer: gatewayAnswer,
      citations: passages,
      mode: 'gateway',
    }
  }

  const answerPrefix =
    request.locale === 'es'
      ? 'Segun este articulo, lo mas relevante es esto:'
      : 'Based on this article, the most relevant context is:'

  return {
    answer: `${answerPrefix} ${passages.join(' ')}`,
    citations: passages,
    mode: 'local',
  }
}
