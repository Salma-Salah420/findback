"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/common/section-heading"
import { CategoryCard } from "@/components/reports/category-card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { mockCategories } from "@/lib/mock/data"

export function CategoriesSection() {
  const { t } = useTranslation()

  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow={t("categories.eyebrow")}
          title={t("categories.title")}
          description={t("categories.description")}
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {mockCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button render={<Link href="/reports" />} variant="outline" size="lg">
            {t("categories.viewAll")}
            <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />
          </Button>
        </div>
      </div>
    </section>
  )
}
