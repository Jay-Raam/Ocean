import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { getLenis, startScroll, stopScroll } from "../hooks/useLenis";

export type Theme = "dark" | "light";
export type BgNav = "transparent" | "white" | "light";

interface AppContextValue {
  navigationOpen: boolean;
  creditsOpen: boolean;
  whatsappOpen: boolean;
  benefitsOpen: boolean;
  bookingOpen: boolean;
  bookingVilla: string | null;
  bookingPromo: string | null;
  cursorBubble: string | null;
  isScrolled: boolean;
  themeNav: Theme;
  bgNav: BgNav;
  pageEntered: boolean;
  setPageEntered: (v: boolean) => void;
  setNavigationOpen: (open: boolean) => void;
  toggleNavigation: () => void;
  setCreditsOpen: (open: boolean) => void;
  setWhatsappOpen: (open: boolean) => void;
  setBenefitsOpen: (open: boolean) => void;
  setBookingOpen: (open: boolean) => void;
  openBooking: (villaSlug?: string, promoCode?: string) => void;
  setCursorBubble: (text: string | null) => void;
  setIsScrolled: (v: boolean) => void;
  setThemeNav: (t: Theme) => void;
  setBgNav: (b: BgNav) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [navigationOpen, setNavigationOpenState] = useState(false);
  const [creditsOpen, setCreditsOpenState] = useState(false);
  const [whatsappOpen, setWhatsappOpenState] = useState(false);
  const [benefitsOpen, setBenefitsOpenState] = useState(false);
  const [bookingOpen, setBookingOpenState] = useState(false);
  const [bookingVilla, setBookingVilla] = useState<string | null>(null);
  const [bookingPromo, setBookingPromo] = useState<string | null>(null);
  const [cursorBubble, setCursorBubble] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [themeNav, setThemeNav] = useState<Theme>("dark");
  const [bgNav, setBgNav] = useState<BgNav>("transparent");
  const [pageEntered, setPageEntered] = useState(false);
  const scrollLockedRef = useRef(false);

  const setNavigationOpen = useCallback((open: boolean) => {
    setNavigationOpenState(open);
    if (open) {
      scrollLockedRef.current = true;
      stopScroll();
    } else {
      scrollLockedRef.current = false;
      startScroll();
    }
  }, []);

  const toggleNavigation = useCallback(() => {
    setNavigationOpenState((prev) => {
      if (prev) {
        scrollLockedRef.current = false;
        startScroll();
      } else {
        scrollLockedRef.current = true;
        stopScroll();
      }
      return !prev;
    });
  }, []);

  const setCreditsOpen = useCallback((open: boolean) => {
    setCreditsOpenState(open);
    if (open) stopScroll();
    else if (!scrollLockedRef.current) startScroll();
  }, []);

  const setWhatsappOpen = useCallback((open: boolean) => {
    setWhatsappOpenState(open);
    if (open) stopScroll();
    else if (!scrollLockedRef.current) startScroll();
  }, []);

  const setBenefitsOpen = useCallback((open: boolean) => {
    setBenefitsOpenState(open);
    if (open) stopScroll();
    else if (!scrollLockedRef.current) startScroll();
  }, []);

  const setBookingOpen = useCallback((open: boolean) => {
    setBookingOpenState(open);
    if (open) {
      scrollLockedRef.current = true;
      stopScroll();
    } else {
      scrollLockedRef.current = false;
      startScroll();
    }
  }, []);

  const openBooking = useCallback((villaSlug?: string, promoCode?: string) => {
    setBookingVilla(villaSlug ?? null);
    setBookingPromo(promoCode ?? null);
    setBookingOpenState(true);
    scrollLockedRef.current = true;
    stopScroll();
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      navigationOpen,
      creditsOpen,
      whatsappOpen,
      benefitsOpen,
      bookingOpen,
      bookingVilla,
      bookingPromo,
      cursorBubble,
      isScrolled,
      themeNav,
      bgNav,
      pageEntered,
      setNavigationOpen,
      toggleNavigation,
      setCreditsOpen,
      setWhatsappOpen,
      setBenefitsOpen,
      setBookingOpen,
      openBooking,
      setCursorBubble,
      setIsScrolled,
      setThemeNav,
      setBgNav,
      setPageEntered,
    }),
    [
      navigationOpen,
      creditsOpen,
      whatsappOpen,
      benefitsOpen,
      bookingOpen,
      bookingVilla,
      bookingPromo,
      cursorBubble,
      isScrolled,
      themeNav,
      bgNav,
      pageEntered,
      setNavigationOpen,
      toggleNavigation,
      setCreditsOpen,
      setWhatsappOpen,
      setBenefitsOpen,
      setBookingOpen,
      openBooking,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

/** Close every overlay on Escape. */
export function useCloseOnEscape() {
  const { setNavigationOpen, setCreditsOpen, setWhatsappOpen, setBenefitsOpen, setBookingOpen } = useApp();
  return useCallback(() => {
    const close = () => {
      setNavigationOpen(false);
      setCreditsOpen(false);
      setWhatsappOpen(false);
      setBenefitsOpen(false);
      setBookingOpen(false);
    };
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        startScroll();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setNavigationOpen, setCreditsOpen, setWhatsappOpen, setBenefitsOpen, setBookingOpen]);
}

/** Central access to the lenis instance for components. */
export function useLenisScroll() {
  return getLenis();
}
