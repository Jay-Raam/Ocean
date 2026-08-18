import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage, TextSplit } from "../components/sections/PageSections";
import { ImageSplit } from "../components/sections/ImageSplit";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { Button } from "../components/ui/Button";
import { assets } from "../lib/assets";
import {
  TRAVEL_GUIDE_GETTING_HERE,
  TRAVEL_GUIDE_SEASONS,
  TRAVEL_GUIDE_PRACTICAL,
} from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

export function TravelGuide() {
  usePageMeta(
    "Travel Guide | Ocean Resort – Bali",
    "How to get to Ocean Resort, Lovina — best time to visit, what to pack, currency, health and practical travel tips for North Bali.",
    assets.discover.bigImageWide,
  );
  return (
    <PageShell footerImage={assets.footers.discover}>
      <DefaultHeader
        eyebrow="Plan your trip"
        title="Getting to Ocean"
        text="A few hours from the airport, light years from the crowds. Here's everything you need to know before you set off."
        image={assets.discover.bigImageWide}
        imageAlt="North Bali scenery"
        overlay="bottom"
      />
      <TextSplit
        eyebrow="Getting here"
        title="Worth the journey"
        text="Ocean sits on Lovina's black-sand shore in North Bali, about 2.5–3 hours from Ngurah Rai airport. The drive winds past rice terraces and volcanoes — and every package includes a return transfer to any point in Bali."
      />
      <section className="section section-faq" data-theme-section="light" data-bg-section="light">
        <div className="border-top" />
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-ornament">
                <Ornament />
              </div>
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">How to get here</span>
              </div>
              <div className="col-row col-row-title small">
                <h2>Your route to Ocean</h2>
              </div>
            </div>
          </div>
          <div className="row row-faq">
            <div className="col">
              <ul className="faq-list">
                {TRAVEL_GUIDE_GETTING_HERE.map((item) => (
                  <li className="faq-item faq-item-active" key={item.title}>
                    <div className="faq-question" style={{ cursor: "default" }}>
                      <span>{item.title}</span>
                    </div>
                    <div className="faq-answer" style={{ gridTemplateRows: "1fr" }}>
                      <div className="faq-answer-inner">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ImageSplit
        image={assets.pages.contact.beach}
        imageAlt="Lovina's black-sand beach"
        eyebrow="When to visit"
        title="Every season has its charm"
        text="North Bali is beautiful year-round. The dry season brings sunshine and busy skies. The green season brings lush gardens, dramatic sunsets and quieter days."
        flipped
      />
      <section className="section section-faq" data-theme-section="light" data-bg-section="white">
        <div className="border-top" />
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">Seasons</span>
              </div>
              <div className="col-row col-row-title small">
                <h2>When to come</h2>
              </div>
            </div>
          </div>
          <div className="row row-faq">
            <div className="col">
              <ul className="faq-list">
                {TRAVEL_GUIDE_SEASONS.map((item) => (
                  <li className="faq-item faq-item-active" key={item.title}>
                    <div className="faq-question" style={{ cursor: "default" }}>
                      <span>{item.title}</span>
                    </div>
                    <div className="faq-answer" style={{ gridTemplateRows: "1fr" }}>
                      <div className="faq-answer-inner">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-faq" data-theme-section="light" data-bg-section="light">
        <div className="border-top" />
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-ornament">
                <Ornament />
              </div>
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">Practical info</span>
              </div>
              <div className="col-row col-row-title small">
                <h2>Good to know</h2>
              </div>
            </div>
          </div>
          <div className="row row-faq">
            <div className="col">
              <ul className="faq-list">
                {TRAVEL_GUIDE_PRACTICAL.map((item) => (
                  <li className="faq-item faq-item-active" key={item.title}>
                    <div className="faq-question" style={{ cursor: "default" }}>
                      <span>{item.title}</span>
                    </div>
                    <div className="faq-answer" style={{ gridTemplateRows: "1fr" }}>
                      <div className="faq-answer-inner">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <BigImage src={assets.discover.bigImageWide} alt="North Bali coastline" />
      <section className="section section-small-image" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-title small">
                <h2>Still have questions?</h2>
              </Reveal>
              <Reveal index={2} className="col-row col-row-text styled-content large">
                <p>
                  Our team knows North Bali better than anyone. Drop us a message and we will help you plan every
                  detail — from airport pickup to waterfall treks.
                </p>
              </Reveal>
              <Reveal index={3} className="col-row col-row-btn">
                <Button variant="primary" as="link" to="/contact">
                  Contact us
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
