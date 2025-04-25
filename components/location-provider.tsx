"use client"

import type React from "react"

import { createContext, useContext } from "react"

// Define the location data structure
export type LocationGroup = {
  id: string
  name: string
  areas: {
    id: string
    name: string
  }[]
}

// Create a context for the location data
const LocationContext = createContext<LocationGroup[]>([])

// Create a hook to access the location data
export function useLocations() {
  return useContext(LocationContext)
}

// Create a provider component to pass the location data to children
export function LocationProvider({
  children,
  locations,
}: {
  children: React.ReactNode
  locations: LocationGroup[]
}) {
  return <LocationContext.Provider value={locations}>{children}</LocationContext.Provider>
}
