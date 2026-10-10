// Public contact and social destinations. Everything else that used to live here
// (legacy Culture Shock metrics, testimonials, operations copy) was removed: it was
// not part of the locked First 12 story and carried unverified claims.
// Confirm each handle belongs to the organisation before launch; see the PR notes.
export const siteLinks = {
  email: "mailto:info@nwkids.org",
  infoEmail: "info@nwkids.org",
  facebook: "https://www.facebook.com/nwkidsorg",
  instagram: "https://www.instagram.com/proyectoindigoazul/",
  youtube: "https://www.youtube.com/@proyectoindigoazul",
} as const

export const socialLinks = [
  { label: "Instagram", href: siteLinks.instagram, key: "instagram" },
  { label: "Facebook", href: siteLinks.facebook, key: "facebook" },
  { label: "YouTube", href: siteLinks.youtube, key: "youtube" },
  { label: "Email", href: siteLinks.email, key: "email" },
] as const
