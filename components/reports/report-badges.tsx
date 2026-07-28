"use client"

import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import type { ReportStatus, ReportType } from "@/types"

/** Colour treatment per report type: lost = primary, found = accent, child = destructive. */
const typeStyles: Record<ReportType, string> = {
  lost: "bg-primary text-primary-foreground",
  found: "bg-accent text-accent-foreground",
  missing_child: "bg-destructive text-destructive-foreground",
}

export function ReportTypeBadge({
  type,
  className,
}: {
  type: ReportType
  className?: string
}) {
  const { t } = useTranslation()
  return (
    <Badge className={cn(typeStyles[type], className)}>{t(`reportType.${type}`)}</Badge>
  )
}

const statusStyles: Record<ReportStatus, string> = {
  active: "border-border bg-card text-muted-foreground",
  matched: "border-transparent bg-success/15 text-success",
  resolved: "border-transparent bg-success text-success-foreground",
  closed: "border-border bg-muted text-muted-foreground",
}

export function ReportStatusBadge({
  status,
  className,
}: {
  status: ReportStatus
  className?: string
}) {
  const { t } = useTranslation()
  return (
    <Badge variant="outline" className={cn(statusStyles[status], className)}>
      {t(`status.${status}`)}
    </Badge>
  )
}
