"use client"

import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/i18n/dictionaries"

const columns: { titleKey: TranslationKey; links: { href: string; key: TranslationKey }[] }[] = [
  {
    titleKey: "footer.product",
    links: [
      { href: "/reports", key: "nav.browse" },
      { href: "/missing-children", key: "nav.missingChildren" },
      { href: "/reports/create", key: "nav.report" },
    ],
  },
  {
    titleKey: "footer.company",
    links: [
      { href: "/about", key: "footer.about" },
      { href: "/contact", key: "footer.contact" },
      { href: "/careers", key: "footer.careers" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { href: "/privacy", key: "footer.privacy" },
      { href: "/terms", key: "footer.terms" },
      { href: "/safety", key: "footer.safety" },
    ],
  },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <BrandLogo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t("footer.description")}
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.titleKey} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">{t(column.titleKey)}</h2>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} {t("brand.name")}. {t("footer.rights")}
          </p>
          <p>{t("brand.tagline")}</p>
        </div>
      </div>
    </footer>
  )
}
