import type { Metadata } from "next"

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import { ReportDetail } from "@/components/reports/report-detail"

export const metadata: Metadata = {
  title: "Report details",
  description: "Full details for a lost or found report, including contact options.",
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <ReportDetail reportId={id} />
      </main>
      <Footer />
    </>
  )
}
