import type { Metadata } from "next"
import { SectionNavbar } from "@/components/section-navbar"
import { SectionHero } from "@/components/section-hero"
import { SectionFeatures } from "@/components/section-features"
import { SectionDocker } from "@/components/section-docker"
import { SectionDownload } from "@/components/section-download"
import { SectionCommunity } from "@/components/section-community"
import { SectionReviews } from "@/components/section-reviews"
import { SectionDeveloper } from "@/components/section-developer"
import { SectionFooter } from "@/components/section-footer"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Arch Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionNavbar />
      <main>
        <SectionHero />
        <SectionFeatures />
        <SectionDocker />
        <SectionDownload />
        <SectionCommunity />
        <SectionReviews />
        <SectionDeveloper />
      </main>
      <SectionFooter />
    </>
  )
}
