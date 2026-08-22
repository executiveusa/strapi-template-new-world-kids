"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"

import { Link } from "@/lib/navigation"

const donateAmounts = ["$25", "$50", "$100"]
const copy = {
  en: {
    eyebrow: "The first-year goal",
    title: "Help us start with 12 young people.",
    body: "The pilot program is intentionally small. Your support will help cover the practical things that make participation possible: project materials, transportation, mentors, equipment, and youth compensation when funding and the project allow for it. It also covers consistent follow-up with the student after the project ends. The goal is not to run as many activities as possible. It is to answer the question: can 12 youth from challenging situations reach their goals if given the right mentors, environment, and opportunities? These aren't always simple questions, but we believe they can, and we've seen it in the lives of our mentors, founders, and other youth along the way. If this resonates with you, we'd love to hear your thoughts — and if you want to help support our mission, all donations below go 100% to supporting our cause.",
    quote: "If you ever think you're too small to make a difference, try going to sleep with a mosquito in the room.",
    source: "West African Proverb",
  },
  es: {
    eyebrow: "La meta del primer año",
    title: "Ayúdanos a empezar con 12 jóvenes.",
    body: "El programa piloto es pequeño a propósito. Tu apoyo ayudará a cubrir las cosas prácticas que hacen posible la participación: materiales para proyectos, transporte, mentores, equipo y compensación juvenil cuando el financiamiento y el proyecto lo permitan. También cubre el seguimiento constante con el estudiante después de que el proyecto termina. La meta no es ofrecer la mayor cantidad posible de actividades. Es responder la pregunta: ¿pueden 12 jóvenes en situaciones difíciles alcanzar sus metas si reciben los mentores, el entorno y las oportunidades adecuadas? No son preguntas siempre sencillas, pero creemos que sí, y lo hemos visto en la vida de nuestros mentores, fundadores y otros jóvenes en el camino. Si esto resuena contigo, nos encantaría conocer tu opinión, y si quieres apoyar nuestra misión, todas las donaciones a continuación van 100% a nuestra causa.",
    quote: "Si alguna vez piensas que eres demasiado pequeño para hacer una diferencia, intenta dormir con un mosquito en la habitación.",
    source: "Proverbio de África Occidental",
  },
} as const

export function SupportSection() {
  const locale = useLocale()
  const t = locale === "es" ? copy.es : copy.en

  return (
    <section id="support" className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 py-20 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs tracking-[0.24em] text-[var(--color-eyebrow)] uppercase">{t.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight font-semibold text-[var(--color-text-primary)] md:text-6xl">{t.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">{t.body}</p>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {donateAmounts.map((amount, i) => (
            <motion.div key={amount} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="/donate" locale={locale} className="inline-flex min-w-28 items-center justify-center rounded-full border border-[var(--color-accent-coral)] bg-[var(--color-accent-coral)] px-8 py-4 font-serif text-2xl font-semibold text-white transition-colors hover:bg-[var(--color-accent-coral-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-coral)]">{amount}</Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-4 text-sm text-[var(--color-text-muted)]">
          <a href="https://www.instagram.com/proyectoindigoazul/" target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-text-primary)]">Instagram</a>
          <a href="https://www.facebook.com/nwkidsorg" target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-text-primary)]">Facebook</a>
          <a href="https://www.linkedin.com/company/nwkids/" target="_blank" rel="noreferrer" className="transition hover:text-[var(--color-text-primary)]">LinkedIn</a>
        </div>
        <div className="mt-14 text-center">
          <blockquote className="mx-auto max-w-3xl font-serif text-3xl leading-tight text-[var(--color-text-primary)] italic md:text-5xl">“{t.quote}”</blockquote>
          <p className="mt-4 text-xs tracking-[0.2em] text-[var(--color-text-muted)] uppercase">{t.source}</p>
        </div>
      </div>
    </section>
  )
}
