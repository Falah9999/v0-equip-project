"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { EquipmentItem } from "@/components/equipment-card"

type ComparisonContextType = {
  comparisonItems: EquipmentItem[]
  addToComparison: (item: EquipmentItem) => void
  removeFromComparison: (id: string) => void
  clearComparison: () => void
  isInComparison: (id: string) => boolean
  maxItems: number
  isComparisonFull: boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children, maxItems = 4 }: { children: ReactNode; maxItems?: number }) {
  const [comparisonItems, setComparisonItems] = useState<EquipmentItem[]>([])
  const isComparisonFull = comparisonItems.length >= maxItems

  // Load comparison items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem("comparisonItems")
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems)
        if (Array.isArray(parsedItems)) {
          setComparisonItems(parsedItems)
        }
      } catch (error) {
        console.error("Failed to parse comparison items from localStorage:", error)
      }
    }
  }, [])

  // Save comparison items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("comparisonItems", JSON.stringify(comparisonItems))
  }, [comparisonItems])

  const addToComparison = (item: EquipmentItem) => {
    if (comparisonItems.length >= maxItems) return
    if (comparisonItems.some((i) => i.id === item.id)) return

    setComparisonItems((prev) => [...prev, item])
  }

  const removeFromComparison = (id: string) => {
    setComparisonItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearComparison = () => {
    setComparisonItems([])
  }

  const isInComparison = (id: string) => {
    return comparisonItems.some((item) => item.id === id)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonItems,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        maxItems,
        isComparisonFull,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
