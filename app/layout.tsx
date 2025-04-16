import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react'
import { cn } from "@/lib/utils"
import { IOSFixes } from "@/components/ios-fixes"
import { PerformanceOptimizations } from "@/components/performance-optimizations"
import type { Viewport } from "next"
import { inter, roboto } from "@/utils/font-optimization"

export const viewport: Viewport = {
  themeColor: "#144132",
  width: "device-width",
  initialScale: 1,
  maximumScale: 2.5,
  userScalable: true,
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
        <meta name="theme-color" content="#144132" />
        <style>{`
          :root {
            background: #144132 !important;
            color-scheme: only light;
            --vh: 1vh;
          }
          html, body {
            background: #144132 !important;
            height: 100%;
            min-height: -webkit-fill-available;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-y: none;
            position: relative;
            touch-action: pan-y;
          }
          * {
            -webkit-tap-highlight-color: transparent;
            scroll-behavior: smooth;
            box-sizing: border-box;
          }
          input, textarea, select, button {
            font-size: 16px !important;
            padding: 12px !important;
            touch-action: manipulation;
            -webkit-appearance: none;
          }
          button {
            cursor: pointer;
            min-height: 44px;
            min-width: 44px;
          }
          .min-h-screen {
            min-height: calc(var(--vh, 1vh) * 100);
          }
          @supports (-webkit-touch-callout: none) {
            body {
              padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
            }
          }
        `}</style>
      </head>
      <body 
        className={cn(
          "min-h-screen font-sans antialiased bg-[#144132] overflow-x-hidden",
          inter.variable,
          roboto.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
        >
          {children}
          <Analytics />
          <IOSFixes />
          <PerformanceOptimizations />
        </ThemeProvider>
      </body>
    </html>
  )
}

