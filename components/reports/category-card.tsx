"use client"

import Link from "next/link"
import {
  Briefcase,
  FileText,
  Gem,
  HeartHandshake,
  PawPrint,
  Package,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/i18n/dictionaries"
import type { Category } from "@/types"
import { formatNumber } from "@/utils/format"

/** Maps the icon name stored on a category to a real Lucide component. */
const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  FileText,
  Briefcase,
  PawPrint,
  HeartHandshake,
  Gem,
  Package,
}

export function CategoryCard({ category }: { category: Category }) {
  const { t, locale } = useTranslation()
  const Icon = iconMap[category.icon] ?? Package

  return (
    <Card className="p-0 transition-colors hover:border-primary/40 hover:bg-accent/40">
      <Link
        href={`/reports?category=${category.slug}`}
        className="flex flex-col items-start gap-3 p-4 outline-none"
      >
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold">{t(category.labelKey as TranslationKey)}</span>
          <span className="text-xs text-muted-foreground">
            {formatNumber(category.count, locale)} {t("categories.reports")}
          </span>
        </span>
      </Link>
    </Card>
  )
}
