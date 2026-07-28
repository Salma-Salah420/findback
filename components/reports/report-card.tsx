"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MapPin, Sparkles } from "lucide-react"

import { ReportStatusBadge, ReportTypeBadge } from "@/components/reports/report-badges"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/i18n/dictionaries"
import { cn } from "@/lib/utils"
import type { Report } from "@/types"
import { formatDate, formatRelativeDate } from "@/utils/format"

interface ReportCardProps {
  report: Report
  className?: string
  /** Shows the Smart Match confidence chip when a score is present. */
  showMatchScore?: boolean
}

export function ReportCard({ report, className, showMatchScore = false }: ReportCardProps) {
  const { t, locale } = useTranslation()
  const categoryKey = `categories.${report.category}` as TranslationKey

  return (
    <Card
      className={cn(
        "group overflow-hidden p-0 transition-shadow hover:shadow-lg focus-within:shadow-lg",
        className,
      )}
    >
      <Link href={`/reports/${report.id}`} className="flex h-full flex-col outline-none">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
          <Image
            src={report.images[0] ?? "/placeholder.svg"}
            alt={report.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
            <ReportTypeBadge type={report.type} />
            {showMatchScore && typeof report.matchScore === "number" ? (
              <Badge className="bg-background/95 text-foreground backdrop-blur">
                <Sparkles data-icon="inline-start" />
                {report.matchScore}%
              </Badge>
            ) : null}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col gap-2.5 p-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{t(categoryKey)}</Badge>
            <ReportStatusBadge status={report.status} />
          </div>

          <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-pretty">
            {report.title}
          </h3>

          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {report.description}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-1.5 border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{report.location.city}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
            <time dateTime={report.date}>{formatDate(report.date, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>{formatRelativeDate(report.createdAt, locale)}</span>
          </span>
        </CardFooter>
      </Link>
    </Card>
  )
}

/** Matching skeleton used while the report list is loading. */
export function ReportCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <CardContent className="flex flex-col gap-3 p-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 border-t border-border px-4 py-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-32" />
      </CardFooter>
    </Card>
  )
}
