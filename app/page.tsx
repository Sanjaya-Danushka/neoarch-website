import { SectionNavbar } from "@/components/section-navbar"
import { SectionHero } from "@/components/section-hero"
import { SectionFeatures } from "@/components/section-features"
import { SectionDownload } from "@/components/section-download"
import { SectionCommunity } from "@/components/section-community"
import { SectionReviews } from "@/components/section-reviews"
import { SectionDeveloper } from "@/components/section-developer"
import { SectionFooter } from "@/components/section-footer"

export default function Page() {
  return (
    <>
      <SectionNavbar />
      <main>
        <SectionHero />
        <SectionFeatures />
        <SectionDownload />
        <SectionCommunity />
        <SectionReviews />
        <SectionDeveloper />
      </main>
      <SectionFooter />
    </>
  )
}
