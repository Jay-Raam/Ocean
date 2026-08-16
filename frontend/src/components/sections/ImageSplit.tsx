import type { ReactNode } from "react";
import { ParallaxImage } from "../ui/ParallaxImage";
import { Button } from "../ui/Button";

interface ImageSplitProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  buttonLabel?: string;
  buttonTo?: string;
  /** Render the button as a plain anchor (e.g. an in-page #anchor). */
  buttonHref?: string;
  flipped?: boolean;
  bg?: "light" | "white";
  titleSmall?: boolean;
  children?: ReactNode;
}

export function ImageSplit({
  image,
  imageAlt,
  eyebrow,
  title,
  text,
  buttonLabel,
  buttonTo,
  buttonHref,
  flipped = false,
  bg = "light",
  titleSmall = false,
  children,
}: ImageSplitProps) {
  return (
    <section
      className="section section-image-split"
      data-theme-section="light"
      data-bg-section={bg}
    >
      <div className="container">
        <div className={`row grid ${flipped ? "flipped" : ""}`}>
          <div className="col col-image">
            <ParallaxImage src={image} alt={imageAlt} strength={0.5} height={0.05} />
          </div>
          <div className="col col-content styled-col">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <div className={`col-row col-row-title ${titleSmall ? "small" : ""}`}>
              <h2>{title}</h2>
            </div>
            <div className="col-row col-row-text medium styled-content">
              <p>{text}</p>
            </div>
            {(buttonLabel && (buttonTo || buttonHref)) && (
              <div className="col-row col-row-btn">
                {buttonHref ? (
                  <Button variant="primary" as="a" href={buttonHref}>
                    {buttonLabel}
                  </Button>
                ) : (
                  <Button variant="primary" as="link" to={buttonTo as string}>
                    {buttonLabel}
                  </Button>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionShell({
  children,
  className = "",
  theme = "light",
  bg = "light",
}: {
  children: ReactNode;
  className?: string;
  theme?: string;
  bg?: string;
}) {
  return (
    <section
      className={`section ${className}`}
      data-theme-section={theme}
      data-bg-section={bg}
    >
      {children}
    </section>
  );
}
