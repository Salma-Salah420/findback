"use client"

import { create } from "zustand"

import { localeDirection, type Locale } from "@/lib/i18n/dictionaries"

interface LanguageState {
  locale: Locale
  dir: "ltr" | "rtl"
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  locale: "en",
  dir: "ltr",
  setLocale: (locale) => set({ locale, dir: localeDirection[locale] }),
  toggleLocale: () => {
    const next: Locale = get().locale === "en" ? "ar" : "en"
    set({ locale: next, dir: localeDirection[next] })
  },
}))
