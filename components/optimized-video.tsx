"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedVideoProps {
  src: string
  className?: string
  ariaLabel?: string
  poster?: string
  width?: number
  height?: number
}

export function OptimizedVideo({ src, className, ariaLabel, poster, width, height }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLowQuality, setIsLowQuality] = useState(false)

  // Detect slow connections
  useEffect(() => {
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const connection = (navigator as any).connection
      if (connection && (connection.saveData || connection.effectiveType.includes("2g"))) {
        setIsLowQuality(true)
      }
    }
  }, [])

  // Set up intersection observer to load video only when visible
  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(videoRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Load and play video when visible
  useEffect(() => {
    if (!videoRef.current || !isVisible) return

    const videoElement = videoRef.current

    // For low quality connections, use a lower resolution or poster image
    if (isLowQuality && poster) {
      videoElement.poster = poster
      videoElement.preload = "none"
    } else {
      videoElement.preload = "auto"

      // Load and play video
      const playVideo = async () => {
        try {
          if (videoElement.readyState < 2) {
            await new Promise((resolve) => {
              videoElement.addEventListener("loadeddata", resolve, { once: true })
            })
          }

          setIsLoaded(true)
          videoElement.play().catch((err) => console.error("Video play error:", err))
        } catch (error) {
          console.error("Video loading error:", error)
        }
      }

      playVideo()
    }
  }, [isVisible, isLowQuality, poster])

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
        />
      )}
      <video
        ref={videoRef}
        autoPlay={!isLowQuality}
        loop
        muted
        playsInline
        className={cn(
          "size-full -scale-x-100 object-cover opacity-40 invert dark:opacity-35 dark:invert-0 dark:lg:opacity-75",
          isLoaded ? "opacity-40" : "opacity-0",
          className,
        )}
        aria-label={ariaLabel || "Background video"}
        poster={poster}
        width={width}
        height={height}
        onLoadedData={() => setIsLoaded(true)}
      >
        {isVisible && <source src={src} type="video/mp4" />}
      </video>
    </div>
  )
}
