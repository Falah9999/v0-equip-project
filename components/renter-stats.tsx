import { DollarSign, Package, Clock, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RenterStatsProps {
  rentals: any[]
  dict: {
    currentRentals: string
    rentalHistory: string
  }
}

export default function RenterStats({ rentals, dict }: RenterStatsProps) {
  // Calculate stats
  const activeRentals = rentals.filter((rental) => rental.status === "active").length
  const completedRentals = rentals.filter((rental) => rental.status === "completed").length

  // Mock total spent and upcoming rentals
  const totalSpent = rentals.reduce((sum, rental) => sum + rental.totalCost, 0)
  const upcomingRentals = 1

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{dict.currentRentals}</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeRentals}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{dict.rentalHistory}</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedRentals}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Rentals</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingRentals}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSpent} KWD</div>
        </CardContent>
      </Card>
    </div>
  )
}
