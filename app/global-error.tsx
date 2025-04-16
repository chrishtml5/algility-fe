"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#EFF1E8] px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-[#144132] mb-4">Error</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#144132] mb-6">Something went wrong</h2>
          <p className="text-lg md:text-xl text-[#2A6B4F] max-w-md mb-8">
            We apologize for the inconvenience. Please try again later.
          </p>
          <button
            onClick={reset}
            className="rounded-full px-6 py-3 text-base font-medium bg-[#144132] text-white hover:bg-[#BEE847] hover:text-zinc-900 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
