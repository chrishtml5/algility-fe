"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { CheckCircle2, Loader2, Mail } from "lucide-react"
import { isIOS } from "@/utils/device-detection"

export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const sectionRef = useRef<HTMLElement>(null)
  const [isIOSDevice, setIsIOSDevice] = useState(false)

  // Detect iOS on client side
  useEffect(() => {
    setIsIOSDevice(isIOS())
  }, [])

  // Handle URL hash navigation for direct linking
  useEffect(() => {
    if (window.location.hash === "#contact-form-section") {
      // Add a small delay to ensure the page is fully loaded
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [])

  // Fix iOS Safari 100vh issue
  useEffect(() => {
    if (isIOSDevice) {
      const setIOSVh = () => {
        // Set a CSS variable with the actual viewport height
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
      }

      // Set on initial load
      setIOSVh()

      // Update on resize and orientation change
      window.addEventListener("resize", setIOSVh)
      window.addEventListener("orientationchange", setIOSVh)

      return () => {
        window.removeEventListener("resize", setIOSVh)
        window.removeEventListener("orientationchange", setIOSVh)
      }
    }
  }, [isIOSDevice])

  // Handle iOS Safari input focus issues
  useEffect(() => {
    if (isIOSDevice) {
      const inputs = document.querySelectorAll("input, textarea")

      const handleFocus = (e: Event) => {
        // Add a small delay to let the keyboard appear before scrolling
        setTimeout(() => {
          ;(e.target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" })
        }, 300)
      }

      inputs.forEach((input) => {
        input.addEventListener("focus", handleFocus)
      })

      return () => {
        inputs.forEach((input) => {
          input.removeEventListener("focus", handleFocus)
        })
      }
    }
  }, [isIOSDevice])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // On iOS, blur any active element to hide the keyboard
    if (isIOSDevice && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }

    setFormState("submitting")

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, you would send the data to your server
      // which would then send an email to hello@algility.com
      console.log("Form submitted to hello@algility.com:", formData)

      setFormState("success")

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormState("idle")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState("error")

      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormState("idle")
      }, 5000)
    }
  }

  return (
    <section
      id="contact-form-section"
      ref={sectionRef}
      className={cn(
        "py-16 sm:py-20 md:py-24 pb-0 bg-theme",
        // Use different scroll margin for iOS Safari
        isIOSDevice ? "scroll-mt-20 sm:scroll-mt-24 md:scroll-mt-28" : "scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24",
      )}
      style={{
        // Use CSS variable for height on iOS to fix 100vh issue
        minHeight: isIOSDevice ? "calc(100 * var(--vh, 1vh))" : undefined,
        // Enable momentum scrolling for iOS
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#144132] mb-4">
              Get in Touch
            </h2>
            <p className="mt-4 text-xl md:text-2xl text-[#2A6B4F] max-w-2xl mx-auto">
              Tell us what you're working on — we'll help automate it
            </p>
          </div>

          <div className="rounded-2xl border border-[#2A6B4F]/20 bg-white/50 backdrop-blur-sm p-6 sm:p-8 md:p-10 shadow-sm mb-6 sm:mb-8 md:mb-10">
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-[#144132]/10 p-4 mb-6">
                  <CheckCircle2 className="h-14 w-14 text-[#144132]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#144132] mb-3">Message Sent!</h3>
                <p className="text-[#2A6B4F] text-lg md:text-xl max-w-md">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : formState === "error" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-red-100 p-4 mb-6">
                  <Mail className="h-14 w-14 text-red-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-red-600 mb-3">Something went wrong</h3>
                <p className="text-gray-600 text-lg md:text-xl max-w-md">
                  We couldn't send your message. Please try again or email us directly at hello@algility.com.
                </p>
                <Button
                  onClick={() => setFormState("idle")}
                  className="mt-6 bg-[#144132] text-white hover:bg-[#BEE847] hover:text-zinc-900 transition-colors duration-300 text-lg py-6 px-8 h-14"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-base md:text-lg font-medium text-[#144132]">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={cn(
                        "w-full rounded-xl border-[#2A6B4F]/30 bg-white/70 focus:border-[#144132] focus:ring-1 focus:ring-[#144132] placeholder:text-[#2A6B4F]/50 text-base md:text-lg h-12 md:h-14",
                        errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        // Add extra padding for iOS to prevent text from being hidden under the autofill icon
                        isIOSDevice && "pl-4",
                      )}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm md:text-base text-red-500 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-base md:text-lg font-medium text-[#144132]">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={cn(
                        "w-full rounded-xl border-[#2A6B4F]/30 bg-white/70 focus:border-[#144132] focus:ring-1 focus:ring-[#144132] placeholder:text-[#2A6B4F]/50 text-base md:text-lg h-12 md:h-14",
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        isIOSDevice && "pl-4",
                      )}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm md:text-base text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-base md:text-lg font-medium text-[#144132]">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className={cn(
                        "w-full rounded-xl border-[#2A6B4F]/30 bg-white/70 focus:border-[#144132] focus:ring-1 focus:ring-[#144132] placeholder:text-[#2A6B4F]/50 text-base md:text-lg h-12 md:h-14",
                        errors.phone && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        isIOSDevice && "pl-4",
                      )}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm md:text-base text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="block text-base md:text-lg font-medium text-[#144132]">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is your inquiry about?"
                      className={cn(
                        "w-full rounded-xl border-[#2A6B4F]/30 bg-white/70 focus:border-[#144132] focus:ring-1 focus:ring-[#144132] placeholder:text-[#2A6B4F]/50 text-base md:text-lg h-12 md:h-14",
                        errors.subject && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        isIOSDevice && "pl-4",
                      )}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-sm md:text-base text-red-500 mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block text-base md:text-lg font-medium text-[#144132]">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry"
                    className={cn(
                      "min-h-32 md:min-h-40 w-full rounded-xl border-[#2A6B4F]/30 bg-white/70 focus:border-[#144132] focus:ring-1 focus:ring-[#144132] placeholder:text-[#2A6B4F]/50 text-base md:text-lg",
                      errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500",
                      isIOSDevice && "pl-4 pr-4",
                    )}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm md:text-base text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={formState === "submitting"}
                  className={cn(
                    "w-full rounded-full py-6 h-14 md:h-16 text-lg md:text-xl font-medium bg-[#144132] text-white hover:bg-[#BEE847] hover:text-zinc-900 transition-colors duration-300",
                    formState === "submitting" && "opacity-80",
                    // Make buttons larger on iOS for better touch targets
                    isIOSDevice && "h-16 md:h-18",
                  )}
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
