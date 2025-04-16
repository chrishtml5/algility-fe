/**
 * Utility functions for smooth scrolling with better mobile support
 */
import { isIOSSafari } from "@/utils/device-detection"

/**
 * Scrolls to an element with improved mobile support
 * @param elementId - The ID of the element to scroll to
 * @param options - Scroll options
 */
export function scrollToElement(
  elementId: string,
  options: {
    offset?: number
    duration?: number
    onComplete?: () => void
    delay?: number
  } = {},
) {
  const { offset = 0, duration = 1000, onComplete, delay = 0 } = options

  // Delay the scroll if needed (useful after menu closing animations)
  setTimeout(() => {
    const element = document.getElementById(elementId)
    if (!element) return

    // Get the element's position
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.scrollY - offset

    // iOS Safari specific handling
    if (isIOSSafari()) {
      // iOS Safari has issues with smooth scrolling behavior
      // Use a more controlled approach with requestAnimationFrame
      const startPosition = window.scrollY
      const distance = offsetPosition - startPosition
      const startTime = performance.now()

      // Use a slightly shorter duration on iOS for better responsiveness
      const iosDuration = Math.min(duration, 800)

      function step(currentTime: number) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / iosDuration, 1)

        // Use a custom easing function that works better with iOS momentum scrolling
        // This cubic bezier approximation feels more natural on iOS
        const easeProgress = cubicBezier(0.25, 0.1, 0.25, 1.0, progress)

        window.scrollTo(0, startPosition + distance * easeProgress)

        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else if (onComplete) {
          // Add a small delay before calling onComplete to let iOS finish any momentum scrolling
          setTimeout(onComplete, 100)
        }
      }

      window.requestAnimationFrame(step)
      return
    }

    // Check if browser supports smooth scrolling
    if ("scrollBehavior" in document.documentElement.style) {
      // Modern browsers with native smooth scrolling
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Call onComplete after animation (approximated)
      if (onComplete) {
        setTimeout(onComplete, duration)
      }
    } else {
      // Fallback for browsers without smooth scrolling
      // Using a simple easing function
      const startPosition = window.scrollY
      const distance = offsetPosition - startPosition
      const startTime = performance.now()

      function step(currentTime: number) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function: easeInOutQuad
        const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

        window.scrollTo(0, startPosition + distance * easeProgress)

        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else if (onComplete) {
          onComplete()
        }
      }

      window.requestAnimationFrame(step)
    }
  }, delay)
}

/**
 * Calculates the appropriate header offset based on screen size and device
 */
export function getHeaderOffset(): number {
  // iOS Safari needs extra offset due to the way it handles the address bar
  const iosSafariExtra = isIOSSafari() ? 10 : 0

  // Responsive offset based on screen size
  if (window.innerWidth < 640) {
    return 70 + iosSafariExtra // Small mobile devices
  } else if (window.innerWidth < 768) {
    return 80 + iosSafariExtra // Larger mobile devices
  } else if (window.innerWidth < 1024) {
    return 90 + iosSafariExtra // Tablets
  } else {
    return 100 // Desktop
  }
}

/**
 * Cubic bezier function for natural easing
 * This provides a more natural feel for iOS scrolling
 */
function cubicBezier(x1: number, y1: number, x2: number, y2: number, t: number): number {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by

  function sampleCurveX(t: number): number {
    return ((ax * t + bx) * t + cx) * t
  }

  function sampleCurveY(t: number): number {
    return ((ay * t + by) * t + cy) * t
  }

  function sampleCurveDerivativeX(t: number): number {
    return (3 * ax * t + 2 * bx) * t + cx
  }

  function solveCurveX(x: number, epsilon = 1e-6): number {
    let t0 = 0
    let t1 = 1
    let t2 = x

    if (x <= 0) return 0
    if (x >= 1) return 1

    for (let i = 0; i < 8; i++) {
      const x2 = sampleCurveX(t2)
      if (Math.abs(x2 - x) < epsilon) return t2
      const d2 = sampleCurveDerivativeX(t2)
      if (Math.abs(d2) < epsilon) break
      t2 = t2 - (x2 - x) / d2
    }

    // Fallback to bisection method
    while (t0 < t1) {
      const x2 = sampleCurveX(t2)
      if (Math.abs(x2 - x) < epsilon) return t2
      if (x > x2) t0 = t2
      else t1 = t2
      t2 = (t1 - t0) * 0.5 + t0
    }

    return t2
  }

  return sampleCurveY(solveCurveX(t))
}
