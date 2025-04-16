"use client"
import Link from "next/link"
import { Logo } from "./logo"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { scrollToElement, getHeaderOffset } from "./scroll-utils"
import { ScrollProgressBar } from "./scroll-progress-bar"

const menuItems = [
  { name: "Services", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "Case Studies", href: "#link" },
  { name: "Team", href: "#link" },
  { name: "FAQ", href: "#link" },
]

interface HeroHeaderProps {
  scrollToContactForm: () => void
}

export const HeroHeader = ({ scrollToContactForm }: HeroHeaderProps) => {
  const [menuState, setMenuState] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close menu when user resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuState) {
        setMenuState(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [menuState])

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuState])

  // Handle contact form scroll with menu closing if needed
  const handleContactClick = () => {
    if (menuState) {
      setMenuState(false)
      // Add a small delay to allow menu closing animation to complete
      scrollToElement("contact-form-section", {
        offset: getHeaderOffset(),
        delay: 300,
      })
    } else {
      scrollToElement("contact-form-section", {
        offset: getHeaderOffset(),
      })
    }
  }

  return (
    <header>
      {/* Add ScrollProgressBar component */}
      <ScrollProgressBar />

      <nav data-state={menuState && "active"} className="fixed z-20 w-full pt-2">
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-3xl px-5 sm:px-6 transition-all duration-300 lg:px-12",
            scrolled && "bg-theme/80 backdrop-blur-2xl",
            menuState && "bg-theme/80 backdrop-blur-2xl",
          )}
        >
          <div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-4 sm:gap-6 py-3 duration-200 lg:gap-0 lg:py-6",
              scrolled && "lg:py-4",
            )}
          >
            <div className="flex w-full items-center justify-between gap-6 sm:gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2 relative z-30">
                <Logo className="h-8 w-auto sm:h-10 md:h-12 lg:h-14" />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                aria-expanded={menuState}
                className="relative z-30 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu
                  className={cn(
                    "m-auto size-6 transition-all duration-300",
                    menuState && "rotate-180 scale-0 opacity-0",
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 m-auto size-6 transition-all duration-300",
                    !menuState && "-rotate-180 scale-0 opacity-0",
                  )}
                />
              </button>

              <div className="hidden lg:block">
                <ul className="flex items-center justify-center gap-6 xl:gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="menu-item text-black/80 font-medium px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-[#144132] hover:text-white"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop CTA Button - adjusted margin */}
            <div className="hidden lg:flex lg:w-fit lg:ml-8 xl:ml-12">
              <Button
                size="lg"
                className="w-auto rounded-full px-6 py-6 h-12 text-base font-medium bg-[#144132] text-white hover:bg-[#BEE847] hover:text-zinc-900 transition-colors duration-300"
                onClick={handleContactClick}
              >
                <span>Get in Touch</span>
              </Button>
            </div>

            {/* Mobile Menu Overlay */}
            {menuState && (
              <div className="fixed inset-0 bg-black/20 z-20 lg:hidden" onClick={() => setMenuState(false)} />
            )}

            {/* Mobile Menu - adjusted spacing */}
            {menuState && (
              <div className="fixed top-20 inset-x-5 z-20 rounded-2xl bg-theme border border-border/40 shadow-xl p-6 lg:hidden">
                <div className="flex flex-col space-y-6">
                  <ul className="space-y-5">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between py-3 px-4 rounded-lg text-lg font-medium text-black hover:bg-[#144132] hover:text-white active:bg-[#144132] active:text-white transition-all duration-200 -mx-3"
                          onClick={() => setMenuState(false)}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className="h-5 w-5 opacity-70" />
                        </Link>
                        {index < menuItems.length - 1 && <div className="h-px w-full bg-black/10 mt-5" />}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <Button
                      size="lg"
                      className="w-full rounded-full px-5 py-6 h-14 text-base font-medium bg-[#144132] text-white hover:bg-[#BEE847] hover:text-zinc-900 transition-colors duration-300"
                      onClick={handleContactClick}
                    >
                      <span>Get in Touch</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
