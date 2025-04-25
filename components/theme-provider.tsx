"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Use a synchronous operation to check if we're in the browser
  const [mounted, setMounted] = React.useState(false)

  // After mounting, we can render the children
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // If not mounted yet, render a placeholder to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
