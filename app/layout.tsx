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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Algility" />
        <meta name="theme-color" content="#144132" />
        <style>{`
          :root, body, html {
            background: #144132 !important;
            -webkit-tap-highlight-color: transparent;
          }
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: env(safe-area-inset-top);
            background: #144132;
            z-index: 9999;
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