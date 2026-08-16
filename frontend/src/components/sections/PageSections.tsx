import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { ParallaxImage } from "../ui/ParallaxImage";
import { Reveal } from "../motion/Reveal";

interface BigImageProps {
  src: string;
  alt?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  buttonTo?: string;
  onButtonClick?: () => void;
  textOverlay?: boolean;
}

/** Full-bleed image section (min-height 90vh) with optional centred text overlay. */
export function BigImage({
  src,
  alt = "",
  eyebrow,
  title,
  text,
  buttonLabel,
  buttonTo,
  onButtonClick,
  textOverlay = false,
}: BigImageProps) {
  return (
    <section
      className={`section section-big-image ${textOverlay ? "section-big-image-text" : ""}`}
      data-theme-section="dark"
      data-bg-section="dark"
    >
      <div className="background-media">
        <figure className="overlay">
          <picture className="styled-image overlay">
            <img className="overlay" src={src} alt={alt} loading="lazy" decoding="async" />
          </picture>
        </figure>
      </div>
      {textOverlay && (
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              {eyebrow && (
                <div className="col-row col-row-eyebrow">
                  <span className="eyebrow">{eyebrow}</span>
                </div>
              )}
              {title && (
                <div className="col-row col-row-title">
                  <h2>{title}</h2>
                </div>
              )}
              {text && (
                <div className="col-row col-row-text medium styled-content">
                  <p>{text}</p>
                </div>
              )}
              {buttonLabel && (buttonTo || onButtonClick) && (
                <div className="col-row col-row-btn">
                  {onButtonClick ? (
                    <button className="btn secondary" type="button" onClick={onButtonClick}>
                      <span className="btn-content-label">{buttonLabel}</span>
                    </button>
                  ) : (
                    <a className="btn secondary" href={buttonTo}>
                      <span className="btn-content-label">{buttonLabel}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/** The section immediately after a big image; contains the overlapping card-width figure. */
export function AfterBigImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <section className="section section-after-big-image" data-theme-section="light" data-bg-section="light">
      <div className="container">
        <div className="row centered">
          <div className="col styled-col">
            <Reveal index={0} className="col-row col-row-image">
              <figure className="styled-figure default">
                <picture className="overlay">
                  <img className="overlay" src={src} alt={alt} loading="lazy" decoding="async" />
                </picture>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ThreeImagesProps {
  images: Array<{ src: string; alt?: string }>;
  offset?: boolean;
}

/** Grid of three portrait figures (middle column offset), third hidden on mobile. */
export function ThreeImages({ images, offset = false }: ThreeImagesProps) {
  return (
    <section className="section section-three-images" data-theme-section="light" data-bg-section="light">
      <div className="container wide">
        <div className={`row grid ${offset ? "offset" : ""}`}>
          {images.map((img, i) => (
            <div className="col" key={i}>
              <ParallaxImage src={img.src} alt={img.alt ?? ""} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Small centred figure (card-width) — used to break up pages. */
export function SmallImage({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <section className="section section-small-image" data-theme-section="light" data-bg-section="light">
      <div className="container">
        <div className="row centered">
          <div className="col styled-col">
            <div className="col-row col-row-image">
              <figure className="styled-figure default">
                <picture className="overlay">
                  <img className="overlay" src={src} alt={alt} loading="lazy" decoding="async" />
                </picture>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TextSplitProps {
  eyebrow: string;
  title: string;
  text: string;
  titleSmall?: boolean;
}

/** Two-column text split (eyebrow+title left, copy right). */
export function TextSplit({ eyebrow, title, text, titleSmall = false }: TextSplitProps) {
  return (
    <section className="section section-text-split" data-theme-section="light" data-bg-section="light">
      <div className="container">
        <div className="row grid">
          <div className="col styled-col">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <div className={`col-row col-row-title ${titleSmall ? "small" : ""}`}>
              <h2>{title}</h2>
            </div>
          </div>
          <div className="col">
            <div className="col-row col-row-text">
              <p className="medium">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Parallax-scrubbed figure used for the stay detail gallery. */
export function ScrubFigure({ src, alt = "" }: { src: string; alt?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="styled-figure default" style={{ overflow: "hidden" }}>
      <motion.picture className="overlay" style={{ y }}>
        <img className="overlay" src={src} alt={alt} loading="lazy" decoding="async" />
      </motion.picture>
    </div>
  );
}

export type { ReactNode };
