import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { SLIDER_DURATION } from "../../lib/motion";
import { TESTIMONIALS } from "../../lib/content";
import { Ornament } from "../ui/Ornament";
import { Button } from "../ui/Button";
import { useApp } from "../../lib/AppContext";

const TRANSITION = "transform 1.2s cubic-bezier(0.6, 0, 0.2, 1)";

/**
 * Guest reviews carousel — a quote slider in the site's swiper vocabulary:
 * slides advance together every few seconds with a progress bar, arrows and
 * a counter, matching the double slider / stay slider rhythm.
 */
export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const { setCursorBubble } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(next, SLIDER_DURATION * 1000);
    return () => clearInterval(id);
  }, [inView, next]);

  const bubble = (text: string) => ({
    onMouseEnter: () => setCursorBubble(text),
    onMouseLeave: () => setCursorBubble(null),
  });

  return (
    <section className="section section-testimonials" data-theme-section="light" data-bg-section="light">
      <div className="border-top-ornament">
        <Ornament />
      </div>
      <div className="container">
        <div className="row centered">
          <div className="col styled-col">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow">Guest reviews</span>
            </div>
            <div className="col-row col-row-title small">
              <h2>Words from our guests</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container" ref={rootRef}>
        <div className="testimonials-carousel">
          <div
            className="testimonials-track"
            style={{ transform: `translate3d(${-(index * 100).toFixed(3)}%, 0, 0)`, transition: TRANSITION }}
          >
            {TESTIMONIALS.map((t) => (
              <div className="testimonials-slide" key={t.name}>
                <blockquote className="testimonials-quote">{t.quote}</blockquote>
                <div className="testimonials-meta">
                  <span className="testimonials-name">{t.name}</span>
                  <span className="testimonials-origin">{t.origin}</span>
                  {t.stay && <span className="testimonials-stay">{t.stay}</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials-controls">
            <button className="testimonials-arrow" type="button" onClick={prev} aria-label="Previous review" {...bubble("Prev")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <polyline points="14 19 21 12 14 5" fill="none" stroke="currentColor" strokeMiterlimit="10" />
                <line x1="21" y1="12" x2="2" y2="12" fill="none" stroke="currentColor" strokeMiterlimit="10" />
              </svg>
            </button>
            <div className="testimonials-pagination" role="tablist" aria-label="Review slides">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`testimonials-bullet ${i === index ? "testimonials-bullet-active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Review ${i + 1} of ${count}`}
                  aria-selected={i === index}
                  role="tab"
                >
                  {i === index && inView && (
                    <motion.span
                      key={`progress-${index}`}
                      className="testimonials-progress"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDER_DURATION, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button className="testimonials-arrow" type="button" onClick={next} aria-label="Next review" {...bubble("Next")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <polyline points="14 19 21 12 14 5" fill="none" stroke="currentColor" strokeMiterlimit="10" />
                <line x1="21" y1="12" x2="2" y2="12" fill="none" stroke="currentColor" strokeMiterlimit="10" />
              </svg>
            </button>
          </div>
          <div className="testimonials-footer">
            <span className="testimonials-count">
              {index + 1} / {count}
            </span>
            <Button variant="outline" size="small" as="link" to="/reviews">
              Read all reviews
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
