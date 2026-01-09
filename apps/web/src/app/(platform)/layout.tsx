import type { ReactNode } from "react"

/**
 * Renders the provided children as the platform layout's content.
 *
 * @param children - The React nodes to be rendered within this layout.
 * @returns The provided `children` as the layout's rendered content.
 */
export default function PlatformLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}