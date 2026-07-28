"use client"

import { FilePlus2, Handshake, ScanSearch, type LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/common/section-heading"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/i18n/dictionaries"

const steps: { icon: LucideIcon; titleKey: TranslationKey; bodyKey: TranslationKey }[] = [
  { icon: FilePlus2, titleKey: "how.step1.title", bodyKey: "how.step1.body" },
  { icon: ScanSearch, titleKey: "how.step2.title", bodyKey: "how.step2.body" },
  { icon: Handshake, titleKey: "how.step3.title", bodyKey: "how.step3.body" },
]

export function HowItWorksSection() {
  const { t } = useTranslation()

  return (
    <section id="how-it-works" className="border-b border-border scroll-mt-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow={t("how.eyebrow")}
          title={t("how.title")}
          description={t("how.description")}
        />

        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.titleKey}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-sm font-semibold text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <CardTitle className="mt-3">{t(step.titleKey)}</CardTitle>
                  <CardDescription className="leading-relaxed">{t(step.bodyKey)}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
