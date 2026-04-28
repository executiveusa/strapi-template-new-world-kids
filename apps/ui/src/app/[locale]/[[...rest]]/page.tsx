import { notFound } from "next/navigation"
import { use } from "react"

import { Homepage } from "@/components/homepage/Homepage"

export const dynamic = "force-static"
export const dynamicParams = true

export default function StaticCatchAllPage(
  props: PageProps<"/[locale]/[[...rest]]">
) {
  const params = use(props.params)
  const isRoot = !params.rest || params.rest.length === 0

  if (isRoot) {
    return <Homepage />
  }

  notFound()
}
