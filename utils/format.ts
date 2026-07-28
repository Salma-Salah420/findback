import type { Locale } from "@/lib/i18n/dictionaries"

const localeTags: Record<Locale, string> = {
  en: "en-US",
  ar: "ar-JO",
}

export function formatNumber(value: number, locale: Locale = "en") {
  return new Intl.NumberFormat(localeTags[locale]).format(value)
}

export function formatCompactNumber(value: number, locale: Locale = "en") {
  return new Intl.NumberFormat(localeTags[locale], {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatDate(iso: string, locale: Locale = "en") {
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

/** "3 days ago" style label, falling back to an absolute date past 30 days. */
export function formatRelativeDate(iso: string, locale: Locale = "en") {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffDays = Math.round(diffMs / (24 * 60 * 60 * 1000))

  if (Math.abs(diffDays) > 30) return formatDate(iso, locale)

  const rtf = new Intl.RelativeTimeFormat(localeTags[locale], { numeric: "auto" })
  if (Math.abs(diffDays) < 1) {
    const diffHours = Math.round(diffMs / (60 * 60 * 1000))
    return rtf.format(-diffHours, "hour")
  }
  return rtf.format(-diffDays, "day")
}

export function formatCurrency(value: number, locale: Locale = "en") {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency: "JOD",
    maximumFractionDigits: 0,
  }).format(value)
}
