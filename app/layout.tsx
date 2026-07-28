import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter, Noto_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google"

import { DirectionProvider } from "@/components/providers/direction-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

// Inter and Plus Jakarta Sans have no Arabic glyphs, so Arabic copy needs a
// script-matched face in the same fallback stack.
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "FindBack — Lost & Found, reunited",
    template: "%s · FindBack",
  },
  description:
    "FindBack is a community Lost & Found platform. Report lost or found items, browse listings near you, and get reunited safely.",
  generator: "v0.app",
  keywords: ["lost and found", "lost items", "found items", "missing children", "lost pets"],
  openGraph: {
    title: "FindBack — Lost & Found, reunited",
    description:
      "Report lost or found items, browse listings near you, and get reunited safely.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#12172a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr"       className={`bg-background ${inter.variable} ${jakarta.variable} ${notoArabic.variable}`}>
      <body className="font-sans antialiased">
        <DirectionProvider>{children}</DirectionProvider>
        <Toaster position="top-center" />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
