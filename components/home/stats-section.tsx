"use client"

import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/i18n/dictionaries"
import { mockStats } from "@/lib/mock/data"
import { formatCompactNumber } from "@/utils/format"

const items: { value: number; key: TranslationKey }[] = [
  { value: mockStats.recovered, key: "stats.recovered" },
  { value: mockStats.active, key: "stats.active" },
  { value: mockStats.users, key: "stats.users" },
  { value: mockStats.cities, key: "stats.cities" },
]

export function StatsSection() {
  const { t, locale } = useTranslation()

  return (
    <section className="border-b border-border bg-card">
      <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.key} className="flex flex-col items-center gap-1 text-center">
            <dt className="sr-only">{t(item.key)}</dt>
            <dd className="font-display text-3xl font-bold tracking-tight text-primary">
              {formatCompactNumber(item.value, locale)}
            </dd>
            <p className="text-xs leading-relaxed text-muted-foreground">{t(item.key)}</p>
          </div>
        ))}
      </dl>
    </section>
  )
}
