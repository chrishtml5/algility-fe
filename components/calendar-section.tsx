"use client"

import { useEffect, useRef, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { isIOS, isIOSSafari } from "@/utils/device-detection"

export default function CalendarSection() {
  const calendarRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOSDevice, setIsIOSDevice] = useState(false)

  // Detect mobile devices and iOS
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()
    setIsIOSDevice(isIOS())

    // Listen for resize events
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: "30min" })
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#EFF1E8" },
          dark: { "cal-brand": "#BEE847" },
        },
        hideEventTypeDetails: false,
        layout: isMobile ? "mobile_month_view" : "month_view",
      })
    })()
  }, [isMobile])

  // iOS Safari specific handling for calendar
  useEffect(() => {
    if (isIOSSafari() && calendarRef.current) {
      // Add specific styles for iOS Safari
      const calendarElement = calendarRef.current

      // Force repaint to fix rendering issues on iOS Safari
      const forceRepaint = () => {
        if (calendarElement) {
          calendarElement.style.display = "none"
          // Trigger reflow
          void calendarElement.offsetHeight
          calendarElement.style.display = ""
        }
      }

      // Apply after a short delay to ensure calendar is loaded
      setTimeout(forceRepaint, 500)

      // Also apply on orientation change
      window.addEventListener("orientationchange", () => {
        setTimeout(forceRepaint, 300)
      })
    }
  }, [])

  return (
    <section id="calendar-section" className="p-0 bg-theme w-full" ref={calendarRef} aria-labelledby="calendar-heading">
      {/* Hidden heading for SEO and accessibility */}
      <h2 id="calendar-heading" className="sr-only">
        Schedule a Demo with Algility
      </h2>

      {/* Divider with Algility icon - with balanced padding */}
      <div className="py-8 sm:py-10 md:py-12">
        <div className="relative w-full h-[2px] bg-[#144132]/10 mx-auto max-w-[90%] sm:max-w-[85%] md:max-w-[80%]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-theme p-3 sm:p-4 rounded-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 relative flex items-center justify-center">
              <svg
                viewBox="0 0 747.93 789.46"
                className="w-full h-full"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon points="612.39 69.43 612.39 237.04 244.18 557.87 244.18 695.97 117.82 695.97 117.82 500.38 244.18 390.27 612.39 69.43" />
                <polygon points="612.39 390.26 612.39 695.97 486.03 695.97 486.03 500.37 612.39 390.26" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full">
        <div
          className={`${isMobile ? "h-[500px]" : "h-[600px] md:h-[650px] lg:h-[700px]"} overflow-hidden`}
          style={{
            // Add iOS Safari specific styles
            WebkitOverflowScrolling: "touch",
            // Fix height calculation on iOS
            height: isIOSDevice ? (isMobile ? "500px" : "calc(var(--vh, 1vh) * 65)") : undefined,
          }}
        >
          <Cal
            namespace="30min"
            calLink="algility/30min"
            style={{
              width: "100%",
              height: "100%",
              overflow: "scroll",
              // Fix for iOS Safari rendering issues
              transform: isIOSDevice ? "translateZ(0)" : undefined,
              WebkitTransform: isIOSDevice ? "translateZ(0)" : undefined,
            }}
            config={{
              layout: isMobile ? "mobile_month_view" : "month_view",
              theme: "light",
            }}
          />
        </div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx global>{`
        @media (max-width: 767px) {
          /* Ensure buttons and interactive elements are large enough for touch */
          .cal-embed button, 
          .cal-embed a, 
          .cal-embed [role="button"] {
            min-height: 44px !important;
            min-width: 44px !important;
          }
          
          /* Prevent horizontal overflow */
          .cal-embed {
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
          
          /* Increase font size for better readability */
          .cal-embed {
            font-size: 16px !important;
          }
        }
        
        /* iOS Safari specific fixes */
        @supports (-webkit-touch-callout: none) {
          /* Fix for iOS Safari scrolling */
          .cal-embed {
            -webkit-overflow-scrolling: touch !important;
          }
          
          /* Fix for iOS Safari tap highlight */
          .cal-embed button, 
          .cal-embed a, 
          .cal-embed [role="button"] {
            -webkit-tap-highlight-color: transparent !important;
          }
          
          /* Fix for iOS Safari input zoom */
          .cal-embed input, 
          .cal-embed select, 
          .cal-embed textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
