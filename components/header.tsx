"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { Locale } from "@/lib/i18n-config"

interface HeaderProps {
  lang: Locale
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [pathnameWithoutLang, setPathnameWithoutLang] = useState("")

  // Only run this effect after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
    // Remove the language prefix from pathname - synchronous operation
    if (pathname) {
      setPathnameWithoutLang(pathname.replace(`/${lang}`, "") || "/")
    }
  }, [pathname, lang])

  // Navigation links - static data, no async operations
  const navLinks = [
    { href: "/", label: lang === "en" ? "Home" : "الرئيسية" },
    { href: "/equipment", label: lang === "en" ? "Equipment" : "المعدات" },
    { href: "/dashboard/owner", label: lang === "en" ? "Owner Dashboard" : "لوحة المالك" },
    { href: "/dashboard/renter", label: lang === "en" ? "Renter Dashboard" : "لوحة المستأجر" },
  ]

  // Don't render the full component until after client-side hydration
  if (!mounted) {
    return <div className="border-b sticky top-0 z-50 bg-background h-16"></div>
  }

  // Toggle language - synchronous operation
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en"
    return `/${newLang}${pathnameWithoutLang}`
  }

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="text-2xl font-bold">
              CoLink
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathnameWithoutLang === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href={toggleLanguage()}>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{lang === "en" ? "Switch to Arabic" : "Switch to English"}</span>
              </Button>
            </Link>
            <Button variant="outline">{lang === "en" ? "Sign In" : "تسجيل الدخول"}</Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href={toggleLanguage()}>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{lang === "en" ? "Switch to Arabic" : "Switch to English"}</span>
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={lang === "ar" ? "right" : "left"}>
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    <h2 className="text-lg font-semibold">{lang === "en" ? "Menu" : "القائمة"}</h2>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={`/${lang}${link.href}`}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          pathnameWithoutLang === link.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto py-4">
                    <Button className="w-full">{lang === "en" ? "Sign In" : "تسجيل الدخول"}</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
