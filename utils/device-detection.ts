/**
 * Utility functions for device and browser detection
 */

/**
 * Detects if the current device is running iOS
 */
export function isIOS(): boolean {
  if (typeof window === "undefined") return false

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  )
}

/**
 * Detects if the current browser is Safari
 */
export function isSafari(): boolean {
  if (typeof window === "undefined") return false

  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /Apple/.test(navigator.vendor)
}

/**
 * Detects if the current browser is iOS Safari
 */
export function isIOSSafari(): boolean {
  return isIOS() && isSafari()
}

/**
 * Gets the real viewport height (addressing iOS Safari 100vh issue)
 */
export function getRealViewportHeight(): number {
  if (typeof window === "undefined") return 0

  return window.innerHeight
}
