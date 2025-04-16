import HeroSection from "@/components/hero-section"
import ContactForm from "@/components/contact-form"
import CalendarSection from "@/components/calendar-section"
import Footer from "@/components/footer"
import { EnhancedScrollToTop } from "@/components/enhanced-scroll-to-top"

export default function Page() {
  return (
    <div className="bg-theme">
      <HeroSection />
      <ContactForm />
      <CalendarSection />
      <Footer />
      <EnhancedScrollToTop showProgress={true} variant="circle" />
    </div>
  )
}
