"use client"

import { useState } from "react"
import { BadgeCheck, Mail, Phone, ShieldAlert } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/hooks/use-translation"
import { formatDate } from "@/utils/format"
import type { ReportOwner } from "@/types"

export function ReportContactCard({ owner }: { owner: ReportOwner }) {
  const { t, locale } = useTranslation()
  const [revealed, setRevealed] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{t("detail.owner")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-11">
            <AvatarImage src={owner.avatarUrl} alt="" />
            <AvatarFallback>{owner.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="flex items-center gap-1.5 truncate text-sm font-semibold">
              {owner.name}
              {owner.verified ? (
                <BadgeCheck className="size-4 shrink-0 text-primary" aria-label={t("detail.verified")} />
              ) : null}
            </span>
            <span className="text-xs text-muted-foreground">
              {t("detail.memberSince")} {formatDate(owner.memberSince, locale)}
            </span>
            <span className="text-xs text-muted-foreground">
              {owner.reportsCount} {t("detail.reportsCount")}
            </span>
          </div>
        </div>

        <Separator />

        {revealed ? (
          <div className="flex flex-col gap-2">
            {owner.phone ? (
              <Button nativeButton={false} render={<a href={`tel:${owner.phone}`} />} variant="outline" size="lg">
                <Phone data-icon="inline-start" />
                {owner.phone}
              </Button>
            ) : null}
            {owner.email ? (
              <Button nativeButton={false} render={<a href={`mailto:${owner.email}`} />} variant="outline" size="lg">
                <Mail data-icon="inline-start" />
                {owner.email}
              </Button>
            ) : null}
          </div>
        ) : (
          <Button size="lg" onClick={() => setRevealed(true)}>
            <Phone data-icon="inline-start" />
            {t("detail.contact")}
          </Button>
        )}

        <Alert>
          <ShieldAlert />
          <AlertDescription>{t("detail.contactHint")}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
