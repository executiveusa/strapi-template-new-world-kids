"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

const COUNTDOWN_SVG = (
  <svg
    width="800"
    height="800"
    viewBox="0 0 800 800"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="800" height="800" fill="#0d0b08" />
    <circle
      cx="400"
      cy="400"
      r="320"
      stroke="#1c1a17"
      strokeWidth="40"
      fill="none"
    />
    <circle
      cx="400"
      cy="400"
      r="280"
      stroke="#2a261f"
      strokeWidth="8"
      fill="none"
      opacity="0.6"
    />
    <circle
      cx="400"
      cy="400"
      r="250"
      stroke="#00e5ff"
      strokeWidth="3"
      fill="none"
      opacity="0.4"
    />
    <line
      x1="400"
      y1="120"
      x2="400"
      y2="680"
      stroke="#2a261f"
      strokeWidth="2"
    />
    <line
      x1="120"
      y1="400"
      x2="680"
      y2="400"
      stroke="#2a261f"
      strokeWidth="2"
    />
    <text
      x="400"
      y="430"
      textAnchor="middle"
      fontFamily="Georgia, serif"
      fontSize="140"
      fill="#c6a15b"
      letterSpacing="6"
    >
      006
    </text>
    <text
      x="400"
      y="500"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontSize="22"
      fill="#00e5ff"
      opacity="0.8"
      letterSpacing="4"
    >
      AGENT
    </text>
    <text
      x="400"
      y="620"
      textAnchor="middle"
      fontFamily="Georgia, serif"
      fontSize="48"
      fill="#c6a15b"
      letterSpacing="3"
    >
      MUSTANG MAXX
    </text>
  </svg>
)

function playEngineCue() {
  if (typeof window === "undefined") return
  const AudioContextCtor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext
  if (!AudioContextCtor) return

  const ctx = new AudioContextCtor()
  const master = ctx.createGain()
  master.gain.value = 0.0001
  master.connect(ctx.destination)

  const rev = ctx.createOscillator()
  rev.type = "sawtooth"
  rev.frequency.setValueAtTime(54, ctx.currentTime)
  rev.frequency.exponentialRampToValueAtTime(126, ctx.currentTime + 0.18)
  rev.frequency.exponentialRampToValueAtTime(92, ctx.currentTime + 0.44)
  rev.frequency.exponentialRampToValueAtTime(68, ctx.currentTime + 0.88)

  const drive = ctx.createBiquadFilter()
  drive.type = "lowpass"
  drive.frequency.setValueAtTime(920, ctx.currentTime)
  drive.Q.value = 8

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.0001, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.23, ctx.currentTime + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.22)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.96)

  rev.connect(drive)
  drive.connect(gain)
  gain.connect(master)

  const hum = ctx.createOscillator()
  hum.type = "triangle"
  hum.frequency.setValueAtTime(28, ctx.currentTime)
  hum.frequency.exponentialRampToValueAtTime(34, ctx.currentTime + 0.28)
  hum.frequency.exponentialRampToValueAtTime(22, ctx.currentTime + 0.88)

  const humGain = ctx.createGain()
  humGain.gain.setValueAtTime(0.0001, ctx.currentTime)
  humGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1)
  humGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.05)

  hum.connect(humGain)
  humGain.connect(master)

  rev.start()
  hum.start()
  rev.stop(ctx.currentTime + 1.1)
  hum.stop(ctx.currentTime + 1.15)

  setTimeout(() => {
    ctx.close().catch(() => {})
  }, 1400)
}

export function CinematicEntry() {
  const [phase, setPhase] = useState<
    "booting" | "playing" | "entering" | "done"
  >("booting")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const startedRef = useRef(false)
  const originalOverflowRef = useRef("")

  const startTheme = useMemo(
    () => async () => {
      const audio = audioRef.current
      if (!audio || startedRef.current) return

      startedRef.current = true
      audio.volume = 0.78

      try {
        await audio.play()
        setPhase("playing")
      } catch {
        startedRef.current = false
      }
    },
    []
  )

  useEffect(() => {
    if (!originalOverflowRef.current) {
      originalOverflowRef.current = document.body.style.overflow
    }

    document.body.style.overflow =
      phase === "done" ? originalOverflowRef.current : "hidden"

    const attemptStart = () => {
      void startTheme()
      window.removeEventListener("pointerdown", attemptStart)
      window.removeEventListener("keydown", attemptStart)
      window.removeEventListener("touchstart", attemptStart)
    }

    window.addEventListener("pointerdown", attemptStart, { passive: true })
    window.addEventListener("keydown", attemptStart)
    window.addEventListener("touchstart", attemptStart, { passive: true })

    return () => {
      document.body.style.overflow = originalOverflowRef.current
      window.removeEventListener("pointerdown", attemptStart)
      window.removeEventListener("keydown", attemptStart)
      window.removeEventListener("touchstart", attemptStart)
    }
  }, [phase, startTheme])

  const enter = async () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }

    setPhase("entering")
    playEngineCue()

    window.setTimeout(() => {
      setPhase("done")
      document
        .getElementById("journey-start")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 1250)
  }

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={phase === "entering" ? { opacity: 0 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#050905]"
        >
          <audio
            ref={audioRef}
            src="/audio/beautiful-people.mp3"
            preload="auto"
            loop
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),transparent_32%),linear-gradient(180deg,rgba(5,9,5,0.88),rgba(5,9,5,0.98))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,229,255,0.55),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(198,161,91,0.55),transparent)]" />

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-full max-w-[420px] drop-shadow-[0_0_40px_rgba(0,229,255,0.14)]"
            >
              {COUNTDOWN_SVG}
            </motion.div>

            <p className="mt-10 text-[11px] tracking-[0.42em] text-[#8fefff] uppercase">
              Classified opening sequence
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Agent MAXX
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
              The theme plays, the door waits, and the mission begins only when
              you decide to enter.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[10px] tracking-[0.28em] text-white/48 uppercase">
              <span>006</span>
              <span className="h-px w-12 bg-white/18" />
              <span>Theme active</span>
              <span className="h-px w-12 bg-white/18" />
              <span>Scroll locked</span>
            </div>

            <button
              type="button"
              onClick={enter}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  void enter()
                }
              }}
              className="mt-10 inline-flex items-center justify-center rounded-full border border-[#c6a15b]/30 bg-[#c6a15b]/12 px-8 py-4 text-sm font-semibold tracking-[0.22em] text-[#f3d8a1] transition hover:border-[#c6a15b]/50 hover:bg-[#c6a15b]/18"
            >
              ENTER
            </button>

            <p className="mt-4 text-[11px] tracking-[0.24em] text-white/42 uppercase">
              Access remains locked until the signal is acknowledged
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === "entering" ? { opacity: 1 } : { opacity: 0 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.9)_100%)]"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.span
                initial={{ letterSpacing: "0.6em", opacity: 0, y: 16 }}
                animate={{ letterSpacing: "0.38em", opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-sm tracking-[0.38em] text-[#8fefff]"
              >
                ACCESS GRANTED
              </motion.span>
              <motion.div
                initial={{ scaleX: 0.1, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-px w-[260px] bg-[linear-gradient(90deg,transparent,rgba(0,229,255,0.85),rgba(198,161,91,0.85),transparent)]"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
