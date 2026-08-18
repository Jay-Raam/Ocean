import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage, ThreeImages, TextSplit } from "../components/sections/PageSections";
import { ImageSplit } from "../components/sections/ImageSplit";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { Button } from "../components/ui/Button";
import { assets } from "../lib/assets";
import { SUSTAINABILITY_PILLARS } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

export function Sustainability() {
  usePageMeta(
    "Sustainability | Ocean Resort – Bali",
    "Our commitment to sustainability at Ocean Resort, Lovina — organic gardens, local community, marine conservation and zero-waste kitchen.",
    assets.dining.kien304,
  );
  return (
    <PageShell footerImage={assets.pages.footers.default}>
      <DefaultHeader
        eyebrow="Our commitment"
        title="Close, local and honest"
        text="Ocean was built on a simple idea: luxury should give back. From our organic gardens to our village partnerships, everything here is designed to tread lightly."
        image={assets.dining.kien304}
        imageAlt="The Ocean kitchen garden"
        overlay="bottom"
      />
      <TextSplit
        eyebrow="Our philosophy"
        title="Luxury that gives back"
        text="We believe the best resorts are the ones that leave their surroundings better than they found them. At Ocean, that means growing what we serve, hiring from our village, protecting the sea, and wasting nothing we can avoid."
      />
      <ThreeImages
        offset
        images={[
          { src: assets.dining.kien304, alt: "Our organic garden" },
          { src: assets.discover.smallImage, alt: "The village near Ocean" },
          { src: assets.dining.settingTables, alt: "From garden to table" },
        ]}
      />
      <section className="section section-sustainability-pillars" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <ul className="row grid">
            {SUSTAINABILITY_PILLARS.map((pillar, i) => (
              <li className="col" key={pillar.title}>
                <Reveal index={i % 3}>
                  <article className="celebrate-card">
                    <div className="card-image">
                      <img className="overlay" src={pillar.image} alt={pillar.title} loading="lazy" decoding="async" />
                      <div className="overlay overlay-gradient" />
                    </div>
                    <div className="celebrate-card-content">
                      <span className="eyebrow small primary">{pillar.eyebrow}</span>
                      <h3 className="small">{pillar.title}</h3>
                      <p className="medium">{pillar.text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section-small-image" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-eyebrow">
                <span className="eyebrow">From our village</span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title small">
                <h2>The people behind Ocean</h2>
              </Reveal>
              <Reveal index={3} className="col-row col-row-text styled-content large">
                <p>
                  Over ninety percent of our team come from the villages surrounding Ocean. Our therapists learned
                  their craft from their mothers and grandmothers. Our gardeners have tended these grounds for
                  decades. Our cooks know the market better than any chef with a cookbook. When you stay with us,
                  you support real people in a real community.
                </p>
              </Reveal>
              <Reveal index={4} className="col-row-image">
                <ParallaxImage src={assets.discover.smallImage} alt="The village near Ocean" strength={0.5} height={0.2} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <BigImage src={assets.c240ba5e12 || assets.villaBigImage} alt="The gardens at Ocean" />
      <ImageSplit
        image={assets.dining.cookbook}
        imageAlt="The Ocean cookbook"
        eyebrow="From garden to plate"
        title="Organic, seasonal, honest"
        text="Every dish at Ocean starts in our garden. We grow herbs, greens, tomatoes, tropical fruits and edible flowers — harvested each morning and served that evening. No imports, no shortcuts, no waste."
        buttonLabel="See our menu"
        buttonTo="/dining"
        flipped
        bg="white"
        titleSmall
      />
    </PageShell>
  );
}
