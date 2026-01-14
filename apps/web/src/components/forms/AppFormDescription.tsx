import React from "react"

import { logPlaceholderUsage } from "@/lib/general-helpers"
import { FormDescription } from "@/components/ui/form"

type Props = {
  readonly description?: React.ReactNode
}

export function AppFormDescription({ description }: Props) {
  logPlaceholderUsage("AppFormDescription")

  if (description == null) {
    return null
  }

  return <FormDescription>{description}</FormDescription>
}
