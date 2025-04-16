"use client"

import { useEffect } from "react"
import { isIOS } from "@/utils/device-detection"

export function IOSFixes() {
  useEffect(() => {
    if (!isIOS()) return

    const setIOSVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setIOSVh()

    if (typeof document !== 'undefined') {
      (document.body.style as any)['-webkit-overflow-scrolling'] = 'touch'
      document.body.style.overscrollBehaviorY = "contain"
    }

    window.addEventListener("resize", setIOSVh)
    window.addEventListener("orientationchange", () => {
      setTimeout(setIOSVh, 100)
    })

    return () => {
      window.removeEventListener("resize", setIOSVh)
      window.removeEventListener("orientationchange", setIOSVh)
      if (typeof document !== 'undefined') {
        (document.body.style as any)['-webkit-overflow-scrolling'] = ''
        document.body.style.overscrollBehaviorY = ''
      }
    }
  }, [])

  return null
}
