"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Plus, X } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/i18n/dictionaries"
import { cn } from "@/lib/utils"

const links: { href: string; key: TranslationKey }[] = [
  { href: "/reports", key: "nav.browse" },
  { href: "/missing-children", key: "nav.missingChildren" },
  { href: "/#how-it-works", key: "nav.howItWorks" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <BrandLogo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {t(link.key)}
              </Link>
            )
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">{t("nav.login")}</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/reports/create">
              <Plus className="size-4" aria-hidden="true" />
              {t("nav.report")}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t("nav.menu")}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <LanguageToggle className="justify-start" />
              <Button asChild variant="outline" size="sm">
                <Link href="/login" onClick={() => setOpen(false)}>
                  {t("nav.login")}
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/reports/create" onClick={() => setOpen(false)}>
                  <Plus className="size-4" aria-hidden="true" />
                  {t("nav.report")}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
