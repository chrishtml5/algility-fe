"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedScrollToTopProps {
  showAfter?: number
  position?: "bottom-right" | "bottom-left" | "bottom-center"
  size?: "sm" | "md" | "lg"
  className?: string
  showProgress?: boolean
  variant?: "circle" | "pill" | "floating"
}

export function EnhancedScrollToTop({
  showAfter = 300,
  position = "bottom-right",
  size = "md",
  className,
  showProgress = true,
  variant = "circle",
}: EnhancedScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Handle scroll event to show/hide button and update progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > showAfter)

      // Calculate scroll progress percentage
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollY / (docHeight - winHeight)
      setScrollProgress(Math.min(scrollPercent * 100, 100))
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Call once to set initial state
    handleScroll()

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showAfter])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "left-4 sm:left-6 bottom-4 sm:bottom-6"
      case "bottom-center":
        return "left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6"
      case "bottom-right":
      default:
        return "right-4 sm:right-6 bottom-4 sm:bottom-6"
    }
  }

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return variant === "pill" ? "h-8 px-3 text-xs" : "h-10 w-10 text-sm"
      case "lg":
        return variant === "pill" ? "h-12 px-5 text-base" : "h-14 w-14 text-lg"
      case "md":
      default:
        return variant === "pill" ? "h-10 px-4 text-sm" : "h-12 w-12 text-base"
    }
  }

  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "pill":
        return "rounded-full flex items-center justify-center gap-2"
      case "floating":
        return "rounded-lg shadow-xl"
      case "circle":
      default:
        return "rounded-full"
    }
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed z-50 bg-[#144132] text-white shadow-lg hover:bg-[#BEE847] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#BEE847] focus:ring-offset-2 transition-colors duration-300",
        getPositionClasses(),
        getSizeClasses(),
        getVariantClasses(),
        className,
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s, transform 0.3s",
      }}
    >
      {showProgress && variant === "circle" && (
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <circle className="text-white/10 stroke-current" strokeWidth="4" fill="transparent" r="42" cx="50" cy="50" />
          <circle
            className="text-[#BEE847] stroke-current transform -rotate-90 origin-center"
            strokeWidth="4"
            strokeDasharray="264"
            strokeDashoffset={264 - (264 * scrollProgress) / 100}
            strokeLinecap="round"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
        </svg>
      )}

      <div className={cn("flex items-center justify-center", variant === "circle" ? "relative z-10" : "")}>
        <ArrowUp className={cn("h-5 w-5", variant === "pill" && "h-4 w-4")} />
        {variant === "pill" && <span>Top</span>}
      </div>

      <span className="sr-only">Scroll to top</span>
    </button>
  )
}
