"use client"

import { useEffect } from "react"

import { useLanguageStore } from "@/store/languageStore"

/**
 * Keeps the document `lang` and `dir` attributes in sync with the active
 * locale so native RTL mirroring applies across the whole tree.
 */
export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const locale = useLanguageStore((s) => s.locale)
  const dir = useLanguageStore((s) => s.dir)

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  return <>{children}</>
}
