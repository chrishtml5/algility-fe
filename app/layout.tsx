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
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="standalone" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#144132" />
        <style>{`
          :root {
            background: #144132 !important;
            color-scheme: only light;
          }
          html {
            background: #144132 !important;
            height: 100%;
            padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
          }
          body {
            background: #144132 !important;
            min-height: 100%;
          }
          @supports (-webkit-touch-callout: none) {
            .min-h-screen {
              min-height: -webkit-fill-available;
            }
          }
        `}</style>
      </head>
      <body className={cn("min-h-screen font-sans antialiased bg-[#144132]", inter.variable, roboto.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'