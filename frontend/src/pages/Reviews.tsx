import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage } from "../components/sections/PageSections";
import { Reveal } from "../components/motion/Reveal";
import { Ornament } from "../components/ui/Ornament";
import { assets } from "../lib/assets";
import { TESTIMONIALS } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";
import { useApp } from "../lib/AppContext";

export function Reviews() {
  const { openBooking } = useApp();
  usePageMeta(
    "Reviews | Ocean Resort – Bali",
    "Guest reviews of Ocean Resort, Lovina — what travellers say about our villas, our restaurant and our spa.",
    assets.pages.reviews.bigImage,
  );
  return (
    <PageShell footerImage={assets.pages.footers.default}>
      <DefaultHeader
        eyebrow="Guest reviews"
        title="Words from our guests"
        text="Loved by travellers from around the world — for the villas, the food, the spa and the welcome."
        extraClass="section-reviews-header"
      />
      <section className="section section-reviews-summary" data-theme-section="light" data-bg-section="light">
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">What they say</span>
              </div>
              <div className="col-row col-row-title small">
                <h2>Small resort, big feelings</h2>
              </div>
              <div className="col-row col-row-text styled-content large">
                <p>
                  Every review below comes from a real stay at Ocean. They mention the same things, again and again:
                  the gardens, the poolside dinners, the dawn dolphins, and a welcome that feels like family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-reviews-grid" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <ul className="row grid">
            {TESTIMONIALS.map((t, i) => (
              <li className="col" key={t.name}>
                <Reveal index={i % 3} delay={0.1}>
                  <article className="review-card">
                    <div className="review-card-ornament">
                      <Ornament />
                    </div>
                    <blockquote className="review-quote">{t.quote}</blockquote>
                    <div className="review-meta">
                      <span className="review-name">{t.name}</span>
                      <span className="review-origin">{t.origin}</span>
                      {t.stay && <span className="review-stay">{t.stay}</span>}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BigImage
        src={assets.pages.reviews.bigImage}
        alt="Ocean at golden hour"
        textOverlay
        eyebrow="Your turn"
        title="Ready to write your own story?"
        text="Come for the reviews. Stay for the sunsets. Book directly for our best rate, a daily sundowner cocktail and a massage on the house."
        buttonLabel="Book your stay"
        onButtonClick={() => openBooking()}
      />
    </PageShell>
  );
}
