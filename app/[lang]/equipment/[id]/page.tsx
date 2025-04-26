import type { Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { getEquipmentById } from "@/lib/data"
import EquipmentGallery from "@/components/equipment-gallery"
import EquipmentSpecs from "@/components/equipment-specs"
import OwnerDetails from "@/components/owner-details"
import RentRequestForm from "@/components/rent-request-form"
import RelatedEquipment from "@/components/related-equipment"
import { ShareButton } from "@/components/share-button"

export default async function EquipmentDetailPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string }
}) {
  const dict = await getDictionary(lang)
  const equipment = await getEquipmentById(id)

  if (!equipment) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{dict.equipment.notFound}</h1>
        <p className="mb-8">{dict.equipment.notFoundDesc}</p>
      </div>
    )
  }

  // Generate the share URL for this equipment - use relative URL for client-side processing
  const shareUrl = `/${lang}/equipment/${id}`
  const shareTitle = equipment.name
  const shareDescription =
    equipment.description || `${equipment.category} - ${equipment.location} - ${equipment.dailyRate} KWD/day`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{equipment.name}</h1>
            <ShareButton url={shareUrl} title={shareTitle} description={shareDescription} lang={lang} />
          </div>
          <EquipmentGallery images={equipment.images} />

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.equipment.description}</h2>
            <p className="text-muted-foreground">{equipment.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">{dict.equipment.specifications}</h2>
            <EquipmentSpecs specs={equipment.specs} dict={dict.specs} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{dict.equipment.pricing}</h3>
              <div className="flex justify-between mb-2">
                <span>{dict.equipment.dailyRate}</span>
                <span className="font-bold">{equipment.dailyRate} KWD</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>{dict.equipment.weeklyRate}</span>
                <span className="font-bold">{equipment.weeklyRate} KWD</span>
              </div>

              <RentRequestForm dict={dict.rentForm} equipmentId={id} />
            </div>

            <OwnerDetails owner={equipment.owner} dict={dict.owner} />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">{dict.equipment.similar}</h2>
        <RelatedEquipment category={equipment.category} currentId={id} dict={dict.equipment} lang={lang} />
      </div>
    </div>
  )
}
