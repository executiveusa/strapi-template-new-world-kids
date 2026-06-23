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
    <div className="flex h-[560px] flex-col">
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
                  ? "bg-[#c9a84c] text-[#060e08]"
                  : "border border-white/8 bg-white/5 text-white/80",
              ].join(" ")}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-[#c9a84c]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/8 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoice}
            className={[
              "shrink-0 rounded-full p-2.5 transition",
              listening
                ? "bg-[#c8400e] text-white"
                : "border border-white/10 text-white/40 hover:border-white/25 hover:text-white",
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
            className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#c9a84c]/40 focus:outline-none"
          />

          <button
            onClick={() => void send(input)}
            disabled={!input.trim() || loading}
            className="shrink-0 rounded-full bg-[#c9a84c] p-2.5 text-[#060e08] transition hover:bg-[#e0bc6a] disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        {listening && (
          <p className="mt-2 text-center text-xs text-[#c8400e]">
            Listening — speak now
          </p>
        )}
      </div>
    </div>
  )
}
