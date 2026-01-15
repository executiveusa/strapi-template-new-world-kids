"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { MoveRight } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { AppField } from "@/components/forms/AppField"
import { AppForm } from "@/components/forms/AppForm"
import { Button } from "@/components/ui/button"

export function NewsletterForm() {
  const [submissionStatus, setSubmissionStatus] = useState<{
    status: "success" | "error" | null
    message: string
  }>({ status: null, message: "" })

  const form = useForm<z.infer<FormSchemaType>>({
    resolver: zodResolver(NewsletterFormSchema),
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: { email: "" },
  })

  async function onSubmit(values: z.infer<FormSchemaType>) {
    setSubmissionStatus({ status: null, message: "" })

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, source: "homepage" }),
      })

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; error?: string }
        | null

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.error || "Unable to subscribe right now. Please try again."
        )
      }

      setSubmissionStatus({
        status: "success",
        message: data.message || "Thanks for subscribing!",
      })
      form.reset()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      setSubmissionStatus({ status: "error", message })
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <div className="flex w-full flex-col">
      <AppForm
        form={form}
        onSubmit={onSubmit}
        id={newsletterForm}
        className="w-full"
        disabled={isSubmitting}
      >
        <div className="relative">
          <AppField
            name="email"
            type="text"
            autoComplete="email"
            required
            fieldClassName="h-14 bg-white"
            aria-label="email"
          />
          <Button
            type="submit"
            className="absolute top-1/2 right-3 -translate-y-1/2 md:w-fit"
            form={newsletterForm}
            aria-label="Submit form"
            disabled={isSubmitting}
          >
            <MoveRight className="size-4" />
          </Button>
        </div>
      </AppForm>
      {submissionStatus.status && (
        <p
          className={
            submissionStatus.status === "success"
              ? "mt-3 text-sm text-green-600"
              : "mt-3 text-sm text-red-600"
          }
          role="status"
          aria-live="polite"
        >
          {submissionStatus.message}
        </p>
      )}
    </div>
  )
}

const NewsletterFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
})

type FormSchemaType = typeof NewsletterFormSchema

export const newsletterForm = "newsletterForm"
