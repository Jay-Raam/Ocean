import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { AfterBigImage, BigImage, ThreeImages, TextSplit } from "../components/sections/PageSections";
import { MenuSection } from "../components/sections/MenuSection";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/motion/Reveal";
import { assets } from "../lib/assets";
import { SPA_CATEGORIES, SPA_MENU, SPA_DISCLAIMER } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";
import { useApp } from "../lib/AppContext";

export function Relax() {
  const { openBooking } = useApp();
  usePageMeta(
    "Relax | Ocean Resort – Bali",
    "The Ocean Spa at Ocean Resort, Lovina — holistic Balinese treatments and rituals for renewal of body and mind.",
    assets.relax.header,
  );
  return (
    <PageShell footerImage={assets.relax.footer}>
      <DefaultHeader
        eyebrow="Be pampered in Paradise"
        title="The Ocean Spa"
        image={assets.relax.header}
        imageAlt="The Ocean spa building"
        smallImageBottom
      />
      <AfterBigImage src={assets.relax.ekaBreathe} alt="Spa guest breathing deeply" />
      <TextSplit
        eyebrow=""
        title="New energy from old tradition"
        text="The Spa at Ocean offers a range of massage treatments based on traditional Balinese techniques. A combination of gentle stretches, acupressure, reflexology, and aromatherapy stimulates the flow of blood and energy around your body to bring a sense of wellbeing, calm and deep relaxation. The spa also offer a range of spiritual experiences, combining massage treatments with traditional Balinese cleansing rituals, giving you insight into Balinese culture and beliefs while bringing balance to your energy flows. The spa offers private and public yoga sessions as well as a limited range of beauty treatments."
      />
      <ThreeImages
        images={[
          { src: assets.relax.bigImage, alt: "Spa treatment" },
          { src: assets.relax.split, alt: "Spa fountains" },
          { src: assets.relax.kien404, alt: "Spa detail" },
        ]}
      />
      <section className="section section-small-image" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-title full">
                <h2>Organic well-being</h2>
              </Reveal>
              <Reveal index={2} className="col-row col-row-text styled-content large">
                <p>
                  The oils and spa products are home made, based on traditional Balinese recipies. We use only virgin
                  organic coconut oil, produced especially for us in our village.
                </p>
              </Reveal>
              <Reveal index={3} className="col-row-image">
                <ParallaxImage src={assets.relax.kien402} alt="Massage female zen" strength={0.5} height={0.2} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <MenuSection
        title="Our treatments"
        categories={SPA_CATEGORIES}
        items={SPA_MENU}
        disclaimer={SPA_DISCLAIMER}
      />
      <BigImage src={assets.relax.kien208} alt="Spa guest relaxing" />
      <section className="section section-after-big-image" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-image">
                <ParallaxImage src={assets.relax.kien215} alt="Yoga instructor" />
              </Reveal>
              <Reveal index={1} className="col-row col-row-title small">
                <h2>Yoga</h2>
              </Reveal>
              <Reveal index={2} className="col-row col-row-text styled-content">
                <p>
                  We offer private yoga sessions, and weekly complimentary yoga sessions, free for all to enjoy.
                </p>
              </Reveal>
              <Reveal index={3} className="col-row col-row-btn">
                <Button variant="primary" onClick={() => openBooking()}>
                  Make a reservation
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
