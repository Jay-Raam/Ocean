import type { ReactNode } from "react";
import { Reveal } from "../motion/Reveal";
import { Ornament } from "../ui/Ornament";

interface DefaultHeaderProps {
  eyebrow?: string;
  title: string;
  titleSize?: "default" | "big";
  text?: string;
  image?: string;
  imageAlt?: string;
  smallImageBottom?: boolean;
  /** extra class for the section, e.g. "section-stay-single-header full-height" */
  extraClass?: string;
  /** overlay gradient direction */
  overlay?: "center" | "bottom";
  decoLine?: boolean;
  children?: ReactNode;
}

/**
 * Standard page hero: eyebrow + big serif title (and optional intro text),
 * optionally over a full-bleed image with a radial dark gradient, and the
 * small-image-bottom variant used by dining/relax pages.
 */
export function DefaultHeader({
  eyebrow,
  title,
  titleSize = "default",
  text,
  image,
  imageAlt = "",
  smallImageBottom = false,
  extraClass = "",
  overlay = "center",
  decoLine = true,
  children,
}: DefaultHeaderProps) {
  const cls = [
    "section",
    "default-header",
    image ? "default-image-header" : "",
    smallImageBottom ? "small-image-bottom" : "",
    extraClass,
  ]
    .filter(Boolean)
    .join(" ");

  const gradientClass = overlay === "bottom" ? "overlay-dark-gradient-bottom" : "overlay-dark-gradient";

  return (
    <section
      className={cls}
      data-theme-section={image ? "dark" : "light"}
      data-bg-section={image ? "transparent" : "light"}
    >
      {image && (
        <div className="background-media overlay">
          <figure className="overlay">
            <picture className="styled-image overlay">
              <img className="overlay" src={image} alt={imageAlt} loading="eager" decoding="async" />
            </picture>
            <div className={`overlay ${gradientClass}`} />
          </figure>
        </div>
      )}
      <div className="container">
        <div className="row centered">
          <div className="col styled-col">
            {eyebrow && (
              <Reveal index={0} className="col-row col-row-eyebrow">
                <span className="eyebrow">{eyebrow}</span>
              </Reveal>
            )}
            <Reveal index={1} className={`col-row col-row-title ${titleSize === "big" ? "big" : ""}`}>
              <h1>{title}</h1>
            </Reveal>
            {text && (
              <Reveal index={2} className="col-row col-row-text medium">
                <p>{text}</p>
              </Reveal>
            )}
            {children}
          </div>
        </div>
        {decoLine && (
          <div className="row centered">
            <div className="col-row col-row-deco">
              <div className="deco-line-y" />
            </div>
          </div>
        )}
      </div>

    </section>
  );
}

/** Small helper so page content can render an ornament row. */
export function OrnamentRow() {
  return (
    <div className="col-row col-row-ornament">
      <Ornament variant="white" />
    </div>
  );
}

export type { ReactNode };
