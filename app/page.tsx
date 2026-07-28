import { CategoriesSection } from "@/components/home/categories-section"
import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { RecentReportsSection } from "@/components/home/recent-reports-section"
import { SmartMatchSection } from "@/components/home/smart-match-section"
import { StatsSection } from "@/components/home/stats-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <RecentReportsSection />
        <CategoriesSection />
        <HowItWorksSection />
        <SmartMatchSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
