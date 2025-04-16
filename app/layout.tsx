import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react'
import { cn } from "@/lib/utils"
import { IOSFixes } from "@/components/ios-fixes"
import { PerformanceOptimizations } from "@/components/performance-optimizations"
import type { Metadata, Viewport } from "next"
import { OrganizationStructuredData, ServiceStructuredData, FAQStructuredData } from "./structured-data"
import { inter, roboto } from "@/utils/font-optimization"

export const viewport: Viewport = {
  themeColor: "#144132",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#144132" />
        <style>{`
          :root {
            background-color: #144132;
            --sat: env(safe-area-inset-top);
          }
          body {
            background-color: #144132 !important;
            padding-top: var(--sat);
          }
          #nprogress, .nprogress-custom-parent {
            display: none !important;
          }
        `}</style>
      </head>
      <body className={cn(
        "min-h-screen font-sans antialiased bg-[#144132]",
        inter.variable,
        roboto.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'