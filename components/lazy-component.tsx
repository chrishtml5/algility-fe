"use client"

import { useEffect, useState, useRef, type ReactNode } from "react"

interface LazyComponentProps {
  children: ReactNode
  placeholder?: ReactNode
  threshold?: number
}

export function LazyComponent({ children, placeholder, threshold = 0.1 }: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return (
    <div ref={ref} className="contain-layout">
      {isVisible ? children : placeholder || <div className="h-40 bg-gray-100 animate-pulse rounded-md" />}
    </div>
  )
}
