import type { Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import { getKuwaitGovernorates, getEquipmentCategories } from "@/lib/bilingual-data"
import EquipmentFilters from "@/components/equipment-filters"
import EquipmentGrid from "@/components/equipment-grid"

// Mock data for equipment
const getMockEquipment = (lang: Locale) => [
  {
    id: "1",
    name: lang === "en" ? "Caterpillar Excavator 320" : "حفارة كاتربيلر 320",
    category: lang === "en" ? "Excavators" : "حفارات",
    subcategory: lang === "en" ? "Tracked Excavators" : "حفارات مجنزرة",
    location: lang === "en" ? "Kuwait City" : "مدينة الكويت",
    governorate: lang === "en" ? "Capital" : "العاصمة",
    dailyRate: 120,
    weeklyRate: 700,
    available: true,
    image: "/placeholder.svg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    specs: {
      Brand: "Caterpillar",
      Model: "320",
      Year: 2020,
      Weight: "20 tons",
      "Engine Power": "162 HP",
      "Bucket Capacity": "1.2 m³",
      "Max Digging Depth": "6.7 m",
      "Fuel Type": "Diesel",
    },
    description:
      lang === "en"
        ? "A powerful excavator perfect for medium to large construction projects. Features a comfortable cabin with air conditioning and excellent visibility."
        : "حفارة قوية مثالية لمشاريع البناء المتوسطة والكبيرة. تتميز بكابينة مريحة مع تكييف هواء ورؤية ممتازة.",
  },
  {
    id: "2",
    name: lang === "en" ? "Bobcat Skid Steer Loader S650" : "بوبكات لودر انزلاقي S650",
    category: lang === "en" ? "Loaders" : "لودرات",
    subcategory: lang === "en" ? "Skid Steer Loaders" : "لودرات انزلاقية",
    location: lang === "en" ? "Salmiya" : "السالمية",
    governorate: lang === "en" ? "Hawally" : "حولي",
    dailyRate: 85,
    weeklyRate: 500,
    available: true,
    image: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    specs: {
      Brand: "Bobcat",
      Model: "S650",
      Year: 2021,
      "Operating Weight": "2.9 tons",
      "Rated Capacity": "1,253 kg",
      "Engine Power": "74 HP",
      "Fuel Type": "Diesel",
    },
    description:
      lang === "en"
        ? "Versatile skid-steer loader ideal for construction, landscaping, and agriculture. Compact size with excellent maneuverability."
        : "لودر انزلاقي متعدد الاستخدامات مثالي للبناء وتنسيق المناظر الطبيعية والزراعة. حجم مدمج مع قدرة مناورة ممتازة.",
  },
  {
    id: "3",
    name: lang === "en" ? "Concrete Mixer CM350" : "خلاطة خرسانة CM350",
    category: lang === "en" ? "Tools" : "أدوات",
    subcategory: lang === "en" ? "Concrete Tools" : "أدوات خرسانية",
    location: lang === "en" ? "Hawally" : "حولي",
    governorate: lang === "en" ? "Hawally" : "حولي",
    dailyRate: 50,
    weeklyRate: 300,
    available: false,
    image: "/placeholder.svg?height=300&width=400",
    specs: {
      Brand: "PowerMix",
      Model: "CM350",
      "Drum Capacity": "350 liters",
      "Motor Power": "2.2 kW",
      Voltage: "220-240V",
      Weight: "180 kg",
    },
    description:
      lang === "en"
        ? "Electric concrete mixer with 350-liter capacity. Ideal for small to medium construction projects."
        : "خلاطة خرسانة كهربائية بسعة 350 لتر. مثالية لمشاريع البناء الصغيرة والمتوسطة.",
  },
  {
    id: "4",
    name: lang === "en" ? "Mobile Crane MC200" : "رافعة متنقلة MC200",
    category: lang === "en" ? "Cranes" : "رافعات",
    subcategory: lang === "en" ? "Mobile Cranes" : "رافعات متنقلة",
    location: lang === "en" ? "Farwaniya" : "الفروانية",
    governorate: lang === "en" ? "Farwaniya" : "الفروانية",
    dailyRate: 200,
    weeklyRate: 1200,
    available: true,
    image: "/placeholder.svg?height=300&width=400",
    specs: {
      Brand: "Liebherr",
      Model: "MC200",
      "Max Lifting Capacity": "200 tons",
      "Max Boom Length": "72 m",
      "Engine Power": "450 HP",
      "Drive Configuration": "10x6x10",
    },
    description:
      lang === "en"
        ? "High-capacity mobile crane for heavy lifting operations. Features advanced safety systems and precise control."
        : "رافعة متنقلة عالية السعة لعمليات الرفع الثقيلة. تتميز بأنظمة أمان متقدمة وتحكم دقيق.",
  },
  {
    id: "5",
    name: lang === "en" ? "Dump Truck DT500" : "شاحنة قلابة DT500",
    category: lang === "en" ? "Trucks" : "شاحنات",
    subcategory: lang === "en" ? "Dump Trucks" : "شاحنات قلابة",
    location: lang === "en" ? "Jahra" : "الجهراء",
    governorate: lang === "en" ? "Jahra" : "الجهراء",
    dailyRate: 150,
    weeklyRate: 900,
    available: true,
    image: "/placeholder.svg?height=300&width=400",
    specs: {
      Brand: "Volvo",
      Model: "DT500",
      "Payload Capacity": "25 tons",
      "Engine Power": "400 HP",
      "Fuel Type": "Diesel",
      Transmission: "Automatic",
    },
    description:
      lang === "en"
        ? "Heavy-duty dump truck for transporting construction materials. Features a durable body and powerful engine."
        : "شاحنة قلابة ثقيلة لنقل مواد البناء. تتميز بهيكل متين ومحرك قوي.",
  },
  {
    id: "6",
    name: lang === "en" ? "Scissor Lift SL100" : "رافعة مقصية SL100",
    category: lang === "en" ? "Lifts" : "رافعات",
    subcategory: lang === "en" ? "Scissor Lifts" : "رافعات مقصية",
    location: lang === "en" ? "Mangaf" : "المنقف",
    governorate: lang === "en" ? "Ahmadi" : "الأحمدي",
    dailyRate: 75,
    weeklyRate: 450,
    available: false,
    image: "/placeholder.svg?height=300&width=400",
    specs: {
      Brand: "Genie",
      Model: "SL100",
      "Platform Height": "10 m",
      "Platform Capacity": "450 kg",
      "Power Source": "Electric",
      Weight: "2,450 kg",
    },
    description:
      lang === "en"
        ? "Electric scissor lift for elevated work. Provides stable platform with 10-meter working height."
        : "رافعة مقصية كهربائية للعمل المرتفع. توفر منصة مستقرة بارتفاع عمل 10 أمتار.",
  },
]

