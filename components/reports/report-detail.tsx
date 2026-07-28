"use client"

import Link from "next/link"
import { ArrowLeft, CalendarDays, Clock, Gift, Hash, MapPin, Tag } from "lucide-react"
import useSWR from "swr"

import { EmptyState } from "@/components/common/empty-state"
import { ReportCard, ReportCardSkeleton } from "@/components/reports/report-card"
import { ReportContactCard } from "@/components/reports/report-contact-card"
import { ReportGallery } from "@/components/reports/report-gallery"
import { ReportStatusBadge, ReportTypeBadge } from "@/components/reports/report-badges"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "@/hooks/use-translation"
import { reportService } from "@/services/reportService"
import { formatCurrency, formatDate, formatRelativeDate } from "@/utils/format"
import type { Report } from "@/types"

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="flex min-w-0 flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-pretty">{value}</span>
      </div>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-4">
        <Skeleton className="aspect-16/10 w-full rounded-xl" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-72 w-full rounded-xl" />
    </div>
  )
}

export function ReportDetail({ reportId }: { reportId: string }) {
  const { t, locale } = useTranslation()

  const { data, isLoading } = useSWR(["report", reportId], () => reportService.getById(reportId))
  const { data: similar, isLoading: similarLoading } = useSWR(["report-similar", reportId], () =>
    reportService.getSimilar(reportId),
  )

  if (isLoading) return <DetailSkeleton />

  if (!data) {
    return (
      <EmptyState
        icon={Tag}
        title={t("detail.notFound")}
        description={t("reports.empty.body")}
        action={
          <Button nativeButton={false} render={<Link href="/reports" />} variant="outline">
            {t("detail.back")}
          </Button>
        }
      />
    )
  }

  const report: Report = data

  return (
    <div className="flex flex-col gap-12">
      <Button
        nativeButton={false} render={<Link href="/reports" />}
        variant="ghost"
        size="sm"
        className="self-start text-muted-foreground"
      >
        <ArrowLeft data-icon="inline-start" className="rtl:rotate-180" />
        {t("detail.back")}
      </Button>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
        <div className="flex min-w-0 flex-col gap-6">
          <ReportGallery images={report.images} alt={report.title} />

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <ReportTypeBadge type={report.type} />
              <ReportStatusBadge status={report.status} />
              <span className="text-xs text-muted-foreground">
                {formatRelativeDate(report.createdAt, locale)}
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {report.title}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {report.location.address}, {report.location.city}
            </p>
          </div>

          <Separator />

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">{t("detail.description")}</h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              {report.description}
            </p>
          </section>

          {report.tags && report.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {report.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <aside className="flex flex-col gap-4">
          <ReportContactCard owner={report.owner} />

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {t("detail.details")}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <DetailRow
                icon={Tag}
                label={t("detail.category")}
                value={t(`categories.${report.category}` as never)}
              />
              <DetailRow
                icon={CalendarDays}
                label={t("detail.date")}
                value={formatDate(report.date, locale)}
              />
              <DetailRow
                icon={Clock}
                label={t("detail.posted")}
                value={formatDate(report.createdAt, locale)}
              />
              <DetailRow icon={MapPin} label={t("detail.location")} value={report.location.city} />
              {report.reward ? (
                <DetailRow
                  icon={Gift}
                  label={t("detail.reward")}
                  value={formatCurrency(report.reward, locale)}
                />
              ) : null}
              <DetailRow icon={Hash} label={t("detail.reference")} value={report.id.toUpperCase()} />
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">{t("detail.similar")}</h2>
          <p className="text-sm text-muted-foreground">{t("detail.similarDescription")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {similarLoading
            ? Array.from({ length: 3 }).map((_, index) => <ReportCardSkeleton key={index} />)
            : similar?.map((item) => <ReportCard key={item.id} report={item} />)}
        </div>
      </section>
    </div>
  )
}
