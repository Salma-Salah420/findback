"use client"

import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import { ArrowRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "@/hooks/use-translation"
import { reportService } from "@/services/reportService"

export function SmartMatchSection() {
  const { t } = useTranslation()
  const { data, isLoading } = useSWR("home:smart-matches", () =>
    reportService.getSmartMatches(2),
  )

  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <Badge className="gap-1.5 bg-primary/10 text-primary">
            <Sparkles aria-hidden="true" />
            {t("smartMatch.badge")}
          </Badge>
          <h2 className="font-display text-2xl leading-tight font-bold tracking-tight text-balance sm:text-3xl">
            {t("smartMatch.title")}
          </h2>
          <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            {t("smartMatch.description")}
          </p>
          <Button nativeButton={false} render={<Link href="/reports?sort=relevance" />} size="lg" variant="outline">
            {t("smartMatch.review")}
            <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <Card key={index} className="p-0">
                  <CardContent className="flex items-center gap-4 p-3">
                    <Skeleton className="size-16 shrink-0 rounded-lg" />
                    <div className="flex flex-1 flex-col gap-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : (data ?? []).map((report) => (
                <Card key={report.id} className="p-0 transition-colors hover:border-primary/40">
                  <Link href={`/reports/${report.id}`} className="block outline-none">
                    <CardContent className="flex items-center gap-4 p-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={report.images[0] ?? "/placeholder.svg"}
                          alt={report.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <span className="flex items-center gap-2 text-xs font-semibold text-primary">
                          <Sparkles className="size-3.5" aria-hidden="true" />
                          {report.matchScore}% {t("smartMatch.confidence")}
                        </span>
                        <span className="line-clamp-2 text-sm leading-snug font-medium text-pretty">
                          {report.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {report.location.city}
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          <p className="text-xs text-muted-foreground">{t("smartMatch.soon")}</p>
        </div>
      </div>
    </section>
  )
}
