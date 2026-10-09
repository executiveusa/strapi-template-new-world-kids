// Facts the public site may state only once they are confirmed. Leave a value
// null and its line or section stays hidden: nothing here is guessed.
// Fill these in from docs/NWK_FUNDER_TRUST_FACTS_NEEDED.md.

type Localized = { readonly en: string; readonly es: string }

export const facts: {
  readonly ageRange: Localized | null
  readonly cost: Localized | null
  readonly schedule: Localized | null
  readonly pay: Localized | null
  readonly hoursAgreement: Localized
  readonly insurance: Localized
  readonly applyOpen: { readonly href: string } | null
  readonly safeguardingPolicyHref: string | null
  readonly targets: Localized | null
  readonly team: readonly { readonly name: string; readonly role: Localized }[]
} = {
  ageRange: { en: "16 to 19", es: "16 a 19 años" },
  cost: {
    en: "Free for the 12 selected young people",
    es: "Gratis para los 12 jóvenes seleccionados",
  },
  schedule: null,
  pay: {
    en: "Pay is the applicable minimum wage plus $3 an hour. In 2026 that is $20.13 an hour statewide ($17.13 + $3), and $24.30 in Seattle ($21.30 + $3). Minimum wages change every January 1.",
    es: "El pago es el salario mínimo aplicable más $3 por hora. En 2026 eso es $20.13 por hora en todo el estado ($17.13 + $3) y $24.30 en Seattle ($21.30 + $3). Los salarios mínimos cambian cada 1 de enero.",
  },
  hoursAgreement: {
    en: "Hours are set together by the young person, their parent or guardian, and the host program. All three must agree.",
    es: "Las horas las fijan juntos el joven, su madre, padre o tutor, y el programa anfitrión. Los tres deben estar de acuerdo.",
  },
  insurance: {
    en: "Before anyone is paid, the employer registers with Washington L&I for workers’ compensation coverage, as state law requires for employers.",
    es: "Antes de pagar a cualquier persona, el empleador se registra en L&I de Washington para tener cobertura de compensación laboral, como exige la ley estatal.",
  },
  applyOpen: null,
  safeguardingPolicyHref: "/safeguarding",
  targets: {
    en: "All 12 places filled within 2027, after launch. Completion and other results targets will be set once the pilot ends.",
    es: "Los 12 lugares ocupados durante 2027, después del lanzamiento. Las metas de finalización y otros resultados se fijarán cuando termine el piloto.",
  },
  // Roles below come from public records: the Washington Secretary of State
  // record (governor) and the signed HSI agreement (program manager).
  team: [
    {
      name: "Jeremy Bowers",
      role: {
        en: "Governor (Washington record) and program manager (HSI agreement)",
        es: "Gobernador (registro de Washington) y gerente del programa (acuerdo con HSI)",
      },
    },
  ],
}
