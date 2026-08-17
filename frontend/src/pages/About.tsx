import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage, ThreeImages, TextSplit } from "../components/sections/PageSections";
import { ImageSplit } from "../components/sections/ImageSplit";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { assets } from "../lib/assets";
import { usePageMeta } from "../hooks/usePageMeta";

export function About() {
  usePageMeta(
    "About | Ocean Resort – Bali",
    "The story of Ocean Resort, Lovina — fifteen villas in one of the most beautiful gardens in Bali, a prize-winning bistro, and a spa rooted in Balinese tradition.",
    assets.pages.about.header,
  );
  return (
    <PageShell footerImage={assets.pages.footers.default}>
      <DefaultHeader
        eyebrow="The story of Ocean"
        title="A small resort with a big heart"
        text="Fifteen villas set in one of the most beautiful gardens in Bali. A prize-winning bistro. A spa rooted in Balinese tradition. And a welcome that feels like coming home."
        image={assets.pages.about.header}
        imageAlt="The North Bali coastline"
        overlay="bottom"
      />
      <TextSplit
        eyebrow="Our philosophy"
        title="The home of a friend"
        text="Ocean was created as a place to be, not just to stay. We believe luxury is the freedom to slow down — a morning swim in your own pool, dinner under the stars, the scent of cloves carried on the breeze. Everything here is built around that feeling."
      />
      <ThreeImages
        offset
        images={[
          { src: assets.pages.about.intro[0], alt: "The Ocean lobby view" },
          { src: assets.pages.about.intro[1], alt: "Traditional Balinese welcome" },
          { src: assets.pages.about.intro[2], alt: "The Ocean restaurant" },
        ]}
      />
      <section className="section section-small-image" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-eyebrow">
                <span className="eyebrow">Ocean means 'the sea'</span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title small">
                <h2>Simple luxuries</h2>
              </Reveal>
              <Reveal index={3} className="col-row col-row-text styled-content large">
                <p>
                  Ocean has just fifteen villas, each with its own character. Some have pools, some have verandas.
                  They all have views. The gardens are planted with the same care as the rooms, and every corner is a
                  place to linger.
                </p>
              </Reveal>
              <Reveal index={4} className="col-row-image">
                <ParallaxImage src={assets.pages.about.smallImage} alt="Pool villa lookout" strength={0.5} height={0.2} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <BigImage src={assets.pages.about.bigImage} alt="The gardens at Ocean" />
      <TextSplit
        eyebrow="From our gardens"
        title="Grown, not shipped"
        text="The vegetables on your plate come from our own organic gardens. The oils in the spa are made from virgin coconut oil pressed in our village. The fish is caught in the Bali sea, a few hundred metres away. We keep things close, local and honest."
      />
      <ImageSplit
        image={assets.dining.cookbook}
        imageAlt="The Ocean cookbook"
        eyebrow="The Ocean Cookbook"
        title="Recipes worth bringing home"
        text="Our kitchen has been featured in international cook books and food magazines. Simple brasserie dishes and Balinese classics, made from garden produce — and now, recipes you can recreate at home."
        buttonLabel="Explore our restaurant"
        buttonTo="/dining"
        flipped
      />
    </PageShell>
  );
}
