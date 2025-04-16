"use client"

import { useEffect } from "react"
import { isIOS } from "@/utils/device-detection"

export function IOSFixes() {
  useEffect(() => {
    if (!isIOS()) return

    // Fix for iOS Safari 100vh issue
    const setIOSVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Set on initial load
    setIOSVh()

    // iOS Safari specific fixes
    if (typeof document !== 'undefined') {
      // Fix for iOS Safari scroll momentum
      (document.body.style as any)['-webkit-overflow-scrolling'] = 'touch'
  
      // Fix for iOS Safari elastic bounce effect
      document.body.style.overscrollBehaviorY = "none"
  
      // Prevent pull-to-refresh
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    }

    // Fix for iOS Safari double-tap zoom
    const meta = document.createElement("meta")
    meta.name = "viewport"
    meta.content = "width=device-width, initial-scale=1, maximum-scale=1"
    document.head.appendChild(meta)

    // Event listeners
    window.addEventListener("resize", setIOSVh)
    window.addEventListener("orientationchange", () => {
      setTimeout(setIOSVh, 100)
    })

    return () => {
      window.removeEventListener("resize", setIOSVh)
      window.removeEventListener("orientationchange", setIOSVh)
      if (meta.parentNode) {
        document.head.removeChild(meta)
      }
      // Cleanup styles
      if (typeof document !== 'undefined') {
        (document.body.style as any)['-webkit-overflow-scrolling'] = ''
        document.body.style.overscrollBehaviorY = ''
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.height = ''
      }
    }
  }, [])

  return null
}
