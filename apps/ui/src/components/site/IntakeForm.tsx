"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

type Props = {
  readonly action: (formData: FormData) => void | Promise<void>
  readonly storageKey: string
  readonly className?: string
  readonly children: React.ReactNode
}

// Rendered by each page inside its success message, which replaces the form: removes the saved answers.
export function ClearSavedForm({
  storageKey,
}: {
  readonly storageKey: string
}) {
  useEffect(() => {
    try {
      sessionStorage.removeItem(storageKey)
    } catch {
      // storage unavailable: nothing was saved
    }
  }, [storageKey])

  return null
}

// Keeps what the visitor typed if the server rejects a submission. Server
// actions redirect on error, which would otherwise wipe long answers. Values
// live in sessionStorage (this tab only) and are cleared on success.
export function IntakeForm({ action, storageKey, className, children }: Props) {
  const ref = useRef<HTMLFormElement>(null)
  const params = useSearchParams()
  const failed = params.get("error") === "1"
  const done = params.get("submitted") === "1"

  useEffect(() => {
    try {
      if (done) {
        sessionStorage.removeItem(storageKey)

        return
      }
      const form = ref.current
      if (!failed || !form) return
      const saved = JSON.parse(
        sessionStorage.getItem(storageKey) ?? "{}"
      ) as Record<string, string | boolean>
      for (const element of Array.from(form.elements)) {
        if (
          !(
            element instanceof HTMLInputElement ||
            element instanceof HTMLSelectElement ||
            element instanceof HTMLTextAreaElement
          )
        )
          continue
        if (
          !element.name ||
          !(element.name in saved) ||
          element.type === "hidden"
        )
          continue
        if (element instanceof HTMLInputElement && element.type === "checkbox")
          element.checked = saved[element.name] === true
        else element.value = String(saved[element.name])
      }
    } catch {
      // storage unavailable: form simply starts empty
    }
    if (failed) document.getElementById("form-status")?.focus()
  }, [done, failed, storageKey])

  return (
    <form
      ref={ref}
      action={action}
      className={className}
      onSubmit={(event) => {
        try {
          const saved: Record<string, string | boolean> = {}
          for (const element of Array.from(event.currentTarget.elements)) {
            if (
              !(
                element instanceof HTMLInputElement ||
                element instanceof HTMLSelectElement ||
                element instanceof HTMLTextAreaElement
              )
            )
              continue
            if (
              !element.name ||
              element.type === "hidden" ||
              element.name === "company_website"
            )
              continue
            saved[element.name] =
              element instanceof HTMLInputElement && element.type === "checkbox"
                ? element.checked
                : element.value
          }
          sessionStorage.setItem(storageKey, JSON.stringify(saved))
        } catch {
          // ignore
        }
      }}
    >
      {children}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Leave this field empty
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
    </form>
  )
}
