"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { FilterPanel } from "@/components/reports/filter-panel"
import { ReportCard, ReportCardSkeleton } from "@/components/reports/report-card"
import { SearchBar } from "@/components/reports/search-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTranslation } from "@/hooks/use-translation"
import { activeFilterCount, useReportStore } from "@/store/reportStore"
import type { CategorySlug, ReportFilters, ReportType } from "@/types"

export function ReportsBrowser() {
  const { t, locale } = useTranslation()
  const searchParams = useSearchParams()

  const reports = useReportStore((s) => s.reports)
  const total = useReportStore((s) => s.total)
  const filters = useReportStore((s) => s.filters)
  const isLoading = useReportStore((s) => s.isLoading)
  const error = useReportStore((s) => s.error)
  const setFilter = useReportStore((s) => s.setFilter)
  const setFilters = useReportStore((s) => s.setFilters)
  const resetFilters = useReportStore((s) => s.resetFilters)
  const fetchReports = useReportStore((s) => s.fetchReports)

  // Seed the store from the URL once, so /reports?category=pets deep links work.
  useEffect(() => {
    const patch: Partial<ReportFilters> = {}
    const query = searchParams.get("query")
    const category = searchParams.get("category")
    const type = searchParams.get("type")
    const city = searchParams.get("city")
    const sort = searchParams.get("sort")

    if (query) patch.query = query
    if (category) patch.category = category as CategorySlug
    if (type) patch.type = type as ReportType
    if (city) patch.city = city
    if (sort) patch.sort = sort as ReportFilters["sort"]

    setFilters(patch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, setFilters])

  const filterCount = activeFilterCount(filters)

  const resultsLabel = `${new Intl.NumberFormat(locale === "ar" ? "ar-JO" : "en-US").format(total)} ${
    total === 1 ? t("reports.resultsOne") : t("reports.resultsMany")
  }`

  const grid = isLoading ? (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <ReportCardSkeleton key={index} />
      ))}
    </div>
  ) : error ? (
    <EmptyState
      tone="error"
      title={t("reports.error.title")}
      description={t("reports.error.body")}
      action={<Button onClick={() => void fetchReports()}>{t("reports.retry")}</Button>}
    />
  ) : reports.length === 0 ? (
    <EmptyState
      title={t("reports.empty.title")}
      description={t("reports.empty.body")}
      action={
        <Button variant="outline" onClick={resetFilters}>
          {t("reports.clear")}
        </Button>
      }
    />
  ) : (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} showMatchScore />
      ))}
    </div>
  )

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-balance">
          {t("reports.title")}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t("reports.description")}
        </p>
      </div>

      <SearchBar
        defaultValue={filters.query ?? ""}
        onSearch={(query) => setFilter("query", query)}
      />

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <FilterPanel
          className="hidden lg:flex"
          filters={filters}
          onChange={(patch) => setFilters(patch)}
          onReset={resetFilters}
        />

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {isLoading ? t("common.loading") : resultsLabel}
            </p>

            <Dialog>
              <DialogTrigger
                render={
                  <Button variant="outline" size="lg" className="lg:hidden">
                    <SlidersHorizontal data-icon="inline-start" />
                    {t("reports.filters")}
                    {filterCount > 0 ? <Badge variant="secondary">{filterCount}</Badge> : null}
                  </Button>
                }
              />
              <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogTitle className="flex items-center gap-2 text-base">
                  <SlidersHorizontal className="size-4 text-muted-foreground" aria-hidden="true" />
                  {t("reports.filters")}
                </DialogTitle>
                <FilterPanel
                  hideTitle
                  filters={filters}
                  onChange={(patch) => setFilters(patch)}
                  onReset={resetFilters}
                />
              </DialogContent>
            </Dialog>
          </div>

          {grid}
        </div>
      </div>
    </div>
  )
}
