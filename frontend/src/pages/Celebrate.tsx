import { useNavigate } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage, ThreeImages, TextSplit } from "../components/sections/PageSections";
import { ImageSplit } from "../components/sections/ImageSplit";
import { Reveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
import { assets } from "../lib/assets";
import { CELEBRATE_PACKAGES } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

export function Celebrate() {
  const navigate = useNavigate();
  usePageMeta(
    "Celebrate | Ocean Resort – Bali",
    "Weddings and celebrations at Ocean Resort, Lovina — intimate sunset ceremonies in the gardens, vow renewals and elopements by the sea.",
    assets.pages.celebrate.header,
  );
  return (
    <PageShell footerImage={assets.pages.footers.celebrate}>
      <DefaultHeader
        eyebrow="Weddings & celebrations"
        title="Say 'I do' by the sea"
        text="A sunset ceremony in the gardens, a blessing from the village, and a dinner under the stars. Intimate, effortless and completely yours."
        image={assets.pages.celebrate.header}
        imageAlt="A romantic evening at Ocean"
        overlay="bottom"
      />
      <TextSplit
        eyebrow="The Ocean way"
        title="A celebration that feels like a secret"
        text="We host one celebration at a time, so your day is never shared. Our team takes care of the flowers, the music, the blessing and the feast — you simply arrive, and let the sunset do the rest."
      />
      <ThreeImages
        offset
        images={[
          { src: assets.pages.celebrate.images[0], alt: "Bali frangipani flowers" },
          { src: assets.pages.celebrate.images[1], alt: "Evening drinks by the pool" },
          { src: assets.pages.celebrate.images[2], alt: "The pool at dusk" },
        ]}
      />
      <section className="section section-celebrate-packages" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">Choose your moment</span>
              </div>
              <div className="col-row col-row-title small">
                <h2>Celebrations at Ocean</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container wide">
          <ul className="row grid">
            {CELEBRATE_PACKAGES.map((p) => (
              <li className="col" key={p.title}>
                <div className="celebrate-card">
                  <div className="card-image">
                    <img className="overlay" src={p.image} alt={p.title} loading="lazy" decoding="async" />
                    <div className="overlay overlay-gradient" />
                  </div>
                  <div className="celebrate-card-content">
                    <span className="eyebrow small primary">{p.eyebrow}</span>
                    <h3 className="small">{p.title}</h3>
                    <p className="medium">{p.text}</p>
                    <ul className="celebrate-includes">
                      {p.includes.map((inc) => (
                        <li key={inc}>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="celebrate-card-btn">
                      <Button variant="primary" size="small" icon={false} as="link" to="/contact#inquiry">
                        Plan this day
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BigImage
        src={assets.pages.celebrate.bigImage}
        alt="North Bali scenery"
        textOverlay
        eyebrow="Your day, your way"
        title="From a handful of guests to thirty"
        text="Whether it's just the two of you or a handful of your favourite people, we shape the ceremony, the flowers and the feast around you."
        buttonLabel="Plan your celebration"
        onButtonClick={() => navigate("/contact#inquiry")}
      />
      <section className="section section-celebrate-details" data-theme-section="light" data-bg-section="light">
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">What to expect</span>
              </div>
              <div className="col-row col-row-title small">
                <h2>Everything, taken care of</h2>
              </div>
              <Reveal index={0} className="col-row col-row-text styled-content large">
                <ul>
                  <li>Ceremony at golden hour, in the gardens or by the pool</li>
                  <li>A traditional Bali blessing with musicians from the village</li>
                  <li>Flowers, decoration and photography arranged by our team</li>
                  <li>A feast from our prize-winning kitchen, served under the stars</li>
                  <li>A night in the villa of your choice, with breakfast at dawn</li>
                </ul>
              </Reveal>
              <div className="col-row col-row-btn">
                <Button variant="primary" as="link" to="/contact">
                  Start the conversation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ImageSplit
        image={assets.pages.celebrate.couples}
        imageAlt="Couple spa treatment"
        eyebrow="After the ceremony"
        title="Honeymoon at Ocean"
        text="Follow your celebration with the Ocean Romance package — couple massages, sunset cocktails and dinners for two, for as long as you can stay."
        buttonLabel="Explore the romance package"
        buttonTo="/packages/ocean-romance"
        flipped
        bg="white"
        titleSmall
      />
    </PageShell>
  );
}
