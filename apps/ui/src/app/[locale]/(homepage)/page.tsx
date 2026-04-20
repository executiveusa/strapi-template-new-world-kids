import type { Metadata } from 'next'

import { Homepage } from '@/components/homepage/Homepage'

export const metadata: Metadata = {
  title: 'New World Kids — Regenerative Education for a Post-Scarcity Future',
  description:
    'Food, water, energy, shelter. Free regenerative education in rural Mexico — teaching kids to build the future they deserve. 501(c)(3) nonprofit, EIN 46-4779591.',
  openGraph: {
    title: 'New World Kids — Regenerative Education',
    description:
      'Free regenerative education in rural Mexico. Food forests, off-grid energy, natural building. Donate or volunteer today.',
    type: 'website',
  },
}

export default function Page() {
  return <Homepage />
}
