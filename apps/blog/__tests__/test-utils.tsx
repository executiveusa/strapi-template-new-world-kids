import { readFileSync } from "node:fs"
import path from "node:path"

import { ProgressProvider } from "@bprogress/next/app"
import { type RenderOptions, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"
import type { ReactElement, ReactNode } from "react"

const messagesEn = JSON.parse(readFileSync(path.join(process.cwd(), "messages/en.json"), "utf8")) as Record<
  string,
  unknown
>
const messagesEs = JSON.parse(readFileSync(path.join(process.cwd(), "messages/es.json"), "utf8")) as Record<
  string,
  unknown
>
const messages = {
  en: messagesEn,
  es: messagesEs,
}

interface AllTheProvidersProps {
  children: ReactNode
  locale?: "en" | "es"
}

function AllTheProviders({ children, locale = "en" }: AllTheProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="UTC">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <ProgressProvider>{children}</ProgressProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  locale?: "en" | "es"
}

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const { locale = "en", ...renderOptions } = options ?? {}
  const user = userEvent.setup()

  return {
    user,
    ...render(ui, {
      wrapper: ({ children }) => <AllTheProviders locale={locale}>{children}</AllTheProviders>,
      ...renderOptions,
    }),
  }
}

export * from "@testing-library/react"
export { customRender as render }
