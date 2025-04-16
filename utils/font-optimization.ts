import { Inter, Roboto } from "next/font/google"

// Define fonts with proper subsets and display settings
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
})

// Helper function to get font CSS variables
export function getFontVariables() {
  return {
    "--font-inter": inter.style.fontFamily,
    "--font-roboto": roboto.style.fontFamily,
  }
}
