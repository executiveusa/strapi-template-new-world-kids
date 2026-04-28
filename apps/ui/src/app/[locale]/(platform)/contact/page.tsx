import type { Metadata } from "next"
import type { Locale } from "next-intl"

import PageHero from "@/components/site/PageHero"
import { socialLinks } from "@/content/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact New World Kids through its public channels and social footprint.",
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = (await params) as { locale: Locale }

  return (
    <main className="bg-[#08110D]">
      <PageHero
        eyebrow={locale === "es" ? "Contacto" : "Contact"}
        title={
          locale === "es"
            ? "Hablemos de grants, alianzas y trabajo en el terreno."
            : "Let's talk grants, partnerships, and boots-on-the-ground work."
        }
        description={
          locale === "es"
            ? "Mientras consolidamos la operacion comercial y editorial, mantenemos nuestros canales publicos al frente para facilitar alianzas, colaboraciones y revisiones."
            : "As the commercial and editorial stack comes online, we keep our public channels up front so partnerships, collaborations, and due-diligence requests stay easy to start."
        }
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-white/10 bg-white/[0.02] p-6 text-sm text-[#E8DEC7]/64 transition-colors hover:border-[#C9A84C]/30 hover:text-white"
            >
              <div className="font-medium text-white">{link.label}</div>
              <div className="mt-2 break-all">{link.href}</div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
