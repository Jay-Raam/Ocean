import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage, TextSplit } from "../components/sections/PageSections";
import { Reveal } from "../components/motion/Reveal";
import { Ornament } from "../components/ui/Ornament";
import { Button } from "../components/ui/Button";
import { assets } from "../lib/assets";
import { GIFT_VOUCHERS } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

export function GiftVouchers() {
  usePageMeta(
    "Gift Vouchers | Ocean Resort – Bali",
    "Gift vouchers for Ocean Resort, Lovina — give the gift of a pool villa, a spa ritual, a dinner under the stars, or the full Ocean experience.",
    assets.dining.barImage,
  );
  return (
    <PageShell footerImage={assets.footers.packages}>
      <DefaultHeader
        eyebrow="Give the gift of Ocean"
        title="Gift vouchers"
        text="A night in paradise, a spa ritual for two, dinner under the stars — give someone you love an experience they will never forget."
        image={assets.dining.barImage}
        imageAlt="Evening drinks by the pool"
        overlay="bottom"
      />
      <TextSplit
        eyebrow="How it works"
        title="Simple, thoughtful, lasting"
        text="Choose a voucher below, and we will send you a beautifully designed certificate by email. Your recipient can book any date — subject to availability — and redeem it directly with our reservations team."
      />
      <section className="section section-celebrate-packages" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <ul className="row grid">
            {GIFT_VOUCHERS.map((voucher) => (
              <li className="col" key={voucher.title}>
                <Reveal index={0}>
                  <div className="celebrate-card">
                    <div className="card-image">
                      <img className="overlay" src={voucher.image} alt={voucher.title} loading="lazy" decoding="async" />
                      <div className="overlay overlay-gradient" />
                    </div>
                    <div className="celebrate-card-content">
                      <span className="eyebrow small primary">{voucher.eyebrow}</span>
                      <h3 className="small">{voucher.title}</h3>
                      <p className="medium">{voucher.text}</p>
                      <div className="celebrate-card-btn" style={{ marginTop: "1rem" }}>
                        <Button variant="primary" size="small" icon={false} as="link" to="/contact">
                          Enquire
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
                <span className="eyebrow">Corporate gifts</span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title small">
                <h2>For teams and clients</h2>
              </Reveal>
              <Reveal index={3} className="col-row col-row-text styled-content large">
                <p>
                  Looking for a memorable gift for your team or valued clients? We offer custom voucher packages
                  for groups — from spa days for the office to multi-night retreats. Contact us for a tailored quote.
                </p>
              </Reveal>
              <Reveal index={4} className="col-row col-row-btn">
                <Button variant="primary" as="link" to="/contact">
                  Get in touch
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
        eyebrow="Still unsure?"
        title="Let us help you choose"
        text="Not sure which voucher is right? Tell us about the person you're gifting, and we will recommend the perfect Ocean experience."
        buttonLabel="Contact us"
        buttonTo="/contact"
      />
    </PageShell>
  );
}
