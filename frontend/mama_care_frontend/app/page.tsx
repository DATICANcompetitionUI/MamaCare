/**
 * app/page.tsx — Landing Page (/)
 *
 * This is the public-facing home page of MamaCare AI.
 * It is a Server Component that fetches any needed data and composes
 * the page from individual section components.
 *
 * Each section lives in its own file under components/landing/ to keep
 * this file short and the sections independently maintainable.
 *
 * Section load order:
 *   1. Navbar       — sticky top navigation (client component)
 *   2. HeroSection  — full-viewport hero with CTAs
 *   3. FeaturesSection  — three AI feature cards
 *   4. HowItWorksSection — numbered 4-step flow
 *   5. StatsSection     — dark background impact statistics
 *   6. ProvidersSection — split panel targeting healthcare providers
 *   7. CTASection       — final sign-up call to action
 *   8. Footer           — team credit and language badges
 */

import Navbar           from "@/components/Navbar";
import HeroSection      from "@/components/landing/HeroSection";
import FeaturesSection  from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import StatsSection     from "@/components/landing/StatsSection";
import ProvidersSection from "@/components/landing/ProvidersSection";
import CTASection       from "@/components/landing/CTASection";
import Footer           from "@/components/landing/Footer";

/* Data fetching */
import { getPlatformStats } from "@/lib/placeholder-data";

/**
 * Root page component for the landing page.
 * Async so it can fetch data (stats) on the server before rendering.
 */
export default async function LandingPage() {
  /**
   * Fetch platform stats for the StatsSection.
   * TODO: When the backend is ready, getPlatformStats() will call a real API —
   * no changes needed here; the function signature stays the same.
   */
  const stats = await getPlatformStats();

  return (
    <>
      {/* Fixed navigation bar — renders on top of the hero */}
      <Navbar />

      <main style={{ overflowX: "hidden" }}>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection stats={stats} />
        <ProvidersSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
