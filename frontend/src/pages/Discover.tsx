import { Link as RouterLink } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage } from "../components/sections/PageSections";
import { PackagesIntro, PackagesCards } from "../components/sections/PackagesSection";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { assets } from "../lib/assets";
import { DISCOVER_CARDS } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

export function Discover() {
  usePageMeta(
    "Discover | Ocean Resort – Bali",
    "Discover North Bali from Ocean Resort — dolphins of Lovina, secret waterfalls, diving and snorkeling, and golf in the volcano.",
    assets.discover.bigImageWide,
  );
  return (
    <PageShell footerImage={assets.footers.discover}>
      <DefaultHeader
        eyebrow="Discover Bali"
        title="Welcome to the true Bali"
        text="Bali is blessed by a spectacular nature and a fascinating culture. Nowhere is the scenery more breathtaking or the ceremonies more bewitching than in the North."
        extraClass="section-discover-header"
      />
      <section className="section section-discover-cards" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <ul className="row grid">
            {DISCOVER_CARDS.map((card) => (
              <li className="col" key={card.to}>
                <RouterLink to={card.to} className="single-discover-card">
                  <div className="card-image">
                    <img className="overlay" src={card.image} alt={card.title} loading="lazy" decoding="async" />
                    <div className="overlay overlay-gradient" />
                    <div className="overlay overlay-dark" />
                  </div>
                  <div className="card-content">
                    <div className="card-row card-row-eyebrow">
                      <span className="eyebrow">{card.title}</span>
                    </div>
                    <div className="card-row card-row-text">
                      <p className="location">{card.location}</p>
                    </div>
                  </div>
                </RouterLink>
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
              <Reveal index={1} className="col-row col-row-title small">
                <h2>Step off the beaten path</h2>
              </Reveal>
              <Reveal index={2} className="col-row col-row-text styled-content large">
                <p>
                  Here, just a few steps off the beaten path, you will find yourself far from the crowds, and close
                  to the true heart of Bali. A dance class in the village. The scent of clove in the breeze. A famous
                  temple or a secret waterfall. Welcome to North Bali.
                </p>
              </Reveal>
              <Reveal index={3} className="col-row-image">
                <ParallaxImage src={assets.discover.smallImage} alt="Discover" strength={0.5} height={0.2} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <BigImage src={assets.discover.bigImageWide} alt="North Bali scenery" />
      <PackagesIntro />
      <PackagesCards />
    </PageShell>
  );
}
