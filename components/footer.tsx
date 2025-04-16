"use client"
import { Logo } from "./logo"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "motion/react"

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#144132] text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top row with logo, send mail, and call now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-14"
        >
          {/* Send Mail */}
          <div className="flex flex-col items-center text-center">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-white text-xl sm:text-xl md:text-2xl font-medium mb-2 sm:mb-3 lg:mb-4"
            >
              Send Mail
            </motion.h3>
            <a
              href="mailto:hello@algility.com"
              className="text-white/90 text-xl sm:text-xl md:text-2xl lg:text-3xl font-light group flex items-center gap-2 lg:gap-3 transition-colors duration-300"
            >
              <motion.span
                className="text-[#BEE847] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "mirror" }}
              >
                <Mail className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
              </motion.span>
              <span className="group-hover:text-[#BEE847] group-hover:font-medium">hello@algility.com</span>
            </a>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-center">
            <Logo className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 text-white" />
          </div>

          {/* Call Now */}
          <div className="flex flex-col items-center text-center">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-white text-xl sm:text-xl md:text-2xl font-medium mb-2 sm:mb-3 lg:mb-4"
            >
              Call Now
            </motion.h3>
            <a
              href="tel:+12135975740"
              className="text-white/90 text-xl sm:text-xl md:text-2xl lg:text-3xl font-light group flex items-center gap-2 lg:gap-3 transition-colors duration-300"
            >
              <motion.span
                className="text-[#BEE847] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatDelay: 3 }}
              >
                <Phone className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
              </motion.span>
              <span className="group-hover:text-[#BEE847] group-hover:font-medium">+1 (213) 597-5740</span>
            </a>
          </div>
        </motion.div>

        {/* Main horizontal divider with animation */}
        <motion.div
          className="w-full h-px md:h-[1px] lg:h-0.5 bg-white/20 mb-8 sm:mb-10 lg:mb-16 relative overflow-hidden"
          initial={{ opacity: 0, width: "0%" }}
          whileInView={{ opacity: 1, width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-16 sm:w-20 lg:w-32 bg-gradient-to-r from-transparent via-[#BEE847]/40 to-transparent"
            animate={{ x: ["0%", "100%"] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear", repeatDelay: 3 }}
          />
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:gap-x-12 lg:gap-y-16">
          {/* Left Column - About */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center sm:items-center md:items-center"
          >
            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-white text-xl sm:text-xl md:text-2xl font-medium mb-3 lg:mb-5"
              >
                About
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-white/80 leading-relaxed max-w-xs lg:max-w-sm text-base lg:text-lg"
              >
                AI systems that plug into your business and actually get sh*t done—no fluff, just growth.
              </motion.p>
            </div>
          </motion.div>

          {/* Middle Column - Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-white text-xl sm:text-xl md:text-2xl font-medium mb-4 sm:mb-5 lg:mb-7"
              >
                Explore
              </motion.h3>
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                {["Home", "About Us", "FAQ", "Contact Us"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <Link
                      href={item === "Home" ? "/" : "#"}
                      className="text-white/80 hover:text-[#BEE847] hover:font-medium transition-colors duration-200 text-base lg:text-lg px-2 py-1 inline-block"
                    >
                      <span>{item}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center sm:col-span-2 md:col-span-1"
          >
            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="text-white text-xl sm:text-xl md:text-2xl font-medium mb-3 lg:mb-5"
              >
                Contact
              </motion.h3>
              <div className="flex flex-col items-center justify-center gap-2 lg:gap-3 text-white/80 group transition-colors duration-300">
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "mirror", delay: 1 }}
                  className="text-[#BEE847] opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                >
                  <MapPin className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                </motion.span>
                <p className="group-hover:text-[#BEE847] group-hover:font-medium text-base lg:text-lg text-center px-2">
                  15821 Ventura Blvd #320, Los Angeles, CA 91436
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="flex gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10 justify-center"
              >
                {[
                  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/algilityai/" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/algility" },
                  { icon: Twitter, label: "Twitter", href: "#" },
                  { icon: Facebook, label: "Facebook", href: "#" },
                ].map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-full border border-white/30 text-white/80 hover:text-[#BEE847] hover:border-[#BEE847] transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-6 lg:w-6" />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Single horizontal divider under all three sections */}
        <motion.div
          className="w-full h-px md:h-[1px] lg:h-0.5 bg-white/20 mt-8 sm:mt-10 lg:mt-16 mb-8 sm:mb-10 lg:mb-16 relative overflow-hidden"
          initial={{ opacity: 0, width: "0%" }}
          whileInView={{ opacity: 1, width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-16 sm:w-20 lg:w-32 bg-gradient-to-r from-transparent via-[#BEE847]/40 to-transparent"
            animate={{ x: ["0%", "100%"] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear", repeatDelay: 3 }}
          />
        </motion.div>

        {/* Bottom section with copyright - removed border-t */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="pt-0 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-white/60 text-sm sm:text-base lg:text-lg text-center sm:text-left">
            © {new Date().getFullYear()} Algility. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-0">
            {["Privacy Policy", "Terms of Service"].map((item, index) => (
              <Link
                key={item}
                href="#"
                className="text-white/60 text-sm sm:text-base lg:text-lg hover:text-[#BEE847] hover:font-medium transition-colors duration-200 px-1 py-0.5"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
