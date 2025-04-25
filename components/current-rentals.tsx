import Image from "next/image"
import Link from "next/link"
import type { Locale } from "@/lib/i18n-config"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

interface CurrentRentalsProps {
  rentals: any[]
  dict: {
    viewDetails: string
  }
  lang: Locale
}

export default function CurrentRentals({ rentals, dict, lang }: CurrentRentalsProps) {
  if (rentals.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <p className="text-muted-foreground">
          {lang === "en"
            ? "You don't have any active rentals at the moment."
            : "ليس لديك أي إيجارات نشطة في الوقت الحالي."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rentals.map((rental) => (
        <Card key={rental.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={rental.image || "/placeholder.svg"} alt={rental.equipmentName} fill className="object-cover" />
            <Badge className="absolute top-2 right-2 bg-green-500">{lang === "en" ? "Active" : "نشط"}</Badge>
          </div>
          <CardHeader className="p-4 pb-0">
            <CardTitle className="text-lg">{rental.equipmentName}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="text-sm text-muted-foreground space-y-1">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                {lang === "en" ? "Owner: " : "المالك: "}
                {rental.ownerName}
              </div>
              <div className="font-semibold mt-2">
                {lang === "en" ? "Total: " : "المجموع: "}
                {rental.totalCost} KWD
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/${lang}/equipment/${rental.equipmentId}`}>{dict.viewDetails}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