export default async function EquipmentListingPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  // Get locations and categories data on the server
  const locations = getKuwaitGovernorates()
  const categories = getEquipmentCategories()

  // Get mock equipment data
  const equipment = getMockEquipment(lang)

  // Comparison labels
  const comparisonLabels = {
    compare: lang === "ar" ? "قارن" : "Compare",
    addedToCompare: lang === "ar" ? "تمت الإضافة" : "Added",
    comparisonFull: lang === "ar" ? "المقارنة ممتلئة" : "Comparison full",
    share: lang === "ar" ? "مشاركة" : "Share",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{dict.equipment.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <EquipmentFilters dict={dict.filters} lang={lang} locations={locations} categories={categories} />
        </div>

        <div className="w-full md:w-3/4">
          <EquipmentGrid
            equipment={equipment}
            dict={{
              ...dict.equipment,
              rentNow: lang === "ar" ? "طلب استئجار" : "Request to Rent",
              weeklyRate: lang === "ar" ? "أسبوعياً" : "Weekly",
              compare: comparisonLabels.compare,
              addedToCompare: comparisonLabels.addedToCompare,
              comparisonFull: comparisonLabels.comparisonFull,
              share: comparisonLabels.share,
            }}
            lang={lang}
            showRentButton={true}
            onRentClick={(id) => console.log(`Request to rent equipment ${id}`)}
          />
        </div>
      </div>
    </div>
  )
}
