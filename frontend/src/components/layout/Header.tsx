import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useApp } from "../../lib/AppContext";
import { assets } from "../../lib/assets";
import { BRAND } from "../../lib/brand";
import { Wordmark, ArrowIcon } from "../ui/icons";
import { Link } from "../ui/Link";
import { PageTransitionOverlay } from "./Loader";

const NAV_ITEMS = [
  { label: "Stay", to: "/stay" },
  { label: "Dining", to: "/dining" },
  { label: "Relax", to: "/relax" },
  { label: "Discover", to: "/discover" },
  { label: "Packages", to: "/packages" },
  { label: "Blog", to: "/blog" },
] as const;

const STAY_LINKS = [
  { label: "Garden Villa", to: "/stay/garden-villa" },
  { label: "Pool Villa", to: "/stay/pool-villa" },
  { label: "Luxury Pool Villa", to: "/stay/luxury-pool-villa" },
  { label: "Two Bedroom Pool Villa", to: "/stay/two-bedroom-pool-villa" },
];

const DISCOVER_LINKS = [
  { label: "Secret Waterfalls", to: "/discover/secret-waterfalls" },
  { label: "Dolphins of Lovina", to: "/discover/dolphins-of-lovina" },
  { label: "Diving and Snorkling", to: "/discover/diving-and-snorkling" },
  { label: "Golf in the Volcano", to: "/discover/golf-in-the-volcano" },
  { label: "North Bali", to: "/discover/north-bali" },
];

export function Header() {
  return (
    <header>
      <PageTransitionOverlay />
      <NavBar />
      <div className="overlay overlay-dark side-nav-back" data-navigation-toggle="close" />
      <SideNav />
    </header>
  );
}

function NavBar() {
  const { toggleNavigation, setNavigationOpen, navigationOpen, openBooking } = useApp();
  const location = useLocation();

  // Close the side navigation whenever the route changes
  useEffect(() => {
    setNavigationOpen(false);
  }, [location.pathname, setNavigationOpen]);

  const isActive = (to: string) => {
    if (to === "/stay" && location.pathname.startsWith("/stay")) return true;
    if (to === "/dining" && location.pathname.startsWith("/dining")) return true;
    if (to === "/relax" && location.pathname.startsWith("/relax")) return true;
    if (to === "/discover" && location.pathname.startsWith("/discover")) return true;
    if (to === "/packages" && location.pathname.startsWith("/packages")) return true;
    if (to === "/blog" && location.pathname.startsWith("/blog")) return true;
    return false;
  };

  return (
    <div className="main-nav-bar">
      <div className="overlay overlay-background" />
      <div className="overlay overlay-alt-background" />
      <div className="border-bottom" />
      <div className="row nav-bar-scrolled-height">
        <div className="logo">
          <RouterLink to="/" className="logo-click" aria-label={`${BRAND.name} – home`}>
            <Wordmark />
          </RouterLink>
        </div>
        <nav aria-label="Navigation Desktop">
          <div
            className="cheeseburger"
            data-navigation-toggle="toggle"
            onClick={toggleNavigation}
            aria-label={navigationOpen ? "Close menu" : "Open menu"}
          >
            <div className="cheeseburger-inner">
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </div>
          </div>
          <div className="deco-line" />
          <ul className="nav-link-ul">
            {NAV_ITEMS.map((item) => (
              <li
                className={`nav-link nav-link-relative ${isActive(item.to) ? "link-is-active" : ""}`}
                key={item.to}
              >
                <RouterLink className="nav-link-click" to={item.to}>
                  <div className="nav-link-content">
                    <span>{item.label}</span>
                  </div>
                </RouterLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="btn btn-nav secondary small">
          <button className="btn-click" type="button" onClick={() => openBooking()}>
            <div className="btn-content">
              <span className="text-desktop">Book your stay</span>
              <span className="text-mobile">Book</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function SideNav() {
  const { setNavigationOpen } = useApp();
  const location = useLocation();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    setActiveImage(null);
  }, [location.pathname]);

  const navImageId = (path: string) => path.replace("/", "");

  return (
    <div className="side-nav-box">
      <ul className="side-nav-images" data-nav-image-group>
        {NAV_ITEMS.map((item) => (
          <li
            key={item.to}
            className={`overlay single-nav-image ${activeImage === navImageId(item.to) ? "nav-image-active" : ""}`}
            data-nav-image-id={navImageId(item.to)}
          >
            <figure className="overlay">
              <picture className="styled-image overlay">
                <img
                  className="overlay"
                  src={assets.navImages[navImageId(item.to) as keyof typeof assets.navImages]}
                  alt=""
                  width={720}
                  height={1440}
                />
              </picture>
            </figure>
          </li>
        ))}
      </ul>
      <div className="side-nav" data-lenis-prevent>
        <div className="close" data-navigation-toggle="close" onClick={() => setNavigationOpen(false)}>
          <div className="close-inner">
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>
        <div className="row row-links-primary">
          <nav className="col" aria-label="Navigation Mobile">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow small">Menu</span>
            </div>
            <ul className="col-row col-row-mobile-nav">
              {NAV_ITEMS.map((item) => (
                <li
                  className={`nav-link ${location.pathname.startsWith(item.to) ? "link-is-active" : ""}`}
                  key={item.to}
                  data-nav-image-id={navImageId(item.to)}
                  onMouseEnter={() => setActiveImage(navImageId(item.to))}
                  onMouseLeave={() => setActiveImage(null)}
                >
                  <RouterLink className="nav-link-click" to={item.to} onClick={() => setNavigationOpen(false)}>
                    <div className="nav-link-content">
                      <span>{item.label}</span>
                    </div>
                  </RouterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="row row-links-secondary">
          <div className="border-top" />
          <div className="col col-link-stay">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow small">Stay</span>
            </div>
            <ul className="col-row col-row-links">
              {STAY_LINKS.map((l) => (
                <li className="link" key={l.to}>
                  <RouterLink className="link-click" to={l.to} onClick={() => setNavigationOpen(false)}>
                    <span>{l.label}</span>
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col col-link-discover">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow small">Discover</span>
            </div>
            <ul className="col-row col-row-links">
              {DISCOVER_LINKS.slice(0, 3).map((l) => (
                <li className="link" key={l.to}>
                  <RouterLink className="link-click" to={l.to} onClick={() => setNavigationOpen(false)}>
                    <span>{l.label}</span>
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col col-link-explore">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow small">Explore</span>
            </div>
            <ul className="col-row col-row-links">
              {[
                { label: "About", to: "/about" },
                { label: "Gallery", to: "/gallery" },
                { label: "Celebrate", to: "/celebrate" },
                { label: "Reviews", to: "/reviews" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li className="link" key={l.to}>
                  <RouterLink className="link-click" to={l.to} onClick={() => setNavigationOpen(false)}>
                    <span>{l.label}</span>
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row row-rating">
          <div className="border-top" />
          <div className="col">
            <div className="col-row col-row-rating">
              <Link href={`https://wa.me/${BRAND.contact.whatsapp}`} external inactive small>
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ArrowIcon };
