"use client"

import { SlidersHorizontal, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"
import { mockCities } from "@/lib/mock/data"
import type { TranslationKey } from "@/lib/i18n/dictionaries"
import { cn } from "@/lib/utils"
import type { ReportFilters } from "@/types"

interface FilterOption {
  value: string
  label: string
}

interface FilterPanelProps {
  filters: ReportFilters
  onChange: (patch: Partial<ReportFilters>) => void
  onReset: () => void
  className?: string
}

/** Base UI Select needs `items` so the trigger can render a label for a value. */
function FilterSelect({
  label,
  value,
  options,
  onValueChange,
}: {
  label: string
  value: string
  options: FilterOption[]
  onValueChange: (value: string) => void
}) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Select items={options} value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-9 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}

export function FilterPanel({ filters, onChange, onReset, className }: FilterPanelProps) {
  const { t } = useTranslation()

  const option = (value: string, key: TranslationKey): FilterOption => ({
    value,
    label: t(key),
  })

  const typeOptions: FilterOption[] = [
    option("all", "reports.all"),
    option("lost", "reportType.lost"),
    option("found", "reportType.found"),
    option("missing_child", "reportType.missing_child"),
  ]

  const categoryOptions: FilterOption[] = [
    option("all", "reports.all"),
    option("electronics", "categories.electronics"),
    option("documents", "categories.documents"),
    option("bags", "categories.bags"),
    option("pets", "categories.pets"),
    option("children", "categories.children"),
    option("jewelry", "categories.jewelry"),
    option("other", "categories.other"),
  ]

  const cityOptions: FilterOption[] = [
    option("all", "reports.all"),
    ...mockCities.map((city) => ({ value: city, label: city })),
  ]

  const dateOptions: FilterOption[] = [
    option("all", "date.any"),
    option("1", "date.24h"),
    option("7", "date.7d"),
    option("30", "date.30d"),
  ]

  const sortOptions: FilterOption[] = [
    option("newest", "sort.newest"),
    option("oldest", "sort.oldest"),
    option("relevance", "sort.relevance"),
  ]

  const isDirty =
    (filters.type ?? "all") !== "all" ||
    (filters.category ?? "all") !== "all" ||
    (filters.city ?? "all") !== "all" ||
    (filters.withinDays ?? "all") !== "all"

  return (
    <aside className={cn("flex flex-col gap-5", className)} aria-label={t("reports.filters")}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="size-4 text-muted-foreground" aria-hidden="true" />
          {t("reports.filters")}
        </h2>
        {isDirty ? (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X data-icon="inline-start" />
            {t("reports.clear")}
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col gap-4">
        <FilterSelect
          label={t("reports.type")}
          value={(filters.type ?? "all") as string}
          options={typeOptions}
          onValueChange={(value) => onChange({ type: value as ReportFilters["type"] })}
        />
        <FilterSelect
          label={t("reports.category")}
          value={(filters.category ?? "all") as string}
          options={categoryOptions}
          onValueChange={(value) => onChange({ category: value as ReportFilters["category"] })}
        />
        <FilterSelect
          label={t("reports.city")}
          value={(filters.city ?? "all") as string}
          options={cityOptions}
          onValueChange={(value) => onChange({ city: value })}
        />
        <FilterSelect
          label={t("reports.date")}
          value={String(filters.withinDays ?? "all")}
          options={dateOptions}
          onValueChange={(value) =>
            onChange({ withinDays: value === "all" ? "all" : Number(value) })
          }
        />
        <FilterSelect
          label={t("reports.sort")}
          value={filters.sort ?? "newest"}
          options={sortOptions}
          onValueChange={(value) => onChange({ sort: value as ReportFilters["sort"] })}
        />
      </div>
    </aside>
  )
}
