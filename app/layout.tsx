import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { IOSFixes } from "@/components/ios-fixes"
import { PerformanceOptimizations } from "@/components/performance-optimizations"
import type { Metadata, Viewport } from "next"
import { OrganizationStructuredData, ServiceStructuredData, FAQStructuredData } from "./structured-data"
import { inter, roboto } from "@/utils/font-optimization"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFF1E8" },
    { media: "(prefers-color-scheme: dark)", color: "#144132" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Algility | AI Systems That Grow B2B Businesses on Autopilot",
  description:
    "Algility builds AI systems that plug into your business and actually get sh*t done—no fluff, just growth. Book a demo today.",
  manifest: "/manifest.json",
  applicationName: "Algility",
  keywords: [
    "AI automation",
    "B2B growth",
    "business automation",
    "AI agency",
    "artificial intelligence for business",
    "AI systems",
    "business growth",
    "AI solutions",
    "B2B automation",
    "AI for sales",
    "AI for marketing",
    "AI for customer service",
    "AI for operations",
    "AI for business growth",
  ],
  authors: [{ name: "Algility", url: "https://algility.com" }],
  creator: "Algility",
  publisher: "Algility",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  metadataBase: new URL("https://algility.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/algility.ico", sizes: "any" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-167x167.png", sizes: "167x167", type: "image/png" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/maskable-icon.png",
      },
    ],
  },
  appleWebApp: {
    title: "Algility",
    statusBarStyle: "default",
    capable: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://algility.com",
    title: "Algility | AI Systems That Grow B2B Businesses on Autopilot",
    description:
      "Algility builds AI systems that plug into your business and actually get sh*t done—no fluff, just growth. Book a demo today.",
    siteName: "Algility",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Algility - AI Systems That Grow B2B Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Algility | AI Systems That Grow B2B Businesses on Autopilot",
    description:
      "Algility builds AI systems that plug into your business and actually get sh*t done—no fluff, just growth. Book a demo today.",
    images: ["/og-image.png"],
    creator: "@algilityai",
    site: "@algilityai",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${roboto.variable}`}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/android-chrome-512x512.png" as="image" type="image/png" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cal.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* Standard favicon */}
        <link rel="icon" href="/algility.ico" sizes="any" />
        <link rel="shortcut icon" href="/algility.ico" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* iOS specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Algility" />

        {/* Android specific meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Algility" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://algility.com" />
      </head>
      <body className={cn("min-h-screen bg-theme antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <IOSFixes />
          <PerformanceOptimizations />
          <OrganizationStructuredData />
          <ServiceStructuredData />
          <FAQStructuredData />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'