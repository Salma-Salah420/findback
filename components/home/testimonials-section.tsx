"use client"

import { Quote } from "lucide-react"

import { SectionHeading } from "@/components/common/section-heading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { mockTestimonials } from "@/lib/mock/data"

export function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section className="border-b border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {mockTestimonials.map((item) => (
            <li key={item.id}>
              <Card className="h-full">
                <CardContent className="flex flex-col gap-4">
                  <Quote className="size-5 text-primary" aria-hidden="true" />
                  <blockquote className="text-sm leading-relaxed text-pretty">
                    {item.quote}
                  </blockquote>
                </CardContent>
                <CardFooter className="flex items-center gap-3 border-t border-border pt-4">
                  <Avatar className="size-9">
                    <AvatarImage src={item.avatarUrl} alt="" />
                    <AvatarFallback>{item.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">{item.role}</span>
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
