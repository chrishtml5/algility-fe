"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ src, alt, width, height, className, priority = false }: OptimizedImageProps) {
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

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        width: width || "100%",
        height: height || "auto",
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        quality={isLowQuality ? 60 : 85}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
        style={{
          objectFit: "cover",
        }}
      />
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
        />
      )}
    </div>
  )
}
