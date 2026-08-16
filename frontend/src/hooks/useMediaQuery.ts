import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Reference site hides the desktop nav below 1240px */
export const useIsDesktopNav = () => useMediaQuery("(min-width: 1240px)");

/** Parallax only runs on desktop (min-width: 1025px) */
export const useIsDesktop = () => useMediaQuery("(min-width: 1025px)");
