import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link as RouterLink } from "react-router-dom";
import { assets } from "../../lib/assets";
import { SLIDER_DURATION } from "../../lib/motion";
import { useApp } from "../../lib/AppContext";
import { useIsDesktop } from "../../hooks/useMediaQuery";

const VILLAS = [
  {
    name: "Garden Villa",
    description: "Sleeps 2 adults — with a small veranda and outdoor Balinese shower",
    to: "/stay/garden-villa",
  },
  {
    name: "Pool Villa",
    description: "Sleeps 2 adults — with a pool and outside shower",
    to: "/stay/pool-villa",
  },
  {
    name: "Luxury Pool Villa",
    description: "Sleeps 2 adults — Includes a pool, a large veranda and inside and outside bathrooms",
    to: "/stay/luxury-pool-villa",
  },
  {
    name: "Two Bedroom Pool Villa",
    description: "Sleeps 4 adults — with 2 pools, 2 bedrooms and 2 bathrooms",
    to: "/stay/two-bedroom-pool-villa",
  },
];

const TOTAL = VILLAS.length;
const SLIDE_EASE = "cubic-bezier(0.6, 0, 0.2, 1)";

export function StaySlider() {
  const [pos, setPos] = useState(0); // 0..TOTAL (TOTAL is the loop duplicate of slide 0)
  const [instant, setInstant] = useState(false);
  const [inView, setInView] = useState(true);
  const [fadingOut, setFadingOut] = useState<number | null>(null);
  const { setCursorBubble } = useApp();
  const isDesktop = useIsDesktop();
  const rootRef = useRef<HTMLDivElement>(null);
  const rowBackRef = useRef<HTMLDivElement>(null);

  const realIndex = pos % TOTAL;

  // Reference fade: mark the outgoing slide with `slide-is-transitioning` so its
  // image fades out over the active one (swiper's effect:'fade' behavior)
  const prevRealRef = useRef(realIndex);
  useEffect(() => {
    const prev = prevRealRef.current;
    if (prev !== realIndex) {
      prevRealRef.current = realIndex;
      setFadingOut(prev);
      const t = window.setTimeout(() => setFadingOut(null), 1250);
      return () => window.clearTimeout(t);
    }
  }, [realIndex]);

  // Pause/play when the slider enters/leaves the viewport
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goNext = useCallback(() => {
    setInstant(false);
    setPos((p) => {
      if (p === TOTAL) return 1;
      return p + 1;
    });
  }, []);

  const goPrev = useCallback(() => {
    setInstant(false);
    setPos((p) => {
      if (p === 0) {
        setInstant(true);
        return TOTAL;
      }
      return p - 1;
    });
  }, []);

  // Wrap-around: when the duplicate of slide 0 finishes its slide-in, snap to 0
  useEffect(() => {
    if (pos !== TOTAL) return;
    const t = window.setTimeout(() => {
      setInstant(true);
      setPos(0);
    }, 1200);
    return () => clearTimeout(t);
  }, [pos]);

  // Auto-advance (5s progress bar)
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(goNext, SLIDER_DURATION * 1000);
    return () => clearInterval(id);
  }, [inView, goNext]);

  const transition = instant ? "none" : `transform 1.2s ${SLIDE_EASE}`;

  // Row-back parallax (strength 1, height 0.05)
  const { scrollYProgress } = useScroll({
    target: rowBackRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Text slides: TOTAL + 1 entries (last = duplicate of first) for seamless looping
  const textSlides = [...VILLAS, VILLAS[0]];

  const bubble = (text: string) => ({
    onMouseEnter: () => setCursorBubble(text),
    onMouseLeave: () => setCursorBubble(null),
  });

  return (
    <section className="section section-stay-slider" data-theme-section="dark" data-bg-section="light">
      <div className="swiper-slider-group" data-swiper-slider-type="stay" ref={rootRef}>
        <div className="row row-back" ref={rowBackRef} data-parallax-strength={isDesktop ? "" : undefined}>
          <div className="swiper-controls">
            <div
              className="swiper-arrow-overlay"
              data-swiper-control="prev"
              onClick={goPrev}
              {...bubble("Prev")}
            />
            <div
              className="swiper-arrow-overlay"
              data-swiper-control="next"
              onClick={goNext}
              {...bubble("Next")}
            />
          </div>

          {/* Background fade carousel (swiper fade — slides are stacked,
              the active one gets .slide-visible, the outgoing one .slide-is-transitioning) */}
          <motion.div
            className="swiper-carousel swiper-carousel-fade"
            data-parallax-target
            style={isDesktop ? { y: bgY } : undefined}
          >
            <div className="swiper-wrapper">
              {VILLAS.map((v, i) => (
                <div
                  key={v.name}
                  className={`swiper-slide overlay ${i === realIndex ? "slide-visible" : ""} ${i === fadingOut ? "slide-is-transitioning" : ""}`}
                >
                  <div className="swiper-slide-inner overlay" data-swiper-parallax="0%">
                    <img
                      className="overlay"
                      src={assets.staySlider.background[i]}
                      alt={`${v.name} Detail`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="overlay overlay-dark" />
          </motion.div>

          {/* Text carousel */}
          <div className="swiper-carousel swiper-carousel-text">
            <div
              className="swiper-wrapper"
              style={{ transform: `translate3d(${-(pos * 100).toFixed(3)}%, 0, 0)`, transition }}
            >
              {textSlides.map((v, i) => (
                <div key={`${v.name}-${i}`} className={`swiper-slide ${i === pos ? "swiper-slide-active" : ""}`}>
                  <div className="swiper-slide-inner" data-swiper-parallax="0%">
                    <p>{v.description}</p>
                    <h2>{v.name}</h2>
                  </div>
                  <RouterLink to={v.to} className="overlay overlay-link" {...bubble("View")} />
                </div>
              ))}
            </div>
          </div>

          <div className="swiper-count">
            <span className="swiper-active-slide">{realIndex + 1}</span>
            <div className="deco-line-x" />
            <span>{TOTAL}</span>
          </div>
        </div>

        {/* Card carousel */}
        <div className="row row-slider-card">
          <div className="swiper-carousel swiper-carousel-main">
            <div
              className="swiper-wrapper"
              style={{ transform: `translate3d(${-(pos * 100).toFixed(3)}%, 0, 0)`, transition }}
            >
              {textSlides.map((v, i) => (
                <div key={`${v.name}-card-${i}`} className="swiper-slide">
                  <div className="swiper-slide-inner overlay">
                    <img
                      className="overlay"
                      src={assets.staySlider.card[i % TOTAL]}
                      alt={`${v.name} Overview`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <RouterLink to={v.to} className="overlay overlay-link" {...bubble("View")} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="swiper-slider-info">
          <div className="progress-bar">
            <div className="swiper-pagination">
              {VILLAS.map((_, i) => (
                <div
                  key={i}
                  className={`swiper-pagination-bullet ${i === realIndex ? "swiper-pagination-bullet-active" : ""}`}
                >
                  {i === realIndex && inView && (
                    <motion.div
                      key={`progress-${pos}`}
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
        </div>
      </div>
    </section>
  );
}
