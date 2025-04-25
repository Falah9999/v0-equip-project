import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PromotionalBannerProps {
  dict: {
    title: string
    description: string
    cta: string
  }
}

export default function PromotionalBanner({ dict }: PromotionalBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{dict.title}</h2>
            <p className="text-lg opacity-90">{dict.description}</p>
            <Button variant="secondary" size="lg">
              {dict.cta}
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Construction equipment"
                width={400}
                height={400}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
