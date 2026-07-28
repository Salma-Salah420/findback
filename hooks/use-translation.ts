"use client"

import { useCallback } from "react"

import { dictionaries, type TranslationKey } from "@/lib/i18n/dictionaries"
import { useLanguageStore } from "@/store/languageStore"

/**
 * Resolves translation keys for the active locale and exposes locale metadata
 * so components can adapt layout (RTL) and number/date formatting.
 */
export function useTranslation() {
  const locale = useLanguageStore((s) => s.locale)
  const dir = useLanguageStore((s) => s.dir)

  const t = useCallback(
    (key: TranslationKey) => dictionaries[locale][key] ?? dictionaries.en[key] ?? key,
    [locale],
  )

  return { t, locale, dir, isRtl: dir === "rtl" }
}
