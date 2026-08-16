import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SLIDER_DURATION } from "../../lib/motion";
import { useApp } from "../../lib/AppContext";
import { Ornament } from "../ui/Ornament";

interface DoubleSliderProps {
  main: string[];
  secondary: string[];
  title: string;
  text?: string;
  /** villa variant: border-bottom divider + bigger title, no intro text */
  villa?: boolean;
}

/**
 * The double slider: two linked carousels (main + secondary) advancing
 * together every 5s with a progress bar, arrows and a slide counter.
 */
export function DoubleSlider({ main, secondary, title, text = "", villa = false }: DoubleSliderProps) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const { setCursorBubble } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % main.length), [main.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + main.length) % main.length), [main.length]);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(next, SLIDER_DURATION * 1000);
    return () => clearInterval(id);
  }, [inView, next]);

  const transition = "transform 1.2s cubic-bezier(0.6, 0, 0.2, 1)";
  const bubble = (text: string) => ({
    onMouseEnter: () => setCursorBubble(text),
    onMouseLeave: () => setCursorBubble(null),
  });

  return (
    <section
      className={`section section-double-slider ${villa ? "" : "section-double-slider-dining"}`}
      data-theme-section="light"
      data-bg-section="light"
    >
      {villa && <div className="border-bottom" />}
      <div className="container">
        <div className="row row-title centered">
          <div className="col styled-col">
            <div className="col-row col-row-ornament">
              <Ornament />
            </div>
            <div className={`col-row col-row-title ${villa ? "big" : ""}`}>
              <h2>{title}</h2>
            </div>
            {text && (
              <div className="col-row col-row-text styled-content large">
                <p>{text}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container wide" ref={rootRef}>
        <div className="swiper-slider-group" data-swiper-slider-type="double">
          <div className="row">
            <div className="swiper-carousel swiper-carousel-main">
              <div
                className="swiper-wrapper"
                style={{ transform: `translate3d(${-(index * 100).toFixed(3)}%, 0, 0)`, transition }}
              >
                {main.map((src, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="swiper-slide-inner overlay" data-swiper-parallax="12.5%">
                      <figure className="styled-figure default landscape">
                        <picture className="overlay">
                          <img className="overlay" src={src} alt="Dining" width={1440} height={960} decoding="async" />
                        </picture>
                      </figure>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="swiper-carousel swiper-carousel-secondary">
              <div
                className="swiper-wrapper"
                style={{ transform: `translate3d(${-(index * 100).toFixed(3)}%, 0, 0)`, transition }}
              >
                {secondary.map((src, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="swiper-slide-inner overlay" data-swiper-parallax="12.5%">
                      <figure className="styled-figure default landscape">
                        <picture className="overlay">
                          <img className="overlay" src={src} alt="Dining" width={1440} height={960} decoding="async" />
                        </picture>
                      </figure>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="swiper-controls">
            <button className="swiper-arrow" data-swiper-control="prev" onClick={prev} aria-label="Previous" {...bubble("Prev")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <polyline points="14 19 21 12 14 5" fill="none" stroke="#000" strokeMiterlimit="10" />
                <line x1="21" y1="12" x2="2" y2="12" fill="none" stroke="#000" strokeMiterlimit="10" />
              </svg>
            </button>
            <button className="swiper-arrow" data-swiper-control="next" onClick={next} aria-label="Next" {...bubble("Next")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <polyline points="14 19 21 12 14 5" fill="none" stroke="#000" strokeMiterlimit="10" />
                <line x1="21" y1="12" x2="2" y2="12" fill="none" stroke="#000" strokeMiterlimit="10" />
              </svg>
            </button>
          </div>
          <div className="swiper-slider-info">
            <div className="progress-bar">
              <div className="swiper-pagination">
                {main.map((_, i) => (
                  <div
                    key={i}
                    className={`swiper-pagination-bullet ${i === index ? "swiper-pagination-bullet-active" : ""}`}
                  >
                    {i === index && inView && (
                      <motion.div
                        key={`progress-${index}`}
                        className="swiper-progress"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDER_DURATION, ease: "linear" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="swiper-count">
              <span className="swiper-active-slide">{index + 1}</span>
              <span> / {main.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
