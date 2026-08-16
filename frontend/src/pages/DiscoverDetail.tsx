import { useParams } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { BigImage } from "../components/sections/PageSections";
import { PackagesIntro, PackagesCards } from "../components/sections/PackagesSection";
import { DoubleSlider } from "../components/sections/DoubleSlider";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { DISCOVER_DETAILS } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

export function DiscoverDetail() {
  const { slug } = useParams();
  const detail = DISCOVER_DETAILS.find((d) => d.slug === slug) ?? DISCOVER_DETAILS[0];
  usePageMeta(
    `${detail.title} | Ocean Resort – Bali`,
    `${detail.intro} Discover more in North Bali from Ocean Resort, Lovina.`,
    detail.bigImage,
  );

  return (
    <PageShell footerImage={detail.footer}>
      <section
        className="section default-header section-discover-single-header"
        data-theme-section="light"
        data-bg-section="light"
      >
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-eyebrow">
                <span className="eyebrow primary">{detail.eyebrow}</span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title large">
                <h1>{detail.title}</h1>
              </Reveal>
              <Reveal index={3} className="col-row col-row-text styled-content large">
                <p>{detail.intro}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <BigImage src={detail.bigImage} alt={detail.title} />

      <section
        className="section section-three-images-block section-combine-no-padding offset"
        data-theme-section="light"
        data-bg-section="light"
      >
        <div className="container small">
          <ul className="row centered">
            <div className="col col-content styled-col">
              <Reveal index={0} className="col-row col-row-eyebrow">
                <span className="eyebrow primary">{detail.blockEyebrow}</span>
              </Reveal>
              {detail.blockTitle && (
                <Reveal index={1} className="col-row col-row-title full">
                  <h2>{detail.blockTitle}</h2>
                </Reveal>
              )}
              <Reveal index={2} className="col-row col-row-text full styled-content">
                <p>{detail.blockText}</p>
              </Reveal>
            </div>
          </ul>
        </div>
        <div className="container full">
          <div className="row grid">
            {detail.images.map((src, i) => (
              <div className="col" key={i}>
                <ParallaxImage src={src} alt={detail.title} strength={1} height={0.1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-small-image section-combine-no-padding" data-theme-section="light" data-bg-section="light">
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              {detail.smallEyebrow && (
                <Reveal index={1} className="col-row col-row-eyebrow">
                  <span className="eyebrow primary">{detail.smallEyebrow}</span>
                </Reveal>
              )}
              {detail.smallTitle && (
                <Reveal index={2} className="col-row col-row-title small">
                  <h2>{detail.smallTitle}</h2>
                </Reveal>
              )}
              <Reveal index={3} className="col-row col-row-text full styled-content">
                <p>{detail.smallText}</p>
              </Reveal>
              <Reveal index={4} className="col-row-image">
                <ParallaxImage src={detail.smallImage} alt={detail.title} strength={0.5} height={0.2} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {detail.highlights && (
        <>
          <section className="section section-line section-combine-no-padding" data-theme-section="light" data-bg-section="light">
            <div className="border-top" />
          </section>
          <DoubleSlider
            main={detail.highlights}
            secondary={detail.highlights}
            title="Trip highlights"
            text=""
          />
        </>
      )}

      <PackagesIntro />
      <PackagesCards />
    </PageShell>
  );
}
