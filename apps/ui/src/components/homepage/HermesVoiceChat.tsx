"use client"

import { Mic, MicOff, Send, Loader2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
  ts: number
}

export function HermesVoiceChat() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      role: "assistant",
      content:
        "Hermes ops interface active. Ask me about agent status, grants, mission ledger, or program operations.",
      ts: Date.now(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Web Speech API voice input
  function toggleVoice() {
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)

      return
    }

    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser. Use Chrome or Edge.")

      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = "en-US"

    recognition.continuous = false

    recognition.interimResults = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript as string
      setInput(transcript)
      setListening(false)
    }

    recognition.addEventListener("error", () => setListening(false))

    recognition.addEventListener("end", () => setListening(false))

    recognitionRef.current = recognition

    recognition.start()
    setListening(true)
  }

  async function send(text: string) {
    if (!text.trim() || loading) return

    const userMsg: Message = {
      role: "user",
      content: text.trim(),
      ts: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          system:
            "You are Hermes, the operations agent for New World Kids nonprofit. " +
            "You help the founder (Bambu) with: grant tracking, mission operations, " +
            "program status for Culture Shock and Proyecto Indigo Azul, agent action ledger, " +
            "and organizational decisions. Be concise, direct, and mission-focused. " +
            "This is a private ops interface — speak frankly.",
        }),
      })

      const data = (await res.json()) as {
        content?: { text: string }[]
        message?: string
      }
      const content =
        data?.content?.[0]?.text ??
        data?.message ??
        "No response from Hermes. Check API connection."

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content, ts: Date.now() },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection error. Check ANTHROPIC_API_KEY and /api/chat route.",
          ts: Date.now(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[480px] flex-col">
      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        {messages.map((msg) => (
          <div
            key={msg.ts}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7",
                msg.role === "user"
                  ? "bg-[var(--color-forest)] text-[var(--color-accent-gold)]"
                  : "border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] text-[var(--color-text-muted)]",
              ].join(" ")}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-[var(--color-accent-gold)]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[var(--color-border-subtle)] p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoice}
            className={[
              "shrink-0 rounded-full p-2.5 transition",
              listening
                ? "bg-[var(--color-accent-coral)] text-[var(--color-text-primary)]"
                : "border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)]",
            ].join(" ")}
            title={listening ? "Stop listening" : "Start voice input"}
          >
            {listening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && void send(input)
            }
            placeholder={listening ? "Listening…" : "Ask Hermes anything…"}
            className="flex-1 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent-gold)]/40 focus:outline-none"
          />

          <button
            onClick={() => void send(input)}
            disabled={!input.trim() || loading}
            className="shrink-0 rounded-full bg-[var(--color-accent-gold)] p-2.5 text-[var(--color-bg)] transition hover:bg-[var(--color-accent-gold)] disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        {listening && (
          <p className="mt-2 text-center text-xs text-[var(--color-accent-coral)]">
            Listening — speak now
          </p>
        )}
      </div>
    </div>
  )
}
