import type { Locale } from "@/lib/i18n-config"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface RentalRequestsProps {
  requests: any[]
  dict: {
    approve: string
    decline: string
  }
  lang: Locale
}

export default function RentalRequests({ requests, dict, lang }: RentalRequestsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            {lang === "en" ? "Pending" : "قيد الانتظار"}
          </Badge>
        )
      case "approved":
        return <Badge className="bg-green-500">{lang === "en" ? "Approved" : "تمت الموافقة"}</Badge>
      case "declined":
        return <Badge variant="destructive">{lang === "en" ? "Declined" : "مرفوض"}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{lang === "en" ? "Equipment" : "المعدات"}</TableHead>
            <TableHead>{lang === "en" ? "Renter" : "المستأجر"}</TableHead>
            <TableHead>{lang === "en" ? "Dates" : "التواريخ"}</TableHead>
            <TableHead>{lang === "en" ? "Status" : "الحالة"}</TableHead>
            <TableHead>{lang === "en" ? "Actions" : "الإجراءات"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.equipmentName}</TableCell>
              <TableCell>{request.renterName}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>
                    {lang === "en" ? "From: " : "من: "}
                    {new Date(request.startDate).toLocaleDateString()}
                  </div>
                  <div>
                    {lang === "en" ? "To: " : "إلى: "}
                    {new Date(request.endDate).toLocaleDateString()}
                  </div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell>
                {request.status === "pending" ? (
                  <div className="flex space-x-2">
                    <Button size="sm" className="h-8 bg-green-500 hover:bg-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      {dict.approve}
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8">
                      <X className="h-4 w-4 mr-1" />
                      {dict.decline}
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="h-8">
                    {lang === "en" ? "View Details" : "عرض التفاصيل"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
