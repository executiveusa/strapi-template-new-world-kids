'use client'

import { Loader2Icon, SendIcon } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  citations?: string[]
}

interface PostArticleChatProps {
  title: string
  content: string
  locale: string
  url: string
}

export function PostArticleChat({
  title,
  content,
  locale,
  url,
}: PostArticleChatProps) {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = question.trim()
    if (!trimmed || isLoading) {
      return
    }

    setMessages((previous) => [...previous, { role: 'user', content: trimmed }])
    setQuestion('')
    setIsLoading(true)

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_HERMES_PUBLIC_URL || 'http://localhost:4010'
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/chat/article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          locale,
          url,
          question: trimmed,
        }),
      })

      if (!response.ok) {
        throw new Error('Chat request failed.')
      }

      const payload = (await response.json()) as {
        answer: string
        citations?: string[]
      }

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: payload.answer,
          citations: payload.citations,
        },
      ])
    } catch (error) {
      const fallback =
        locale === 'es'
          ? 'No pude responder desde el servicio en este momento. Intenta de nuevo en un momento.'
          : 'I could not answer from the service just now. Please try again in a moment.'

      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: fallback,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-lg font-semibold text-foreground">
          {locale === 'es' ? 'Pregunta a Hermes sobre este articulo' : 'Ask Hermes about this article'}
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          {locale === 'es'
            ? 'Las respuestas se limitan al contenido de esta nota.'
            : 'Answers are scoped to this article only.'}
        </p>
      </div>

      <div className="space-y-3">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className="rounded-sm border border-border bg-card p-4"
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {message.role === 'user'
                ? locale === 'es'
                  ? 'Tu pregunta'
                  : 'Your question'
                : 'Hermes'}
            </div>
            <div className="text-sm leading-7 text-foreground">{message.content}</div>
            {message.citations && message.citations.length > 0 && (
              <div className="mt-3 space-y-2 border-t border-border pt-3">
                {message.citations.map((citation) => (
                  <div key={citation} className="text-xs leading-6 text-muted-foreground">
                    {citation}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={
            locale === 'es'
              ? 'Haz una pregunta concreta sobre este articulo'
              : 'Ask a specific question about this article'
          }
          className="min-h-28 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
        />
        <Button type="submit" disabled={isLoading || question.trim().length === 0} className="gap-2">
          {isLoading ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <SendIcon className="size-4" />
          )}
          <span>{locale === 'es' ? 'Preguntar' : 'Ask'}</span>
        </Button>
      </form>
    </div>
  )
}
