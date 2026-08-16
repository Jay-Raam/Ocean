import { useCallback, useState } from "react";
import { Hero } from "../components/hero/Hero";
import { HomeLoader, type LoaderPhase } from "../components/layout/Loader";
import { BenefitsSection } from "../components/sections/BenefitsSection";
import { HomeIntro } from "../components/sections/HomeIntro";
import { StaySlider } from "../components/sections/StaySlider";
import { ImageSplit } from "../components/sections/ImageSplit";
import { PackagesIntro, PackagesCards } from "../components/sections/PackagesSection";
import { Footer } from "../components/layout/Footer";
import { assets } from "../lib/assets";
import { useApp } from "../lib/AppContext";
import { Reveal } from "../components/motion/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { BRAND } from "../lib/brand";

export function Home() {
  usePageMeta(
    "Ocean Resort – Bali | Luxury Villas, Dining & Spa in Lovina",
    `Luxury boutique resort in Lovina, North Bali — private pool villas, award-winning Balinese dining, and a holistic spa. ${BRAND.fullName}.`,
    assets.hero.poster,
  );
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>(0);
  const { setPageEntered } = useApp();

  const handleLoaderDone = useCallback(() => {
    // Mirrors pageTransitionOut: header becomes visible, col-rows animate in
    setPageEntered(true);
  }, [setPageEntered]);

  const advancePhase = useCallback((p: LoaderPhase) => setLoaderPhase(p), []);

  const contentVisible = loaderPhase >= 1;

  return (
    <>
      <HomeLoader onDone={handleLoaderDone} onPhase={advancePhase} />
      <main
        className="main"
        id="main"
        style={{ visibility: contentVisible ? "visible" : "hidden" }}
      >
        <div className="main-wrap">
          <Hero loaderPhase={loaderPhase} />
          <Reveal index={0} delay={0.2}>
            <BenefitsSection />
          </Reveal>
          <HomeIntro />
          <StaySlider />
          <ImageSplit
            image={assets.dining.split}
            imageAlt="Ocean restaurant interior"
            eyebrow="Our restaurant"
            title="Prize winning Balinese bistro cuisine"
            text="The food at Ocean is easy to enjoy. Simple brasserie dishes and Balinese classics. Organic vegetables from our own gardens. Fresh fish from the Bali sea. Spice island flavors. Local cooking inspired by the world, that has won international awards and been featured in cook books."
            buttonLabel="Explore our restaurant"
            buttonTo="/dining"
          />
          <ImageSplit
            image={assets.dining.barImage}
            imageAlt="Evening drinks by the pool"
            eyebrow="The Ocean Bar"
            title="Sunset cocktails by the pool"
            text="Playful poolside cocktails as the sun slips behind the volcano — arak, passion fruit, and the resident geckos for company."
            buttonLabel="View the bar"
            buttonTo="/dining#bar"
          />
          <ImageSplit
            image={assets.relax.split}
            imageAlt="Ocean spa fountains"
            eyebrow="Our spa"
            title="Be pampered in paradise"
            text="Our spa is simple and serene. Treatments based on traditional techniques. Oils and rubs made after age-old recipes. A spiritual experience that renews your body."
            buttonLabel="Experience our spa"
            buttonTo="/relax"
            flipped
            bg="white"
            titleSmall
          />
          <PackagesIntro />
          <PackagesCards />
          <Footer footerImage={assets.footers.home} />
        </div>
      </main>
    </>
  );
}
