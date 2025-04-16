"use client"

import { useEffect } from "react"

export function PerformanceOptimizations() {
  useEffect(() => {
    // Mark the start of performance measurements
    if (typeof window !== "undefined" && "performance" in window) {
      window.performance.mark("app-rendered")
    }

    // Detect slow connections and apply optimizations
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const connection = (navigator as any).connection
      if (connection && (connection.saveData || connection.effectiveType.includes("2g"))) {
        document.documentElement.classList.add("save-data")
      }
    }

    // Preconnect to critical domains on idle
    if ("requestIdleCallback" in window) {
      ;(window as any).requestIdleCallback(() => {
        const domains = ["https://cal.com", "https://res.cloudinary.com"]
        domains.forEach((domain) => {
          const link = document.createElement("link")
          link.rel = "preconnect"
          link.href = domain
          link.crossOrigin = "anonymous"
          document.head.appendChild(link)
        })
      })
    }

    // Register performance observer to monitor LCP
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          if (entries.length > 0) {
            const lcpEntry = entries[entries.length - 1]
            console.log("LCP:", lcpEntry.startTime)
            // You could send this to analytics
          }
        })
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

        // Monitor CLS
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
          console.log("CLS:", clsValue)
          // You could send this to analytics
        })
        clsObserver.observe({ type: "layout-shift", buffered: true })
      } catch (e) {
        console.error("Performance observer error:", e)
      }
    }

    return () => {
      // Clean up if needed
    }
  }, [])

  return null
}
