"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Truck, Hammer, Shovel, Forklift, Wrench, ConeIcon as Crane } from "lucide-react"
import type { Locale } from "@/lib/i18n-config"

interface CategoryGridProps {
  dict: {
    excavators: string
    loaders: string
    trucks: string
    cranes: string
    tools: string
    other: string
  }
  lang: Locale
}

export default function CategoryGrid({ dict, lang }: CategoryGridProps) {
  const [mounted, setMounted] = useState(false)

  // Only run after client-side hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const categories = [
    {
      id: "excavators",
      name: dict.excavators,
      icon: Shovel,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "loaders",
      name: dict.loaders,
      icon: Forklift,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "trucks",
      name: dict.trucks,
      icon: Truck,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "cranes",
      name: dict.cranes,
      icon: Crane,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "tools",
      name: dict.tools,
      icon: Wrench,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "other",
      name: dict.other,
      icon: Hammer,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Don't render the full component until after client-side hydration
  if (!mounted) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-24 bg-muted rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/${lang}/equipment?category=${category.id}`}
          className="flex flex-col items-center p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-3">
            <category.icon className="h-8 w-8 text-primary" />
          </div>
          <span className="text-sm font-medium text-center">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
