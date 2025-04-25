import type { Locale } from "@/lib/i18n-config"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface RentalHistoryProps {
  rentals: any[]
  dict: {
    viewDetails: string
  }
  lang: Locale
}

export default function RentalHistory({ rentals, dict, lang }: RentalHistoryProps) {
  if (rentals.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg">
        <p className="text-muted-foreground">
          {lang === "en" ? "You don't have any rental history yet." : "ليس لديك أي سجل إيجار حتى الآن."}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{lang === "en" ? "Equipment" : "المعدات"}</TableHead>
            <TableHead>{lang === "en" ? "Owner" : "المالك"}</TableHead>
            <TableHead>{lang === "en" ? "Dates" : "التواريخ"}</TableHead>
            <TableHead>{lang === "en" ? "Total" : "المجموع"}</TableHead>
            <TableHead>{lang === "en" ? "Actions" : "الإجراءات"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell className="font-medium">{rental.equipmentName}</TableCell>
              <TableCell>{rental.ownerName}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>
                    {lang === "en" ? "From: " : "من: "}
                    {new Date(rental.startDate).toLocaleDateString()}
                  </div>
                  <div>
                    {lang === "en" ? "To: " : "إلى: "}
                    {new Date(rental.endDate).toLocaleDateString()}
                  </div>
                </div>
              </TableCell>
              <TableCell>{rental.totalCost} KWD</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" className="h-8">
                  {dict.viewDetails}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
