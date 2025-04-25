import type { Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { getOwnerEquipment, getOwnerRentRequests } from "@/lib/data"
import { getKuwaitGovernorates, getEquipmentCategories } from "@/lib/bilingual-data"
import OwnerStats from "@/components/owner-stats"
import EquipmentManagement from "@/components/equipment-management"
import RentalRequests from "@/components/rental-requests"

export default async function OwnerDashboardPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const equipment = await getOwnerEquipment()
  const rentRequests = await getOwnerRentRequests()

  // Get locations and categories data on the server
  const locations = getKuwaitGovernorates()
  const categories = getEquipmentCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{dict.dashboard.ownerTitle}</h1>

      <OwnerStats equipment={equipment} requests={rentRequests} dict={dict.dashboard} />

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{dict.dashboard.myEquipment}</h2>
          <button className="btn-primary">{dict.dashboard.addEquipment}</button>
        </div>
        <EquipmentManagement
          equipment={equipment}
          dict={dict.dashboard}
          lang={lang}
          locations={locations}
          categories={categories}
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">{dict.dashboard.rentalRequests}</h2>
        <RentalRequests requests={rentRequests} dict={dict.dashboard} lang={lang} />
      </div>
    </div>
  )
}
