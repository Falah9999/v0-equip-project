"use server"

import { getEquipmentById } from "@/lib/data"
import type { EquipmentItem } from "@/components/equipment-card"

export async function getEquipmentByIds(ids: string[]): Promise<EquipmentItem[]> {
  try {
    // Load each shared item
    const items = await Promise.all(ids.map((id) => getEquipmentById(id)))

    // Filter out any null items
    return items.filter(Boolean) as EquipmentItem[]
  } catch (error) {
    console.error("Error loading equipment items:", error)
    return []
  }
}
