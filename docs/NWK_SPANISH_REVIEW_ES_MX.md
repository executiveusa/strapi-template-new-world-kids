# Spanish copy review (Mexican Spanish)

**Status 2026-10-10: all edits below are applied, and the whole site now uses usted** (founder decision). The
table is kept as the record of what changed and why. Social handles confirmed by the founder: facebook.com/nwkidsorg,
instagram.com/proyectoindigoazul, youtube.com/@proyectoindigoazul (LinkedIn removed until confirmed).

Reviewed 2026-10-10 by a read-only pass over every `es` string in `apps/ui`. Not covered: HermesVoiceChat, and the
Spanish text inside IntakeForm and PageHero. Overall the Spanish is natural and safe for Mexico: no vosotros, no
"ordenador" or "coger", ¿ and ¡ are present, "$20.13" and dates are formatted correctly, "salario mínimo" and
"empleador" are right, and parents are correctly "madre, padre o tutor".

Already fixed during the 2026-10-10 pass (because those strings were rewritten anyway): "governor" now explained,
"frente al" donation steps use "renglón de memo (nota)", "$ dólares" on pay, workers' comp and L&I explained, the
single-source privacy page uses usted, the two new pages (safeguarding policy, privacy) use "Patrulla Estatal".

## Decide first: tú or usted

The whole site uses tú. Funders, referring professionals, and parents usually expect **usted**. Recommendation: usted on
donate, transparency, privacy, safeguarding, refer, mentor, opportunity (adults); tú only where the reader is a young
person (coming-soon, homepage hero). Privacy and the new safeguarding policy already follow this.

## High priority

| Where                     | Current                                                            | Problem                                                                        | Suggested                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| refer, first-12, projects | "referencia", "Refiere a un joven", "Enviar referencia"            | In Mexico "referencia" is a reference letter. A referral is a "recomendación". | "Recomienda/Recomiende a un joven", "solo por recomendación", "Enviar recomendación"                                                        |
| first-12                  | "Cómo aplicar", "Aplicar ahora"                                    | Anglicism                                                                      | "Cómo participar", "Postúlate ahora"                                                                                                        |
| coming-soon               | "Envíenme un correo… me quiten"                                    | Mixes ustedes; drops "once"                                                    | "Quiero recibir un solo correo cuando abra el nuevo sitio. Puedo pedir que me den de baja en cualquier momento."                            |
| coming-soon               | "Recibe un correo cuando abra"                                     | English promises one email                                                     | "Recibe un solo correo cuando abra"                                                                                                         |
| transparency              | HSI disclosure left in English                                     | No Spanish note                                                                | Keep English legal text, add: "Este es el aviso requerido por HSI, en inglés. New World Kids es un programa bajo patrocinio fiscal de HSI." |
| safeguarding              | "Policía Estatal de Washington"                                    | Wrong agency name                                                              | "Patrulla Estatal de Washington" (done on new pages)                                                                                        |
| first-12                  | "en acogida o en vivienda inestable"                               | "Acogida" is Spain usage                                                       | "en cuidado de crianza temporal (foster care) o sin vivienda estable"                                                                       |
| first-12                  | "Un permiso de trabajo de menores en la licencia comercial"        | Garbled                                                                        | "Una autorización para emplear a menores (minor work permit) agregada a la licencia comercial del empleador, para cada lugar de trabajo."   |
| projects vs refer         | "Alimentos + Lugar" vs "Jardinería urbana + sistemas alimentarios" | One pathway, two names                                                         | Use one: "Alimentos y espacios comunitarios"                                                                                                |
| several                   | "encaje" (fit)                                                     | Calque; in Mexico "encaje" is lace                                             | "compatibilidad" or "si es el perfil adecuado"                                                                                              |
| facts, homepage           | "lugares" (seats)                                                  | Calque                                                                         | "cupos"                                                                                                                                     |

## Gender and inclusive wording

- mentor: "Estoy dispuesto a completar" → "Acepto completar". "¿Dónde estás ubicado?" → "¿En qué ciudad o zona te encuentras?"
- refer: "Aún no estoy seguro" → "Todavía no lo sé". "en qué es bueno o buena" → "¿Qué le interesa o en qué destaca?".
  "está abierto a saber de nosotros" → "está de acuerdo en que lo contactemos".
- mentor, opportunity: "colocación" → "no garantiza que sea asignado como mentor" / "no garantiza un cupo".

## Terms and small items

- PathwaySection: "Evidencia del trabajo" → "Pruebas del trabajo"; "Brindar apoyo y responsabilidad" → "apoyo y seguimiento";
  "navegar" → "resolver".
- ProofOfWorkFeed: "artefactos públicos verificados" → "materiales públicos verificados".
- gallery: "NEW WORLD KIDS X PROYECTO INDIGO AZUL" → "×"; "Shorts" → "Videos cortos"; "material de" → "imágenes y videos de".
- projects: "exposición a la industria" → "contacto con la industria"; "instalaciones" → "instalaciones artísticas".
- Header/footer: "Apoyar" → "Donar"; "Navegación móvil" → "Menú de navegación"; "Enlaces del pie" → "Enlaces al pie de página".
- safeguarding: "Nadie recibe castigo por reportar" → "Nadie sufre represalias por reportar de buena fe";
  "deben reportar" → "están obligados por ley a reportar"; add "(en inglés)" to links to English-language pages.
- transparency: "datos tachados" → "con datos confidenciales omitidos"; "Alojados por HSI" → "Los aloja HSI".
- privacy (old text): "borrar" → "eliminar" (done in the rewrite).
- Pick one: "el Proyecto Indigo Azul" or "Proyecto Indigo Azul". Pathway names are English brand names with Spanish glosses;
  decide if parents should see them unglossed.
