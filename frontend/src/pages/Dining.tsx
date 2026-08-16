import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { AfterBigImage, BigImage, SmallImage, ThreeImages } from "../components/sections/PageSections";
import { MenuSection } from "../components/sections/MenuSection";
import { ImageSplit } from "../components/sections/ImageSplit";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Button } from "../components/ui/Button";
import { assets } from "../lib/assets";
import { DINING_CATEGORIES, DINING_MENU, DINING_DISCLAIMER, BAR_CATEGORIES, BAR_MENU, BAR_DISCLAIMER } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

export function Dining() {
  usePageMeta(
    "Dining | Ocean Resort – Bali",
    "A prize-winning Balinese bistro at Ocean Resort, Lovina — modern Indonesian cuisine made from garden produce.",
    assets.dining.header,
  );
  return (
    <PageShell footerImage={assets.dining.footer}>
      <DefaultHeader
        eyebrow="A restaurant well worth a journey"
        title="Prize winning Balinese bistro"
        image={assets.dining.header}
        imageAlt="Poolside table at the Ocean restaurant"
        smallImageBottom
        overlay="bottom"
      />
      <AfterBigImage src={assets.dining.smallImage} alt="Chef doing final touches on the dish" />
      <section className="section section-dining-intro" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow primary">Local dishes, inspired by the world</span>
              </div>
              <div className="col-row col-row-title medium">
                <h2>Bali's gourmet retreat</h2>
              </div>
              <div className="col-row col-row-text styled-content large">
                <p>
                  The food at Ocean is easy to enjoy. Simple brasserie dishes. Balinese classics. Tropical, local and
                  good. Most evenings dinner is served by the poolside, by a roaring fire, under the stars, with view
                  over the boats at sea, catching the fish for tomorrow's menu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ThreeImages
        offset
        images={[
          { src: assets.dining.wontons, alt: "Wontons" },
          { src: assets.dining.kien304, alt: "The Ocean kitchen" },
          { src: assets.dining.settingTables, alt: "Setting tables" },
        ]}
      />
      <section className="section section-dining-intro" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow primary">Tropical, local and good</span>
              </div>
              <div className="col-row col-row-title medium">
                <h2>Our menu</h2>
              </div>
              <div className="col-row col-row-text styled-content large">
                <p>
                  Our menu is built around the market and the seasons. A daily changing three-course Balinese menu, à
                  la carte classics and generous lunch dishes — all made with organic vegetables from our gardens and
                  fresh fish from the Bali sea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MenuSection
        id="menu"
        title=""
        categories={DINING_CATEGORIES}
        items={DINING_MENU}
        disclaimer={DINING_DISCLAIMER}
      />
      <ImageSplit
        image={assets.dining.cookbook}
        imageAlt="The Ocean cookbook"
        eyebrow="The Ocean Cookbook"
        title="Bring the Ocean kitchen home"
        text="Ocean has been featured in international cook books and food magazines. Simple brasserie dishes and Balinese classics, with recipes you can recreate at home."
        buttonLabel="Explore our menu"
        buttonHref="#menu"
        flipped
      />
      <section className="section section-image-split" data-theme-section="light" data-bg-section="white">
        <div className="container">
          <div className="row grid">
            <div className="col col-image">
              <ParallaxImage src={assets.dining.barImage} alt="Evening drinks by the pool" />
            </div>
            <div className="col col-content styled-col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">The Ocean Bar</span>
              </div>
              <div className="col-row col-row-title">
                <h2>The Ocean Bar</h2>
              </div>
              <div className="col-row col-row-text medium styled-content">
                <p>
                  We serve playful poolside cocktails, as you watch the sun set behind a volcano, in the company of
                  the resident geckos and the sound of the jungle.
                </p>
              </div>
              <div className="col-row col-row-btn">
                <Button variant="primary" as="a" href="#bar">
                  View the bar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MenuSection
        id="bar"
        title="Bar & Drinks"
        categories={BAR_CATEGORIES}
        items={BAR_MENU}
        disclaimer={BAR_DISCLAIMER}
      />
      <BigImage src={assets.dining.bigImage} alt="Sunset over the Bali sea" />
      <Reveal index={0} delay={0.2}>
        <div className="section-after-big-image" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="row centered">
              <div className="col styled-col">
                <div className="col-row col-row-image">
                  <figure className="styled-figure default">
                    <picture className="overlay">
                      <img className="overlay" src={assets.dining.barImage} alt="Poolside drinks" loading="lazy" decoding="async" />
                    </picture>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <SmallImage src={assets.dining.smallImage} alt="Restaurant detail" />
    </PageShell>
  );
}
