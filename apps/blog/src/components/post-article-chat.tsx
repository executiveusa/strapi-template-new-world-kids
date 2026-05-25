"use client"

import { Loader2Icon, SendIcon } from "lucide-react"
import { type FormEvent, useState } from "react"

import { type A2UIDocument, A2UIRenderer } from "@/components/a2ui-renderer"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  citations?: string[]
  ui?: A2UIDocument
}

interface PostArticleChatProps {
  title: string
  content: string
  locale: string
  url: string
  tags?: string[]
}

export function PostArticleChat({ title, content, locale, url, tags }: PostArticleChatProps) {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = question.trim()
    if (trimmed.length === 0 || isLoading) {
      return
    }

    setMessages((previous) => [...previous, { role: "user", content: trimmed }])
    setQuestion("")
    setIsLoading(true)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_HERMES_PUBLIC_URL ?? "http://localhost:4010"
      const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/chat/article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          locale,
          url,
          tags,
          question: trimmed,
        }),
      })

      if (!response.ok) {
        throw new Error("Chat request failed.")
      }

      const payload = (await response.json()) as {
        answer: string
        citations?: string[]
        ui?: A2UIDocument
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: payload.answer,
          citations: payload.citations,
          ui: payload.ui,
        },
      ])
    } catch {
      const fallback =
        locale === "es"
          ? "No pude responder desde el servicio en este momento. Intenta de nuevo en un momento."
          : "I could not answer from the service just now. Please try again in a moment."

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
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
        <div className="text-foreground text-lg font-semibold">
          {locale === "es" ? "Pregunta a Hermes sobre este articulo" : "Ask Hermes about this article"}
        </div>
        <p className="text-muted-foreground text-sm leading-7">
          {locale === "es"
            ? "Las respuestas se limitan al contenido de esta nota."
            : "Answers are scoped to this article only."}
        </p>
      </div>

      <div className="space-y-3">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className="border-border bg-card rounded-sm border p-4">
            <div className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
              {message.role === "user" ? (locale === "es" ? "Tu pregunta" : "Your question") : "Hermes"}
            </div>
            <div className="text-foreground text-sm leading-7">{message.content}</div>
            {message.ui && (
              <div className="mt-4">
                <A2UIRenderer document={message.ui} />
              </div>
            )}
            {message.citations && message.citations.length > 0 && !message.ui && (
              <div className="border-border mt-3 space-y-2 border-t pt-3">
                {message.citations.map((citation) => (
                  <div key={citation} className="text-muted-foreground text-xs leading-6">
                    {citation}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          void handleSubmit(event)
        }}
        className="space-y-3"
      >
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={
            locale === "es"
              ? "Haz una pregunta concreta sobre este articulo"
              : "Ask a specific question about this article"
          }
          className="border-border bg-background placeholder:text-muted-foreground/60 focus:border-primary min-h-28 w-full rounded-sm border px-4 py-3 text-sm transition-colors outline-none"
        />
        <Button type="submit" disabled={isLoading || question.trim().length === 0} className="gap-2">
          {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : <SendIcon className="size-4" />}
          <span>{locale === "es" ? "Preguntar" : "Ask"}</span>
        </Button>
      </form>
    </div>
  )
}
