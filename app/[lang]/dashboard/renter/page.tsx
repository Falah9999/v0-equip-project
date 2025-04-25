import type { Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { getRenterRentals } from "@/lib/data"
import RenterStats from "@/components/renter-stats"
import CurrentRentals from "@/components/current-rentals"
import RentalHistory from "@/components/rental-history"

export default async function RenterDashboardPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const rentals = await getRenterRentals()

  const currentRentals = rentals.filter((rental) => rental.status === "active")
  const pastRentals = rentals.filter((rental) => rental.status === "completed")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{dict.dashboard.renterTitle}</h1>

      <RenterStats rentals={rentals} dict={dict.dashboard} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">{dict.dashboard.currentRentals}</h2>
        <CurrentRentals rentals={currentRentals} dict={dict.dashboard} lang={lang} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">{dict.dashboard.rentalHistory}</h2>
        <RentalHistory rentals={pastRentals} dict={dict.dashboard} lang={lang} />
      </div>
    </div>
  )
}
