import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./lib/AppContext";
import { useLenis, scrollToTop } from "./hooks/useLenis";
import { useScrollState } from "./hooks/useScrollState";
import { Header } from "./components/layout/Header";
import { FloatingElements } from "./components/layout/FloatingElements";
import { BookingModal } from "./components/booking/BookingModal";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Wordmark } from "./components/ui/icons";

// Route pages are code-split so the initial bundle stays lean; each chunk
// loads on first visit to its route and is cached afterwards.
const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const Stay = lazy(() => import("./pages/Stay").then((m) => ({ default: m.Stay })));
const Villa = lazy(() => import("./pages/Villa").then((m) => ({ default: m.Villa })));
const Dining = lazy(() => import("./pages/Dining").then((m) => ({ default: m.Dining })));
const Relax = lazy(() => import("./pages/Relax").then((m) => ({ default: m.Relax })));
const Discover = lazy(() => import("./pages/Discover").then((m) => ({ default: m.Discover })));
const DiscoverDetail = lazy(() => import("./pages/DiscoverDetail").then((m) => ({ default: m.DiscoverDetail })));
const Packages = lazy(() => import("./pages/Packages").then((m) => ({ default: m.Packages })));
const PackageDetail = lazy(() => import("./pages/PackageDetail").then((m) => ({ default: m.PackageDetail })));
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const Gallery = lazy(() => import("./pages/Gallery").then((m) => ({ default: m.Gallery })));
const Celebrate = lazy(() => import("./pages/Celebrate").then((m) => ({ default: m.Celebrate })));
const Reviews = lazy(() => import("./pages/Reviews").then((m) => ({ default: m.Reviews })));
const Experiences = lazy(() => import("./pages/Experiences").then((m) => ({ default: m.Experiences })));
const Sustainability = lazy(() => import("./pages/Sustainability").then((m) => ({ default: m.Sustainability })));
const Offers = lazy(() => import("./pages/Offers").then((m) => ({ default: m.Offers })));
const TravelGuide = lazy(() => import("./pages/TravelGuide").then((m) => ({ default: m.TravelGuide })));
const GiftVouchers = lazy(() => import("./pages/GiftVouchers").then((m) => ({ default: m.GiftVouchers })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

/**
 * Suspense fallback styled like the site's loader (cream screen + wordmark),
 * so lazy route chunks never flash a blank or white page.
 */
function RouteFallback() {
  return (
    <div className="loading-container">
      <div className="loading-screen">
        <div className="loading-logo">
          <div className="wordmark">
            <Wordmark />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Applies the theme/overlay state classes to the root element. */
function RootClassManager() {
  const {
    isScrolled,
    themeNav,
    bgNav,
    navigationOpen,
    creditsOpen,
    whatsappOpen,
    benefitsOpen,
  } = useApp();
  const location = useLocation();

  useEffect(() => {
    const root = document.querySelector(".root");
    if (!root) return;

    const cls = [
      "root",
      isScrolled ? "is-scrolled" : "",
      `theme-nav-${themeNav}`,
      `bg-nav-${bgNav}`,
      navigationOpen ? "nav-is-active" : "",
      creditsOpen ? "credits-is-active" : "",
      whatsappOpen ? "whatsapp-is-active" : "",
      benefitsOpen ? "benefits-is-active" : "",
    ]
      .filter(Boolean)
      .join(" ");

    root.className = cls;
  }, [isScrolled, themeNav, bgNav, navigationOpen, creditsOpen, whatsappOpen, benefitsOpen]);

  // Mark the short page-transition window so nav dropdowns stop capturing pointer events
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    setTransitioning(true);
    const t = window.setTimeout(() => setTransitioning(false), 1350);
    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => {
    const root = document.querySelector(".root");
    if (root) root.classList.toggle("page-transition-active", transitioning);
  }, [transitioning]);

  return null;
}

/**
 * Scrolls to the top of the page on route change (matches barba's scroll
 * behaviour). When the new route carries a hash (e.g. /dining#bar), scrolls
 * to that element instead so cross-page anchor links land on their section.
 */
function ScrollToTopOnRoute() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // Let the incoming page paint first, then jump to the anchor. Falls
      // back to the top when the target element doesn't exist.
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView();
        else scrollToTop(true);
      }, 0);
      return () => window.clearTimeout(t);
    }
    scrollToTop(true);
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoot />
      </BrowserRouter>
    </AppProvider>
  );
}

/** Everything that needs router + app context. */
function AppRoot() {
  useLenis();
  useScrollState();

  return (
    <div className="root">
      <RootClassManager />
      <ScrollToTopOnRoute />
      <Header />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/stay/:slug" element={<Villa />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/relax" element={<Relax />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:slug" element={<DiscoverDetail />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:slug" element={<PackageDetail />} />
        {/* Legacy package paths redirect to their renamed equivalents. */}
        <Route path="/packages/damai-dolphins" element={<Navigate to="/packages/ocean-dolphins" replace />} />
        <Route path="/packages/damai-romance" element={<Navigate to="/packages/ocean-romance" replace />} />
        <Route path="/packages/damai-spa-bliss" element={<Navigate to="/packages/ocean-spa-bliss" replace />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/celebrate" element={<Celebrate />} />          <Route path="/reviews" element={<Reviews />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/travel-guide" element={<TravelGuide />} />
          <Route path="/gift-vouchers" element={<GiftVouchers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <FloatingElements />
      <BookingModal />
      <CustomCursor />
    </div>
  );
}
