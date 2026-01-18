import { CheckIcon, CrossIcon } from "lucide-react"

import { logPlaceholderUsage } from "@/lib/general-helpers"

export const AdornmentSuccess = () => {
  logPlaceholderUsage("AdornmentSuccess")

  return (
    <span>
      <CheckIcon height="1.5rem" width="1.5rem" />
    </span>
  )
}

export const AdornmentError = () => {
  logPlaceholderUsage("AdornmentError")

  return (
    <span>
      <CrossIcon height="1.5rem" width="1.5rem" />
    </span>
  )
}
