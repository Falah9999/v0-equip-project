import Link from "next/link"
import type { Locale } from "@/lib/i18n-config"

interface FooterProps {
  lang: Locale
}

export default function Footer({ lang }: FooterProps) {
  // Use a synchronous operation to get the current year
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{lang === "en" ? "CoLink" : "كولينك"}</h3>
            <p className="text-sm text-muted-foreground">
              {lang === "en"
                ? "Connecting laborers and contractors with equipment owners for rentals in Kuwait."
                : "ربط العمال والمقاولين بمالكي المعدات للإيجارات في الكويت."}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{lang === "en" ? "Quick Links" : "روابط سريعة"}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}`} className="text-muted-foreground hover:text-foreground">
                  {lang === "en" ? "Home" : "الرئيسية"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/equipment`} className="text-muted-foreground hover:text-foreground">
                  {lang === "en" ? "Equipment" : "المعدات"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/dashboard/owner`} className="text-muted-foreground hover:text-foreground">
                  {lang === "en" ? "Owner Dashboard" : "لوحة المالك"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/dashboard/renter`} className="text-muted-foreground hover:text-foreground">
                  {lang === "en" ? "Renter Dashboard" : "لوحة المستأجر"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{lang === "en" ? "Categories" : "الفئات"}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={`/${lang}/equipment?category=excavators`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {lang === "en" ? "Excavators" : "حفارات"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/equipment?category=loaders`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {lang === "en" ? "Loaders" : "لودرات"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/equipment?category=trucks`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {lang === "en" ? "Trucks" : "شاحنات"}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/equipment?category=cranes`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {lang === "en" ? "Cranes" : "رافعات"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">{lang === "en" ? "Contact" : "اتصل بنا"}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                {lang === "en" ? "Email: info@colink.kw" : "البريد الإلكتروني: info@colink.kw"}
              </li>
              <li className="text-muted-foreground">
                {lang === "en" ? "Phone: +965 2222 3333" : "الهاتف: +965 2222 3333"}
              </li>
              <li className="text-muted-foreground">
                {lang === "en" ? "Kuwait City, Kuwait" : "مدينة الكويت، الكويت"}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {year} CoLink. {lang === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
          </p>
        </div>
      </div>
    </footer>
  )
}
