"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ScrollProgressBarProps {
  color?: string
  height?: number
  zIndex?: number
  className?: string
}

export function ScrollProgressBar({ color = "#144132", height = 3, zIndex = 30, className }: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY

      // Calculate the total scrollable height (total page height minus viewport height)
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)

      // Set the scroll progress as a percentage (0 to 100)
      setScrollProgress(scrollPercent * 100)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Call once to set initial position
    handleScroll()

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full pointer-events-none transition-opacity duration-300",
        scrollProgress > 0 ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{
        height: `${height}px`,
        zIndex: zIndex,
      }}
    >
      <div
        className="h-full bg-gradient-to-r from-[#144132] via-[#BEE847] to-[#144132] rounded-r-sm"
        style={{
          width: `${scrollProgress}%`,
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  )
}
