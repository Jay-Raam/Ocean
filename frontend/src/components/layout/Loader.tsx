import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { Iconmark, Wordmark } from "../ui/icons";
import { EASE, TRANSITION_OFFSET } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { startScroll, stopScroll } from "../../hooks/useLenis";

/**
 * Loader phase machine for the home page:
 *  0 idle    – hero clipped to a narrow vertical strip, logo centred
 *  1 rising  – hero slides up (yPercent 50→0), logo drifts to 35%
 *  2 expand  – clip expands to full, logo svgs slide away, hero content settles
 *  3 fade    – logo fades out
 *  4 done    – overlay removed, header + col-rows reveal
 */
export type LoaderPhase = 0 | 1 | 2 | 3 | 4;

export function useLoaderOffsets() {
  const width = typeof window !== "undefined" ? window.innerWidth : 1920;
  let offset = 10;
  if (width < 1024) offset = 15;
  if (width < 720) offset = 20;
  if (width < 540) offset = 25;
  const offsetTop = width < 1024 ? "60%" : "45%";
  return { offsetPositive: `${50 - offset}%`, offsetNegative: `${50 + offset}%`, offsetTop };
}

interface HomeLoaderProps {
  onDone: () => void;
  onPhase: (p: LoaderPhase) => void;
}

export function HomeLoader({ onDone, onPhase }: HomeLoaderProps) {
  const [phase, setPhase] = useState<LoaderPhase>(0);
  const reduced = usePrefersReducedMotion();
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setPhase(4);
      onPhase(4);
      onDone();
      return;
    }
    // Stop scrolling while the loader plays
    stopScroll();
    let cancelled = false;
    const timers: number[] = [];
    const at = (ms: number, p: LoaderPhase) => timers.push(window.setTimeout(() => {
      setPhase(p);
      onPhase(p);
    }, ms));

    at(0, 1);
    at(1800, 2);
    at(2600, 3);
    at(3800, 4);
    timers.push(window.setTimeout(() => {
      if (!cancelled && !doneRef.current) {
        doneRef.current = true;
        startScroll();
        onDone();
      }
    }, 3800));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      if (!doneRef.current) startScroll();
    };
  }, [reduced, onDone, onPhase]);

  // Reference: logo top drifts 50% -> 35% (0-2s) then 35% -> 5% (1.8-3.8s)
  const logoTop = phase === 0 ? "50%" : phase === 1 ? "35%" : "5%";
  const logoMotion = {
    top: logoTop,
    transition: { duration: 2, ease: EASE.expoInOut },
  };

  return (
    <motion.div
      className="loading-container"
      animate={phase >= 4 ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
      transition={{ duration: 0.01 }}
      style={{ pointerEvents: phase >= 4 ? "none" : "auto" }}
    >
      <div className="loading-screen" style={phase >= 4 ? { display: "none" } : undefined}>
        <motion.div
          className="loading-logo"
          initial={{ top: "50%" }}
          animate={logoMotion}
          style={{ opacity: phase >= 3 ? 0 : 1, transition: "opacity 0.4s ease" }}
        >
          <motion.div
            className="wordmark"
            animate={{ y: phase >= 2 ? "-100%" : "0%", rotate: 0.001 }}
            transition={{ duration: 0.9, ease: EASE.expoIn }}
          >
            <Wordmark />
          </motion.div>
          <motion.div
            className="iconmark"
            animate={{ y: phase >= 2 ? "-100%" : "0%", rotate: 0.001 }}
            transition={{ duration: 0.9, ease: EASE.expoIn, delay: 0.1 }}
          >
            <Iconmark />
          </motion.div>
        </motion.div>
        {/* The hero below is clipped to a narrow strip by the Hero component (loaderPhase). */}
      </div>
    </motion.div>
  );
}

/** Simple loader used on non-home pages (mirrors initLoader). */
export function SimpleLoader({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setHidden(true), 1100);
    const t2 = window.setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone();
      }
    }, 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="loading-container"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE.nav }}
          style={{ pointerEvents: "none" }}
        >
          <div className="loading-screen">
            <motion.div className="loading-logo">
              <motion.div
                className="wordmark"
                animate={{ y: "-100%", rotate: 0.001 }}
                transition={{ duration: 1.2, ease: EASE.expoInOut, delay: 0.2 }}
              >
                <Wordmark />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Full-screen light overlay shown between routes with a rotating progress
 * circle — replicates the barba pageTransitionIn/Out behaviour.
 *
 * Driven by CSS transitions/keyframes (not motion's declarative animate),
 * which is reliable under React 19 here. The circle is keyed by pathname so
 * its rotate/dash animation restarts on every route change.
 */
export function PageTransitionOverlay() {
  const location = useLocation();
  const [fading, setFading] = useState(true);

  useEffect(() => {
    // Route change: fade the screen in, then (after TRANSITION_OFFSET) out.
    setFading(false);
    const t = window.setTimeout(() => setFading(true), TRANSITION_OFFSET);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div
      className="transition-screen"
      style={{
        opacity: fading ? 0 : 1,
        visibility: fading ? "hidden" : "visible",
        transition: `opacity 0.4s cubic-bezier(0.3, 0, 0.3, 1), visibility 0s linear ${fading ? "0.4s" : "0s"}`,
      }}
    >
      <div
        key={location.pathname}
        className="loading-circle"
        style={{
          opacity: fading ? 0 : 1,
          transition: `opacity 0.65s ease-in ${fading ? "0s" : "0.1s"}`,
        }}
      >
        <svg className="transition-circle-svg" viewBox="0 0 50 50" fill="none">
          <circle className="transition-circle" cx="25" cy="25" r="19.5" stroke="black" />
        </svg>
      </div>
    </div>
  );
}
