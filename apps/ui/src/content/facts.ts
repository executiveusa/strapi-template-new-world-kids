// Facts the public site may state only once they are confirmed. Leave a value
// null and its line or section stays hidden: nothing here is guessed.
// Fill these in from docs/NWK_FUNDER_TRUST_FACTS_NEEDED.md.

type Localized = { readonly en: string; readonly es: string }

export const facts: {
  readonly ageRange: Localized | null
  readonly cost: Localized | null
  readonly schedule: Localized | null
  readonly pay: Localized | null
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
  pay: null,
  applyOpen: null,
  safeguardingPolicyHref: null,
  targets: null,
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
