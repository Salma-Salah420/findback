"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  defaultValue?: string
  onSearch: (query: string) => void
  className?: string
  /** Renders a separate submit button instead of the inline icon only. */
  withButton?: boolean
}

export function SearchBar({
  defaultValue = "",
  onSearch,
  className,
  withButton = true,
}: SearchBarProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState(defaultValue)

  return (
    <form
      className={cn("flex w-full items-center gap-2", className)}
      onSubmit={(event) => {
        event.preventDefault()
        onSearch(value.trim())
      }}
      role="search"
    >
      <InputGroup className="h-10 flex-1">
        <InputGroupAddon>
          <Search aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t("reports.searchPlaceholder")}
          aria-label={t("reports.search")}
        />
      </InputGroup>
      {withButton ? (
        <Button type="submit" className="h-10 shrink-0">
          {t("reports.search")}
        </Button>
      ) : null}
    </form>
  )
}
