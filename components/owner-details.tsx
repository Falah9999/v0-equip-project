import { Star, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface OwnerDetailsProps {
  owner: {
    id: string
    name: string
    rating: number
    responseTime: string
    memberSince: string
    image?: string
  }
  dict: {
    title: string
    responseTime: string
    memberSince: string
    contact: string
    message: string
  }
}

export default function OwnerDetails({ owner, dict }: OwnerDetailsProps) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">{dict.title}</h3>

      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={owner.image || "/placeholder.svg"} alt={owner.name} />
          <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <div className="font-medium">{owner.name}</div>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{owner.rating}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground mb-6">
        <div className="flex justify-between">
          <span>{dict.responseTime}</span>
          <span className="font-medium text-foreground">{owner.responseTime}</span>
        </div>
        <div className="flex justify-between">
          <span>{dict.memberSince}</span>
          <span className="font-medium text-foreground">{owner.memberSince}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Button className="w-full" variant="outline">
          <Phone className="mr-2 h-4 w-4" />
          {dict.contact}
        </Button>
        <Button className="w-full">
          <MessageCircle className="mr-2 h-4 w-4" />
          {dict.message}
        </Button>
      </div>
    </div>
  )
}
