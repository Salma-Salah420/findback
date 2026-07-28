import { Suspense } from "react"
import type { Metadata } from "next"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { ReportsBrowser } from "@/components/reports/reports-browser"
import { Spinner } from "@/components/ui/spinner"

export const metadata: Metadata = {
  title: "Browse reports",
  description:
    "Search every lost and found report near you. Filter by type, category, city, and date posted.",
}

export default function ReportsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center">
              <Spinner className="size-6 text-muted-foreground" />
            </div>
          }
        >
          <ReportsBrowser />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
