import { useParams, Link as RouterLink } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { BigImage, ThreeImages } from "../components/sections/PageSections";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { Button } from "../components/ui/Button";
import { PACKAGE_DETAILS } from "../lib/content";
import { useApp } from "../lib/AppContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function PackageDetail() {
  const { slug } = useParams();
  const { openBooking } = useApp();
  const detail = PACKAGE_DETAILS.find((p) => p.slug === slug) ?? PACKAGE_DETAILS[0];
  usePageMeta(
    `${detail.title} | Ocean Resort – Bali`,
    `${detail.text} Ocean Resort package — book with promo code ${detail.bookingCode}.`,
    detail.bigImage,
  );

  return (
    <PageShell footerImage={detail.footer}>
      <section
        className="section default-header section-packages-single-header"
        data-theme-section="light"
        data-bg-section="light"
      >
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb-list">
              <li>
                <RouterLink to="/">Home</RouterLink>
              </li>
              <li className="breadcrumb-sep" aria-hidden="true">
                /
              </li>
              <li>
                <RouterLink to="/packages">Packages</RouterLink>
              </li>
              <li className="breadcrumb-sep" aria-hidden="true">
                /
              </li>
              <li aria-current="page">{detail.title}</li>
            </ol>
          </nav>
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament variant="transparent-dark" />
              </Reveal>
              <Reveal index={1} className="col-row col-row-eyebrow">
                <span className="eyebrow secondary">{detail.eyebrow}</span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title large">
                <h1>{detail.title}</h1>
              </Reveal>
              <Reveal index={3} className="col-row col-row-text styled-content large">
                <p>{detail.text}</p>
              </Reveal>
              {detail.image && (
                <Reveal index={4} className="col-row col-row-image">
                  <ParallaxImage src={detail.image} alt={detail.title} />
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      <BigImage src={detail.bigImage} alt={detail.title} />

      <section className="section section-textarea" data-theme-section="light" data-bg-section="light">
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-info styled-content">
                {detail.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
                {detail.includes && (
                  <>
                    <p>
                      <strong>The package includes:</strong>
                    </p>
                    <ul>
                      {detail.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </Reveal>
              <Reveal index={1} className="col-row col-row-booking-code">
                <p className="small inactive">
                  Use booking code <u>{detail.bookingCode}</u> when making your reservation or use the link below:
                </p>
              </Reveal>
              <Reveal index={2} className="col-row col-row-btn">
                <Button variant="secondary" onClick={() => openBooking(undefined, detail.bookingCode)}>
                  Book package
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ThreeImages
        images={detail.images.map((src) => ({ src, alt: detail.title }))}
      />
    </PageShell>
  );
}
