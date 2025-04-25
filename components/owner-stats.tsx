import { DollarSign, Package, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OwnerStatsProps {
  equipment: any[]
  requests: any[]
  dict: {
    equipmentStats: string
    totalEquipment: string
    activeRentals: string
    pendingRequests: string
    monthlyEarnings: string
  }
}

export default function OwnerStats({ equipment, requests, dict }: OwnerStatsProps) {
  // Calculate stats
  const totalEquipment = equipment.length
  const activeRentals = equipment.filter((item) => item.status === "rented").length
  const pendingRequests = requests.filter((req) => req.status === "pending").length

  // Mock monthly earnings
  const monthlyEarnings = 2450

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{dict.totalEquipment}</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEquipment}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{dict.activeRentals}</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeRentals}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{dict.pendingRequests}</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingRequests}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{dict.monthlyEarnings}</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{monthlyEarnings} KWD</div>
        </CardContent>
      </Card>
    </div>
  )
}
