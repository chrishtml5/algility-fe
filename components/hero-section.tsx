"use client"
import { Button } from "@/components/ui/button"
import { HeroHeader } from "@/components/hero9-header"
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider"
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur"
import { ChevronRight } from "lucide-react"
import { scrollToElement, getHeaderOffset } from "./scroll-utils"
import { OptimizedVideo } from "./optimized-video"
import { OptimizedImage } from "./optimized-image"
import { EnhancedScrollIndicator } from "./enhanced-scroll-indicator"

export default function HeroSection() {
  const scrollToContactForm = () => {
    scrollToElement("contact-form-section", {
      offset: getHeaderOffset(),
    })
  }

  const scrollToCalendar = () => {
    scrollToElement("calendar-section", {
      offset: getHeaderOffset(),
    })
  }

  // Define sections for the scroll indicator
  const pageSections = [
    { id: "hero-main-section", label: "Hero" },
    { id: "contact-form-section", label: "Contact" },
    { id: "calendar-section", label: "Calendar" },
    { id: "footer", label: "Footer" },
  ]

  return (
    <>
      <HeroHeader scrollToContactForm={scrollToContactForm} />

      {/* Add the enhanced scroll indicator */}
      <EnhancedScrollIndicator showSections={true} sections={pageSections} />

      <main className="overflow-x-hidden min-h-screen flex flex-col bg-theme">
        <section id="hero-main-section" className="flex-grow">
          <div className="py-16 sm:py-20 md:py-24 lg:py-28">
            <div className="relative mx-auto flex max-w-7xl flex-col px-5 sm:px-6 lg:block lg:px-12">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                <h1 className="mt-6 sm:mt-8 max-w-3xl mx-auto lg:mx-0 text-balance text-4xl leading-[1.15] sm:leading-tight md:text-5xl lg:mt-16 lg:text-6xl xl:text-7xl">
                  We Build AI Systems That Grow B2B Businesses on Autopilot
                </h1>
                <p className="mt-6 sm:mt-8 max-w-2xl mx-auto lg:mx-0 text-balance text-lg sm:text-xl md:text-2xl">
                  AI systems that plug into your business and actually get sh*t done—no fluff, just growth.
                </p>

                <div className="mt-8 sm:mt-10 lg:mt-12 w-full flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
                  <Button
                    size="lg"
                    className="h-12 md:h-14 lg:h-16 w-full sm:w-auto rounded-full pl-5 pr-3 text-base md:text-lg lg:text-xl bg-[#144132] text-white hover:bg-[#BEE847] hover:text-zinc-900 transition-colors duration-300"
                    onClick={scrollToContactForm}
                  >
                    <span className="text-nowrap">Get In Touch</span>
                    <ChevronRight className="ml-1 h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                  <Button
                    key={2}
                    size="lg"
                    variant="ghost"
                    className="h-12 md:h-14 lg:h-16 w-full sm:w-auto rounded-full px-5 text-base md:text-lg lg:text-xl hover:bg-zinc-950/5 dark:hover:bg-white/5"
                    onClick={scrollToCalendar}
                    aria-label="Request a demo - opens calendar booking"
                  >
                    <span className="text-nowrap">Request a demo</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/9] absolute inset-1 -z-10 overflow-hidden rounded-3xl border border-black/10 lg:aspect-video lg:rounded-[3rem] dark:border-white/5 bg-theme/30">
              <OptimizedVideo
                src="https://res.cloudinary.com/dg4jhba5c/video/upload/v1741605033/dna_ttplyu.mp4"
                ariaLabel="DNA animation representing AI technology"
                poster="/video-poster.jpg"
              />
            </div>
          </div>
        </section>
        <section className="bg-theme mt-auto py-6 sm:py-8 md:py-10">
          <div className="group relative m-auto max-w-7xl px-5 sm:px-6 lg:px-12">
            <div className="flex flex-col items-center md:flex-row">
              <div className="w-full md:max-w-52 lg:max-w-60 md:border-r md:pr-6 mb-6 md:mb-0">
                <p className="text-center md:text-end text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
                  Automating success for
                </p>
              </div>
              <div className="relative py-6 sm:py-8 w-full md:w-[calc(100%-13rem)] lg:w-[calc(100%-15rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  {[
                    {
                      src: "https://html.tailus.io/blocks/customers/nvidia.svg",
                      alt: "Nvidia Logo",
                      height: 36,
                      width: 120,
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/column.svg",
                      alt: "Column Logo",
                      height: 32,
                      width: 100,
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/github.svg",
                      alt: "GitHub Logo",
                      height: 32,
                      width: 100,
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/nike.svg",
                      alt: "Nike Logo",
                      height: 36,
                      width: 90,
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/lemonsqueezy.svg",
                      alt: "Lemon Squeezy Logo",
                      height: 36,
                      width: 120,
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/laravel.svg",
                      alt: "Laravel Logo",
                      height: 32,
                      width: 100,
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/lilly.svg",
                      alt: "Lilly Logo",
                      height: 44,
                      width: 80,
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/openai.svg",
                      alt: "OpenAI Logo",
                      height: 40,
                      width: 120,
                    },
                  ].map((logo, index) => (
                    <div className="flex" key={index}>
                      <OptimizedImage
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="mx-auto h-auto w-fit dark:invert"
                      />
                    </div>
                  ))}
                </InfiniteSlider>

                <div className="bg-linear-to-r from-theme absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-theme absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
