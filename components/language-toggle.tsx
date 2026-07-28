"use client"

import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { localeLabels } from "@/lib/i18n/dictionaries"
import { useLanguageStore } from "@/store/languageStore"

export function LanguageToggle({ className }: { className?: string }) {
  const toggleLocale = useLanguageStore((s) => s.toggleLocale)
  const { locale, t } = useTranslation()
  const nextLocale = locale === "en" ? "ar" : "en"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className={className}
      aria-label={`${t("common.language")}: ${localeLabels[nextLocale]}`}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span className="text-xs font-medium">{localeLabels[nextLocale]}</span>
    </Button>
  )
}
