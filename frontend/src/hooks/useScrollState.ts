import { useEffect } from "react";
import { useApp, type BgNav, type Theme } from "../lib/AppContext";
import { getLenis } from "./useLenis";

/**
 * Scroll-state helpers:
 * - data-scrolling-started flips to true past 50px of scroll
 * - data-theme-nav follows the section under the nav bar
 * - data-bg-nav follows the section under the viewport centre
 */
export function useScrollState() {
  const { setIsScrolled, setThemeNav, setBgNav } = useApp();

  useEffect(() => {
    let lastScrollTop = 0;
    let raf = 0;

    const check = () => {
      const lenis = getLenis();
      const currentScrollTop = lenis?.scroll ?? window.scrollY ?? 0;

      if (Math.abs(lastScrollTop - currentScrollTop) >= 1) {
        const started = currentScrollTop > 50;
        setIsScrolled(started);
        lastScrollTop = currentScrollTop;
      }

      const navBar = document.querySelector(".main-nav-bar .nav-bar-scrolled-height");
      const navOffset = navBar ? navBar.getBoundingClientRect().height : 0;
      const centerOffset = window.innerHeight / 2;

      const themeSections = document.querySelectorAll("[data-theme-section]");
      themeSections.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        if (bounds.top <= navOffset && bounds.bottom >= navOffset) {
          const theme = section.getAttribute("data-theme-section") as Theme | null;
          if (theme !== null) setThemeNav(theme);
        }
        if (bounds.top <= centerOffset && bounds.bottom >= centerOffset) {
          const bg = section.getAttribute("data-bg-section") as BgNav | null;
          if (bg !== null) setBgNav(bg);
        }
      });

      raf = requestAnimationFrame(check);
    };

    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, [setIsScrolled, setThemeNav, setBgNav]);
}
