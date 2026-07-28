"use client"

import Link from "next/link"
import useSWR from "swr"
import { ArrowRight } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { SectionHeading } from "@/components/common/section-heading"
import { ReportCard, ReportCardSkeleton } from "@/components/reports/report-card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { reportService } from "@/services/reportService"

export function RecentReportsSection() {
  const { t } = useTranslation()
  const { data, error, isLoading } = useSWR("home:recent-reports", () =>
    reportService.list({ sort: "newest" }),
  )

  const reports = (data?.items ?? []).slice(0, 4)

  return (
    <section className="border-b border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="start"
            eyebrow={t("home.recent.eyebrow")}
            title={t("home.recent.title")}
            description={t("home.recent.description")}
          />
          <Button nativeButton={false} render={<Link href="/reports" />} variant="outline">
            {t("nav.browse")}
            <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <ReportCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            tone="error"
            title={t("reports.error.title")}
            description={t("reports.error.body")}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
