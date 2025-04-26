import type React from "react"
import { Suspense } from "react"
import { Inter, Tajawal } from "next/font/google"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { type Locale, i18n } from "@/lib/i18n-config"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ComparisonProvider } from "@/contexts/comparison-context"
import { ComparisonBar } from "@/components/comparison-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "@/app/globals.css"

// Load Inter for Latin text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Load Tajawal for Arabic text (similar to alhisba.com)
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CoLink | Equipment Rentals in Kuwait",
  description: "Connect laborers and contractors with equipment owners for rentals",
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

// Loading fallbacks
function HeaderFallback() {
  return <div className="h-16 bg-muted animate-pulse"></div>
}

function FooterFallback() {
  return <div className="h-32 bg-muted animate-pulse"></div>
}

function ComparisonBarFallback() {
  return null
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  // Validate that the incoming `lang` parameter is valid
  const isValidLocale = i18n.locales.some((locale) => locale === params.lang)

  if (!isValidLocale) {
    // If not valid, redirect to the default locale
    redirect(`/${i18n.defaultLocale}`)
  }

  // Get the direction based on the language
  const dir = params.lang === "ar" ? "rtl" : "ltr"

  // Comparison bar labels
  const comparisonLabels = {
    compare: params.lang === "ar" ? "قارن" : "Compare",
    selected: params.lang === "ar" ? "المعدات المحددة" : "Selected Equipment",
    clear: params.lang === "ar" ? "مسح الكل" : "Clear All",
    remove: params.lang === "ar" ? "إزالة" : "Remove",
    minimized: params.lang === "ar" ? "معدات للمقارنة" : "Equipment to compare",
    share: params.lang === "ar" ? "مشاركة" : "Share",
  }

  return (
    <html lang={params.lang} dir={dir} suppressHydrationWarning className={`${inter.variable} ${tajawal.variable}`}>
      <body className={params.lang === "ar" ? "font-tajawal" : "font-inter"}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ComparisonProvider>
            <div className="flex min-h-screen flex-col">
              <Suspense fallback={<HeaderFallback />}>
                <div>
                  <Header lang={params.lang} />
                </div>
              </Suspense>
              <main className="flex-1 pb-20">{children}</main>
              <Suspense fallback={<FooterFallback />}>
                <div>
                  <Footer lang={params.lang} />
                </div>
              </Suspense>
              <Suspense fallback={<ComparisonBarFallback />}>
                <div>
                  <ComparisonBar lang={params.lang} labels={comparisonLabels} />
                </div>
              </Suspense>
            </div>
            <Toaster />
          </ComparisonProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
