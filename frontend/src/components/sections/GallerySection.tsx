import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GALLERY_ITEMS } from "../../lib/content";
import { useApp } from "../../lib/AppContext";

/**
 * Gallery grid + lightbox. Tiles follow the site's card language (portrait
 * ratio, gradient + caption overlay, cursor bubble); clicking opens a
 * keyboard-navigable lightbox with prev/next arrows.
 */
export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const { setCursorBubble } = useApp();
  const count = GALLERY_ITEMS.length;
  const touchRef = useRef<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) => setActive((a) => (a === null ? a : (a + d + count) % count)),
    [count],
  );

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  // Keyboard navigation
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  // Touch swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchRef.current == null) return;
    const dx = e.changedTouches[0].clientX - touchRef.current;
    touchRef.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const bubble = (text: string) => ({
    onMouseEnter: () => setCursorBubble(text),
    onMouseLeave: () => setCursorBubble(null),
  });

  const arrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="14 19 21 12 14 5" fill="none" stroke="currentColor" strokeMiterlimit="10" />
      <line x1="21" y1="12" x2="2" y2="12" fill="none" stroke="currentColor" strokeMiterlimit="10" />
    </svg>
  );

  const closeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <>
      <section className="section section-gallery-grid" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <ul className="row grid">
            {GALLERY_ITEMS.map((item, i) => (
              <li className="col" key={item.src}>
                <button
                  type="button"
                  className="single-gallery-item"
                  onClick={() => setActive(i)}
                  data-cursor-bubble-text="View"
                  {...bubble("View")}
                  aria-label={`View ${item.alt}`}
                >
                  <div className="card-image">
                    <img className="overlay lazy" src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                    <div className="overlay overlay-gradient" />
                    <div className="overlay overlay-dark" />
                  </div>
                  <div className="card-content">
                    <div className="card-row card-row-eyebrow">
                      <span className="eyebrow small">{item.category}</span>
                    </div>
                    <div className="card-row card-row-text">
                      <p>{item.alt}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY_ITEMS[active].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={close}
              aria-label="Close gallery"
            >
              {closeIcon()}
            </button>

            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow-prev"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
            >
              {arrow()}
            </button>

            <figure
              className="gallery-lightbox-figure"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={GALLERY_ITEMS[active].src}
                  src={GALLERY_ITEMS[active].src}
                  alt={GALLERY_ITEMS[active].alt}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </AnimatePresence>
              <figcaption>
                <span className="gallery-lightbox-category">{GALLERY_ITEMS[active].category}</span>
                <span className="gallery-lightbox-title">{GALLERY_ITEMS[active].alt}</span>
                <span className="gallery-lightbox-count">
                  {active + 1} / {count}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow-next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
            >
              {arrow()}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
