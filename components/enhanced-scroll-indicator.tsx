"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, useScroll, useSpring } from "motion/react"

interface EnhancedScrollIndicatorProps {
  color?: string
  height?: number
  zIndex?: number
  className?: string
  showPercentage?: boolean
  showSections?: boolean
  sections?: { id: string; label: string }[]
}

export function EnhancedScrollIndicator({
  color = "#144132",
  height = 3,
  zIndex = 30,
  className,
  showPercentage = false,
  showSections = false,
  sections = [],
}: EnhancedScrollIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Use motion for smoother animation
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY

      // Calculate the total scrollable height
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)

      // Set the scroll progress as a percentage (0 to 100)
      setScrollProgress(scrollPercent * 100)

      // Determine active section if sections are provided
      if (showSections && sections.length > 0) {
        for (const section of sections) {
          const element = document.getElementById(section.id)
          if (element) {
            const rect = element.getBoundingClientRect()
            // If the section is in view (with some buffer)
            if (rect.top <= 200 && rect.bottom >= 0) {
              setActiveSection(section.id)
              break
            }
          }
        }
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Call once to set initial position
    handleScroll()

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showSections, sections])

  return (
    <>
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-full pointer-events-none transition-opacity duration-300",
          scrollProgress > 0 ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{
          height: `${height}px`,
          zIndex: zIndex,
        }}
        ref={progressBarRef}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#144132] via-[#BEE847] to-[#144132] rounded-r-sm"
          style={{ scaleX, transformOrigin: "0%" }}
        />
      </motion.div>

      {/* Percentage indicator */}
      {showPercentage && (
        <div
          className={cn(
            "fixed top-4 right-4 bg-[#144132] text-white rounded-full px-2 py-1 text-xs font-medium z-40 transition-opacity duration-300",
            scrollProgress > 0 ? "opacity-100" : "opacity-0",
          )}
        >
          {Math.round(scrollProgress)}%
        </div>
      )}

      {/* Section indicators */}
      {showSections && sections.length > 0 && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                const element = document.getElementById(section.id)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeSection === section.id ? "bg-[#144132] scale-125" : "bg-gray-300 hover:bg-gray-400",
              )}
              title={section.label}
              aria-label={`Scroll to ${section.label} section`}
            />
          ))}
        </div>
      )}
    </>
  )
}
