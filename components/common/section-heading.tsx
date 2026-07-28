import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "start" | "center"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-2xl leading-tight font-bold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base",
            align === "center" && "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
