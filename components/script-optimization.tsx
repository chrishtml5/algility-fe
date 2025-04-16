"use client"

import { useEffect } from "react"

export function ScriptOptimization() {
  useEffect(() => {
    // Function to load non-critical scripts
    const loadNonCriticalScripts = () => {
      // Example: Analytics script
      const analyticsScript = document.createElement("script")
      analyticsScript.src = "https://example.com/analytics.js"
      analyticsScript.async = true
      document.body.appendChild(analyticsScript)

      // Example: Chat widget
      const chatScript = document.createElement("script")
      chatScript.src = "https://example.com/chat-widget.js"
      chatScript.async = true
      document.body.appendChild(chatScript)
    }

    // Load non-critical scripts after page load
    if (document.readyState === "complete") {
      loadNonCriticalScripts()
    } else {
      window.addEventListener("load", loadNonCriticalScripts)
    }

    // Clean up
    return () => {
      window.removeEventListener("load", loadNonCriticalScripts)
    }
  }, [])

  return null
}
