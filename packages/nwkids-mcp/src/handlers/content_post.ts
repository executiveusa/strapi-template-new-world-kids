import { ContentPostInput } from "../tools/schemas.js"
import { adminClient } from "../lib/database.js"

export interface ContentDraft {
  platform: string
  content_en: string
  content_es: string | null
  character_count: number
  scheduled_for: string | null
  status: string
}

/**
 * Draft bilingual content for NWKids social channels.
 * Uses the NWKids brand voice: warm, direct, specific, evidence-based.
 * Always bilingual (English + Spanish) by default.
 */
export async function handleContentPost(
  input: ContentPostInput,
): Promise<{ draft: ContentDraft; next_steps: string }> {
  const { topic, platform, include_spanish, scheduled_for } = input

  // Log the content draft request to agent_actions
  await adminClient.from("agent_actions").insert({
    agent_id: "content-engine",
    action_type: "content_draft",
    description: `Content draft: ${topic} for ${platform}`,
    payload: input,
    status: "completed",
  })

  // Generate content following NWKids brand guidelines
  const contentEn = generateContentEnglish(topic, platform)
  const contentEs = include_spanish ? generateContentSpanish(topic, platform) : null

  const draft: ContentDraft = {
    platform,
    content_en: contentEn,
    content_es: contentEs,
    character_count: contentEn.length + (contentEs ? contentEs.length : 0),
    scheduled_for: scheduled_for || null,
    status: "draft",
  }

  const nextSteps = `Content draft created for ${platform}.

Next steps:
1. Review draft for accuracy and tone
2. Add images/media if needed (food forest photos, student work, site progress)
3. Schedule in Postiz or post directly to ${platform}
4. Log post to agent_actions table with action_type: 'content_posted'

Brand voice checklist:
✓ Warm and direct tone
✓ Specific numbers and evidence
✓ No corporate filler ("innovative", "leveraging", etc.)
✓ Bilingual (English + Spanish)
✓ Focused on real outcomes, not promises`

  return {
    draft,
    next_steps: nextSteps,
  }
}

function generateContentEnglish(topic: string, platform: string): string {
  // Simple template-based generation
  // In production, this could use Claude API or LLM for better content
  const templates: Record<string, string> = {
    "program update": `200+ plant varieties growing in Paso de Guayabo today.

The food forest is alive. Students are learning syntropic agriculture, water systems, and natural building — not in a classroom, but on 1.5 acres of working land.

This is what happens when you combine food, education, and real responsibility.

---
🌱 New World Kids
Food, water, energy, shelter — taught through hands-on work.
Learn more: [link in bio]`,

    "impact stat": `47 youth served in the Forest Leadership Camp this summer. 94% completion rate.

No theory. No filler. Just 6 weeks of nature-based education and leadership training for underserved youth ages 10-16 in South Seattle.

When programs keep their promises, young people show up.

---
🌲 New World Kids
Building self-sufficient, bilingual, capable humans.
[link in bio]`,

    "behind-the-scenes": `Today on the site: planting, building, learning.

Students practice what most schools only talk about — how to grow food, capture water, and work as a team under real conditions.

The school-in-public model means every visitor can see the work in progress.

---
🌍 New World Kids
Real skills. Real land. Real outcomes.
[link in bio]`,
  }

  return templates[topic] || `Content about: ${topic}\n\nDraft pending — please provide more specific topic details for better content generation.`
}

function generateContentSpanish(topic: string, platform: string): string {
  const templates: Record<string, string> = {
    "program update": `Más de 200 variedades de plantas creciendo en Paso de Guayabo hoy.

El bosque de alimentos está vivo. Los estudiantes aprenden agricultura sintrónica, sistemas de agua y construcción natural — no en un salón, sino en 1.5 acres de tierra en producción.

Esto es lo que sucede cuando combinas comida, educación y responsabilidad real.

---
🌱 New World Kids
Comida, agua, energía, refugio — enseñados a través de trabajo práctico.
Más información: [enlace en bio]`,

    "impact stat": `47 jóvenes atendidos en el Campamento de Liderazgo en el Bosque este verano. 94% de tasa de finalización.

Sin teoría. Sin relleno. Solo 6 semanas de educación basada en la naturaleza y formación de liderazgo para jóvenes de 10-16 años en el sur de Seattle.

Cuando los programas cumplen sus promesas, los jóvenes aparecen.

---
🌲 New World Kids
Construyendo humanos autosuficientes, bilingües y capaces.
[enlace en bio]`,

    "behind-the-scenes": `Hoy en el sitio: plantar, construir, aprender.

Los estudiantes practican lo que la mayoría de las escuelas solo hablan — cómo cultivar alimentos, capturar agua y trabajar en equipo bajo condiciones reales.

El modelo de escuela-en-público significa que cada visitante puede ver el trabajo en progreso.

---
🌍 New World Kids
Habilidades reales. Tierra real. Resultados reales.
[enlace en bio]`,
  }

  return templates[topic] || `Contenido sobre: ${topic}\n\nBorrador pendiente — por favor proporciona más detalles específicos del tema para mejor generación de contenido.`
}
