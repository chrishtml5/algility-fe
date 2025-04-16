"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

interface ScrollToTopButtonProps {
  showAfter?: number // Scroll position in pixels to show the button
  position?: "bottom-right" | "bottom-left" | "bottom-center"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ScrollToTopButton({
  showAfter = 300,
  position = "bottom-right",
  size = "md",
  className,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Handle scroll event to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter)
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
        return "h-10 w-10 text-sm"
      case "lg":
        return "h-14 w-14 text-lg"
      case "md":
      default:
        return "h-12 w-12 text-base"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={cn(
            "fixed z-50 rounded-full bg-[#144132] text-white shadow-lg hover:bg-[#BEE847] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#BEE847] focus:ring-offset-2 transition-colors duration-300",
            getPositionClasses(),
            getSizeClasses(),
            className,
          )}
        >
          <ArrowUp className="h-5 w-5 m-auto" />
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
