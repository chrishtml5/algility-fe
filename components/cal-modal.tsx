"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CalModal({ isOpen, onClose }: CalModalProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Reset loading state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      setError(null)
    }
  }, [isOpen])

  // Track window dimensions for responsive sizing
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    updateSize()

    // Update size on resize
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Handle iframe load events
  const handleIframeLoad = () => {
    setLoading(false)
  }

  const handleIframeError = () => {
    setLoading(false)
    setError("Failed to load calendar. Please try again later or contact us directly.")
  }

  // Calculate responsive height based on screen size
  const getCalendarHeight = () => {
    const { width, height } = windowSize

    // Default before measurement
    if (height === 0) return "h-[80vh]"

    // Mobile portrait (small phones)
    if (height < 568) return "h-[65vh]"

    // Mobile portrait (medium phones)
    if (height < 667) return "h-[70vh]"

    // Mobile portrait (large phones) / Small tablets
    if (height < 812) return "h-[75vh]"

    // Mobile landscape / Medium tablets
    if (height < 1024) {
      // Landscape orientation on mobile
      if (width > height) return "h-[85vh]"
      return "h-[78vh]"
    }

    // Large tablets / Small laptops
    if (height < 1200) return "h-[80vh]"

    // Desktops / Large laptops
    return "h-[85vh]"
  }

  // Calculate responsive width based on screen size
  const getModalWidth = () => {
    const { width } = windowSize

    // Mobile
    if (width < 640) return "max-w-[95vw]"

    // Small tablets
    if (width < 768) return "max-w-[90vw] sm:max-w-[600px]"

    // Medium tablets / Small laptops
    if (width < 1024) return "max-w-[85vw] sm:max-w-[600px] md:max-w-[700px]"

    // Desktops / Large laptops
    return "max-w-[80vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px]"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("p-0 overflow-hidden max-h-[95vh] w-[95vw]", getModalWidth())}>
        {/* Close button positioned in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 rounded-full p-1.5 bg-white/80 text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className={cn("cal-embed-container w-full relative", getCalendarHeight())}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
              <Loader2 className="h-8 w-8 text-[#144132] animate-spin" />
              <span className="ml-2 text-[#144132] font-medium">Loading calendar...</span>
            </div>
          )}

          {error ? (
            <div className="h-full flex flex-col items-center justify-center">
              <p className="text-red-500 mb-4 text-center">{error}</p>
              <Button
                onClick={() => window.open("mailto:hello@algility.com", "_blank")}
                className="bg-[#144132] hover:bg-[#BEE847] hover:text-black text-white"
              >
                Contact Us Instead
              </Button>
            </div>
          ) : (
            <iframe
              src="https://cal.com/algility/30min?embed=true&layout=month_view&hideEventTypeDetails=false&brandColor=%23144132"
              width="100%"
              height="100%"
              frameBorder="0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="Schedule a demo"
              className="border-0"
              style={{ height: "100%" }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
