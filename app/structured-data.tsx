import Script from "next/script"

export function OrganizationStructuredData() {
  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Algility",
          url: "https://algility.com",
          logo: "https://algility.com/android-chrome-512x512.png",
          sameAs: [
            "https://www.instagram.com/algilityai/",
            "https://www.linkedin.com/company/algility",
            "https://twitter.com/algilityai",
            "https://facebook.com/algilityai",
          ],
          address: {
            "@type": "PostalAddress",
            streetAddress: "15821 Ventura Blvd #320",
            addressLocality: "Los Angeles",
            addressRegion: "CA",
            postalCode: "91436",
            addressCountry: "US",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-213-597-5740",
            contactType: "customer service",
            email: "hello@algility.com",
          },
          description: "AI systems that plug into your business and actually get sh*t done—no fluff, just growth.",
        }),
      }}
    />
  )
}

export function ServiceStructuredData() {
  return (
    <Script
      id="service-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "AI Automation",
          provider: {
            "@type": "Organization",
            name: "Algility",
          },
          name: "AI Systems for B2B Growth",
          description: "AI systems that plug into your business and actually get sh*t done—no fluff, just growth.",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            url: "https://algility.com/#calendar-section",
          },
        }),
      }}
    />
  )
}

export function FAQStructuredData() {
  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What services does Algility offer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Algility builds AI systems that grow B2B businesses on autopilot. Our AI solutions plug into your business and drive real growth without fluff.",
              },
            },
            {
              "@type": "Question",
              name: "How can I get started with Algility?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can get started by requesting a demo through our calendar booking system or by contacting us directly through our contact form.",
              },
            },
            {
              "@type": "Question",
              name: "Where is Algility located?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Algility is located in Los Angeles, CA, but we serve clients globally through our AI automation solutions.",
              },
            },
          ],
        }),
      }}
    />
  )
}
