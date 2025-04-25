import type { Locale } from "@/lib/i18n-config"
import { EquipmentCard, type EquipmentItem } from "@/components/equipment-card"

interface EquipmentGridProps {
  equipment: EquipmentItem[]
  dict: {
    viewDetails: string
    rentNow?: string
    dailyRate: string
    weeklyRate?: string
    available: string
    unavailable: string
    noResults: string
    compare?: string
    addedToCompare?: string
    comparisonFull?: string
    share?: string
  }
  lang: Locale
  showRentButton?: boolean
  onRentClick?: (id: string) => void
}

export default function EquipmentGrid({
  equipment,
  dict,
  lang,
  showRentButton = false,
  onRentClick,
}: EquipmentGridProps) {
  if (equipment.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{dict.noResults}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map((item) => (
        <EquipmentCard
          key={item.id}
          equipment={item}
          lang={lang}
          viewLabel={dict.viewDetails}
          rentLabel={dict.rentNow}
          availableLabel={dict.available}
          unavailableLabel={dict.unavailable}
          dailyRateLabel={dict.dailyRate}
          weeklyRateLabel={dict.weeklyRate}
          compareLabel={dict.compare}
          addedToCompareLabel={dict.addedToCompare}
          comparisonFullLabel={dict.comparisonFull}
          shareLabel={dict.share}
          showRentButton={showRentButton}
          onRentClick={onRentClick}
        />
      ))}
    </div>
  )
}
