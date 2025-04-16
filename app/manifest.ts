import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Algility - AI Systems That Grow B2B Businesses",
    short_name: "Algility",
    description: "AI systems that plug into your business and actually get sh*t done—no fluff, just growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#EFF1E8",
    theme_color: "#144132",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Contact Us",
        short_name: "Contact",
        description: "Get in touch with Algility",
        url: "/#contact-form-section",
        icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Schedule a Demo",
        short_name: "Demo",
        description: "Schedule a demo with Algility",
        url: "/#calendar-section",
        icons: [{ src: "/android-chrome-192x192.png", sizes: "192x192" }],
      },
    ],
    screenshots: [
      {
        src: "/screenshot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshot-narrow.png",
        sizes: "720x1280",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
    categories: ["business", "productivity", "technology"],
    lang: "en-US",
    dir: "ltr",
  }
}
