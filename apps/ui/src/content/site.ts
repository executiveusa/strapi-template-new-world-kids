import { getSupportRails } from "@repo/shared-data"

export {
  copyForLocale,
  fiscalSponsor,
  impactPillars,
  journalTeaser,
  socialLinks,
  trustDocuments,
  workWithUsOffers,
  type ImpactPillar,
  type PillarSlug,
  type SocialLink,
  type SupportRails,
  type TrustDocument,
} from "@repo/shared-data"

export const supportRails = getSupportRails(process.env)
