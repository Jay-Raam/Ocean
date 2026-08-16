import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { CSSProperties } from "react";
import { useIsDesktop } from "../../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  /** data-parallax-strength: 0.5 is typical; 1 for hero-adjacent rows */
  strength?: number;
  /** data-parallax-height: 0.2 typical for figures, 0.05 for wide rows */
  height?: number;
  /** aspect ratio modifier */
  landscape?: boolean;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}

/**
 * Parallax: the image is oversized vertically (height: 100% +
 * 2*parallaxHeight) and translated from -strength*10% to +strength*10%
 * of its own height while scrolling (desktop only).
 */
export function ParallaxImage({
  src,
  alt = "",
  strength = 0.5,
  height = 0.2,
  landscape = false,
  className = "",
  imgClassName = "",
  loading = "lazy",
}: ParallaxImageProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  const enabled = isDesktop && !reduced;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-strength * 10}%`, `${strength * 10}%`]);

  const style = {
    "--parallax-strength": `${strength * 20}%`,
    "--parallax-height": `${height * 20}%`,
  } as CSSProperties;

  return (
    <figure
      ref={ref}
      className={`styled-figure default ${landscape ? "landscape" : ""} ${className}`}
      data-parallax-strength={enabled ? "" : undefined}
      style={style}
    >
      <picture className={`overlay ${imgClassName}`}>
        <motion.img
          className="overlay"
          data-parallax-target
          style={enabled ? { y } : undefined}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes="(max-width: 720px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
      </picture>
    </figure>
  );
}
