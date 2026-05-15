import {
  copyForLocale,
  getSupportRails,
  impactPillars,
  trustDocuments,
  type PillarSlug,
} from '../../../../packages/shared-data/site.ts'

type ArticleChatRequest = {
  title: string
  url?: string
  question: string
  content: string
  locale?: string
  tags?: string[]
}

export type A2UIAction = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export type A2UIBlock =
  | {
      id: string
      type: 'callout'
      title: string
      body: string
      tone?: 'default' | 'accent'
    }
  | {
      id: string
      type: 'pillars'
      title: string
      items: string[]
    }
  | {
      id: string
      type: 'citations'
      title: string
      items: string[]
    }
  | {
      id: string
      type: 'actions'
      title: string
      items: A2UIAction[]
    }

export type A2UIDocument = {
  version: '0.1'
  kind: 'article-assistant'
  blocks: A2UIBlock[]
}

type ArticleChatResponse = {
  answer: string
  citations: string[]
  mode: 'gateway' | 'local'
  ui: A2UIDocument
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

function inferPillars(request: ArticleChatRequest): PillarSlug[] {
  const haystack = `${request.title}\n${request.content}\n${(request.tags || []).join(' ')}`
    .toLowerCase()

  return impactPillars
    .filter((pillar) => {
      const titleEn = pillar.title.en.toLowerCase()
      const titleEs = pillar.title.es.toLowerCase()
      return haystack.includes(titleEn) || haystack.includes(titleEs)
    })
    .map((pillar) => pillar.slug)
}

function buildArticleUi(
  request: ArticleChatRequest,
  answer: string,
  passages: string[],
  env: NodeJS.ProcessEnv
): A2UIDocument {
  const locale = request.locale === 'es' ? 'es' : 'en'
  const rails = getSupportRails(env)
  const relatedPillars = inferPillars(request)
  const relatedTrustDoc = trustDocuments[0]

  const blocks: A2UIBlock[] = [
    {
      id: 'answer',
      type: 'callout',
      title:
        locale === 'es'
          ? 'Respuesta limitada a este articulo'
          : 'Answer scoped to this article',
      body: answer,
      tone: 'accent',
    },
  ]

  if (relatedPillars.length > 0) {
    blocks.push({
      id: 'pillars',
      type: 'pillars',
      title:
        locale === 'es'
          ? 'Pilares relacionados'
          : 'Related pillars',
      items: relatedPillars.map((slug) => {
        const pillar = impactPillars.find((item) => item.slug === slug)
        return pillar ? copyForLocale(locale, pillar.title) : slug
      }),
    })
  }

  if (passages.length > 0) {
    blocks.push({
      id: 'citations',
      type: 'citations',
      title:
        locale === 'es'
          ? 'Pasajes usados'
          : 'Passages used',
      items: passages,
    })
  }

  blocks.push({
    id: 'actions',
    type: 'actions',
    title:
      locale === 'es'
        ? 'Siguiente paso'
        : 'Next step',
    items: [
      {
        label: locale === 'es' ? 'Apoyar la mision' : 'Support the mission',
        href: rails.donorbox,
        variant: 'primary',
      },
      {
        label:
          locale === 'es'
            ? copyForLocale(locale, relatedTrustDoc.title)
            : copyForLocale(locale, relatedTrustDoc.title),
        href: relatedTrustDoc.href,
        variant: 'secondary',
      },
      {
        label: locale === 'es' ? 'Ver la bitacora' : 'Browse the journal',
        href: rails.blog,
        variant: 'secondary',
      },
    ],
  })

  return {
    version: '0.1',
    kind: 'article-assistant',
    blocks,
  }
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
      ui: buildArticleUi(
        request,
        request.locale === 'es'
          ? 'No veo suficiente informacion en este articulo para responder esa pregunta sin inventar.'
          : 'I do not see enough information in this article to answer that without making something up.',
        [],
        env
      ),
    }
  }

  const gatewayAnswer = await callGateway(request, passages, env)
  if (gatewayAnswer) {
    return {
      answer: gatewayAnswer,
      citations: passages,
      mode: 'gateway',
      ui: buildArticleUi(request, gatewayAnswer, passages, env),
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
    ui: buildArticleUi(
      request,
      `${answerPrefix} ${passages.join(' ')}`,
      passages,
      env
    ),
  }
}
