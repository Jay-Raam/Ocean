import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { TextSplit } from "../components/sections/PageSections";
import { FaqSection } from "../components/sections/FaqSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { assets } from "../lib/assets";
import { FAQ_ITEMS } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

const MAP_QUERY =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("Jl. Pantai Lovina, Kalibukbuk, Buleleng, Bali, Indonesia") +
  "&output=embed";

/** The travel-related FAQ shown on this page (a subset of FAQ_ITEMS). */
const TRAVEL_FAQ = FAQ_ITEMS.filter((f) =>
  ["airport", "check-in", "children", "excursions", "Wi-Fi"].some((k) => f.question.toLowerCase().includes(k)),
);

export function Contact() {
  usePageMeta(
    "Contact | Ocean Resort – Bali",
    "Contact Ocean Resort, Lovina — address, phone, email and WhatsApp, plus how to get here from Bali's airport.",
    assets.pages.contact.header,
  );
  return (
    <PageShell footerImage={assets.pages.footers.default}>
      <DefaultHeader
        eyebrow="We'd love to hear from you"
        title="Contact & getting here"
        text="A few hours from the airport, light years away from the crowds. Ask us anything — we reply within a day."
        image={assets.pages.contact.header}
        imageAlt="Sunset over the Bali sea"
        overlay="bottom"
      />
      <section className="section section-map" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <div className="row">
            <div className="col">
              <div className="map-frame">
                <iframe
                  title="Ocean Resort – Bali on Google Maps"
                  src={MAP_QUERY}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-getting-here" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row grid">
            <div className="col col-image">
              <Reveal index={0}>
                <ParallaxImage src={assets.pages.contact.beach} alt="Lovina's black-sand beach" strength={0.5} height={0.05} />
              </Reveal>
            </div>
            <div className="col col-content styled-col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">Getting here</span>
              </div>
              <div className="col-row col-row-title small">
                <h2>Worth the journey</h2>
              </div>
              <div className="col-row col-row-text medium styled-content">
                <p>
                  Ocean sits on Lovina's black-sand shore in North Bali, about 2.5–3 hours from Ngurah Rai airport.
                  The drive winds past rice terraces and volcanoes — and every package includes a return transfer to
                  any point in Bali. We can also arrange drivers from Ubud, Uluwatu or anywhere else on the island.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactSection />
      <FaqSection items={TRAVEL_FAQ} title="Travelling to Ocean" eyebrow="Good to know" bg="white" />
      <TextSplit
        eyebrow="Lovina, North Bali"
        title="Bali as it used to be"
        text="Beyond the gates you will find dolphin safaris at dawn, hidden waterfalls, black-sand beaches and villages where life moves at its own pace. Welcome to the true Bali."
      />
    </PageShell>
  );
}
