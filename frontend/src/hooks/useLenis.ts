import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Initialises a single global Lenis instance and exposes helpers.
 * Also sets the --vh custom property (mobile viewport height).
 */
export function useLenis() {
  const reduced = usePrefersReducedMotion();
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setVh);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);

  return lenisInstance;
}

export function scrollToTop(immediate = false) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate, force: true });
  } else {
    window.scrollTo(0, 0);
  }
}

export function scrollToTarget(target: string | number) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1,
      easing: (x: number) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
    });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function stopScroll() {
  lenisInstance?.stop();
}

export function startScroll() {
  lenisInstance?.start();
  lenisInstance?.resize();
}
