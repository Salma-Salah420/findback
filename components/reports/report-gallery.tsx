"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function ReportGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const source = images.length > 0 ? images : ["/placeholder.svg"]

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-border bg-muted">
        <Image
          src={source[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      {source.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {source.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${alt} — ${index + 1}`}
              aria-current={index === active}
              className={cn(
                "relative size-16 overflow-hidden rounded-lg border-2 bg-muted transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                index === active ? "border-primary" : "border-transparent hover:border-border",
              )}
            >
              <Image src={image} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
