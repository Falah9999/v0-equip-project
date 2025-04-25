"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface SwipeHandlerProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  disabled?: boolean
}

export function SwipeHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  disabled = false,
}: SwipeHandlerProps) {
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    if (disabled) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      if (!touchStartX.current || !touchEndX.current) return

      const distance = touchStartX.current - touchEndX.current
      const isLeftSwipe = distance > threshold
      const isRightSwipe = distance < -threshold

      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft()
      }

      if (isRightSwipe && onSwipeRight) {
        onSwipeRight()
      }

      // Reset values
      touchStartX.current = null
      touchEndX.current = null
    }

    const element = document.body

    element.addEventListener("touchstart", handleTouchStart)
    element.addEventListener("touchmove", handleTouchMove)
    element.addEventListener("touchend", handleTouchEnd)

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
      element.removeEventListener("touchmove", handleTouchMove)
      element.removeEventListener("touchend", handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, threshold, disabled])

  return <>{children}</>
}
