import Link from "next/link"
import { Compass } from "lucide-react"

import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  /** Renders the wordmark next to the glyph. */
  showWordmark?: boolean
  href?: string
}

export function BrandLogo({ className, showWordmark = true, href = "/" }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2.5 font-display", className)}
      aria-label="FindBack home"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Compass className="size-5" aria-hidden="true" />
      </span>
      {showWordmark ? (
        <span className="text-lg font-semibold tracking-tight">FindBack</span>
      ) : null}
    </Link>
  )
}
