import type { LucideIcon } from "lucide-react"
import { SearchX } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: LucideIcon
  action?: React.ReactNode
  className?: string
  tone?: "default" | "error"
}

/** Shared empty / error placeholder built on the Empty primitive. */
export function EmptyState({
  title,
  description,
  icon: Icon = SearchX,
  action,
  className,
  tone = "default",
}: EmptyStateProps) {
  return (
    <Empty className={cn("border border-dashed bg-card py-14", className)}>
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className={cn("size-11 rounded-full", tone === "error" && "bg-destructive/10 text-destructive")}
        >
          <Icon className="size-5" aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle className="text-base">{title}</EmptyTitle>
        {description ? <EmptyDescription>{description}</EmptyDescription> : null}
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  )
}
