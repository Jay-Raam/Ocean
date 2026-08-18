import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage, TextSplit } from "../components/sections/PageSections";
import { Reveal } from "../components/motion/Reveal";
import { Ornament } from "../components/ui/Ornament";
import { Button } from "../components/ui/Button";
import { assets } from "../lib/assets";
import { OFFERS } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";
import { useApp } from "../lib/AppContext";

export function Offers() {
  const { openBooking } = useApp();
  usePageMeta(
    "Offers | Ocean Resort – Bali",
    "Current offers and seasonal deals at Ocean Resort, Lovina — save on stays, packages and experiences in North Bali.",
    assets.stay.villas.luxury.main,
  );
  return (
    <PageShell footerImage={assets.footers.packages}>
      <DefaultHeader
        eyebrow="Special offers"
        title="Worth the journey"
        text="Direct booking perks, seasonal escapes and long-stay savings — our way of saying thank you for choosing Ocean."
        image={assets.stay.bigImage}
        imageAlt="Ocean gardens at golden hour"
        overlay="bottom"
      />
      <section className="section section-celebrate-packages" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <ul className="row grid">
            {OFFERS.map((offer) => (
              <li className="col" key={offer.title}>
                <Reveal index={0}>
                  <div className="celebrate-card">
                    <div className="card-image">
                      <img className="overlay" src={offer.image} alt={offer.title} loading="lazy" decoding="async" />
                      <div className="overlay overlay-gradient" />
                      {offer.badge && (
                        <div
                          style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            background: "var(--c-primary)",
                            color: "#fff",
                            padding: "0.35rem 0.75rem",
                            borderRadius: "2rem",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          {offer.badge}
                        </div>
                      )}
                    </div>
                    <div className="celebrate-card-content">
                      <span className="eyebrow small primary">{offer.eyebrow}</span>
                      <h3 className="small">{offer.title}</h3>
                      <p className="medium">{offer.text}</p>
                      <ul className="celebrate-includes">
                        {offer.includes.map((inc) => (
                          <li key={inc}>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                      {offer.code && (
                        <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", opacity: 0.6 }}>
                          Use code: <strong>{offer.code}</strong>
                        </div>
                      )}
                      <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", opacity: 0.5 }}>
                        Valid until {offer.validUntil}
                      </div>
                      <div className="celebrate-card-btn" style={{ marginTop: "1rem" }}>
                        <Button variant="primary" size="small" icon={false} onClick={() => openBooking()}>
                          Book now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section-small-image" data-theme-section="light" data-bg-section="light">
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-eyebrow">
                <span className="eyebrow">Book direct</span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title small">
                <h2>The best price is always here</h2>
              </Reveal>
              <Reveal index={3} className="col-row col-row-text styled-content large">
                <p>
                  When you book directly with Ocean, you always get our best available rate — plus a complimentary
                  daily sundowner cocktail and one hour of massage per stay. No middlemen, no markups, no surprises.
                </p>
              </Reveal>
              <Reveal index={4} className="col-row col-row-btn">
                <Button variant="primary" onClick={() => openBooking()}>
                  Book your stay
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <BigImage
        src={assets.stay.bigImage}
        alt="Ocean at golden hour"
        textOverlay
        eyebrow="Your turn"
        title="Ready to write your own story?"
        text="Come for the offers. Stay for the sunsets. Book directly for our best rate, a daily sundowner cocktail and a massage on the house."
        buttonLabel="Book your stay"
        onButtonClick={() => openBooking()}
      />
    </PageShell>
  );
}
