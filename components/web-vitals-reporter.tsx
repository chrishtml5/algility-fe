"use client"

import { useEffect } from "react"

export function WebVitalsReporter() {
  useEffect(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      // Report LCP (Largest Contentful Paint)
      if ("PerformanceObserver" in window) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            if (entries.length > 0) {
              const lcpEntry = entries[entries.length - 1]
              console.log("LCP:", lcpEntry.startTime)
              // Send to analytics
              // sendToAnalytics({ metric: 'LCP', value: lcpEntry.startTime })
            }
          })
          lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

          // Monitor CLS (Cumulative Layout Shift)
          let clsValue = 0
          const clsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value
              }
            }
            console.log("CLS:", clsValue)
            // Send to analytics
            // sendToAnalytics({ metric: 'CLS', value: clsValue })
          })
          clsObserver.observe({ type: "layout-shift", buffered: true })

          // Monitor FID (First Input Delay)
          const fidObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              const delay = (entry as any).processingStart - (entry as any).startTime
              console.log("FID:", delay)
              // Send to analytics
              // sendToAnalytics({ metric: 'FID', value: delay })
            }
          })
          fidObserver.observe({ type: "first-input", buffered: true })

          // Monitor INP (Interaction to Next Paint)
          const inpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries()
            for (const entry of entries) {
              console.log("INP candidate:", (entry as any).duration)
            }
          })
          inpObserver.observe({ type: "event", buffered: true, durationThreshold: 16 })

          return () => {
            lcpObserver.disconnect()
            clsObserver.disconnect()
            fidObserver.disconnect()
            inpObserver.disconnect()
          }
        } catch (e) {
          console.error("Performance observer error:", e)
        }
      }
    }
  }, [])

  return null
}
