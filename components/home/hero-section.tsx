"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { HandHeart, PackageSearch, ShieldCheck } from "lucide-react"

import { SearchBar } from "@/components/reports/search-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

export function HeroSection() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <section className="border-b border-border bg-gradient-to-b from-secondary/60 to-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 lg:py-24">
        <Badge variant="outline" className="gap-1.5 bg-card">
          <ShieldCheck aria-hidden="true" />
          {t("hero.eyebrow")}
        </Badge>

        <div className="flex max-w-3xl flex-col gap-5">
          <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {t("hero.description")}
          </p>
        </div>

        <SearchBar
          className="w-full max-w-xl"
          onSearch={(query) =>
            router.push(query ? `/reports?query=${encodeURIComponent(query)}` : "/reports")
          }
        />

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Button nativeButton={false} render={<Link href="/reports/create?type=lost" />} size="lg">
            <PackageSearch data-icon="inline-start" />
            {t("hero.ctaLost")}
          </Button>
          <Button nativeButton={false} render={<Link href="/reports/create?type=found" />} size="lg" variant="outline">
            <HandHeart data-icon="inline-start" />
            {t("hero.ctaFound")}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">{t("hero.trust")}</p>
      </div>
    </section>
  )
}
