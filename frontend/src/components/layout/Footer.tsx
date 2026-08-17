import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link as RouterLink } from "react-router-dom";
import { IconLink } from "../ui/IconLink";
import { useApp } from "../../lib/AppContext";
import { BRAND } from "../../lib/brand";

interface FooterProps {
  footerImage: string;
}

export function Footer({ footerImage }: FooterProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useApp();
  const { scrollYProgress } = useScroll({
    target: bookRef,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);

  return (
    <footer className="section section-footer" data-theme-section="light" data-bg-section="light">
      <div className="container full">
        <div className="row row-links">
          <div className="border-top" />
          <nav className="col col-links-primary" aria-label="Navigation Footer Primary">
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow small">Menu</span>
            </div>
            <ul className="col-row col-row-links-primary">
              {[
                { label: "Stay", to: "/stay" },
                { label: "Dining", to: "/dining" },
                { label: "Relax", to: "/relax" },
                { label: "Discover", to: "/discover" },
                { label: "Packages", to: "/packages" },
                { label: "Blog", to: "/blog" },
              ].map((l) => (
                <li className="nav-link" key={l.to}>
                  <RouterLink className="nav-link-click" to={l.to}>
                    <div className="nav-link-content">
                      <span>{l.label}</span>
                    </div>
                  </RouterLink>
                </li>
              ))}
            </ul>
            <div className="col-row col-row-eyebrow col-row-explore-eyebrow">
              <span className="eyebrow small">Explore</span>
            </div>
            <ul className="col-row col-row-links-explore">
              {[
                { label: "About", to: "/about" },
                { label: "Gallery", to: "/gallery" },
                { label: "Celebrate", to: "/celebrate" },
                { label: "Reviews", to: "/reviews" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li className="link" key={l.to}>
                  <RouterLink className="link-click" to={l.to}>
                    <span>{l.label}</span>
                  </RouterLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col col-links-secondary">
            <div className="border-left" />
            <div className="col-split col-split-link-stay">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow small">Stay</span>
              </div>
              <ul className="col-row col-row-links">
                {[
                  { label: "Garden Villa", to: "/stay/garden-villa" },
                  { label: "Pool Villa", to: "/stay/pool-villa" },
                  { label: "Luxury Pool Villa", to: "/stay/luxury-pool-villa" },
                  { label: "Two Bedroom Pool Villa", to: "/stay/two-bedroom-pool-villa" },
                ].map((l) => (
                  <li className="link" key={l.to}>
                    <RouterLink className="link-click" to={l.to}>
                      <span>{l.label}</span>
                    </RouterLink>
                  </li>
                ))}
              </ul>
              <div className="col-row-more-link">
                <IconLink to="/stay">Overview</IconLink>
              </div>
            </div>
            <div className="col-split col-split-link-discover">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow small">Discover</span>
              </div>
              <ul className="col-row col-row-links">
                {[
                  { label: "Secret Waterfalls", to: "/discover/secret-waterfalls" },
                  { label: "Dolphins of Lovina", to: "/discover/dolphins-of-lovina" },
                  { label: "Diving and Snorkling", to: "/discover/diving-and-snorkling" },
                ].map((l) => (
                  <li className="link" key={l.to}>
                    <RouterLink className="link-click" to={l.to}>
                      <span>{l.label}</span>
                    </RouterLink>
                  </li>
                ))}
              </ul>
              <div className="col-row-more-link">
                <IconLink to="/discover">Show more</IconLink>
              </div>
            </div>
          </div>
          <div className="col col-credentials">
            <div className="border-left" />
            <div className="col-row col-row-eyebrow">
              <span className="eyebrow small">Contact</span>
            </div>
            <div className="col-row col-row-address">
              <p className="medium">{BRAND.contact.addressLine1}</p>
              <p className="medium">{BRAND.contact.addressLine2}</p>
            </div>
            <ul className="col-row col-row-external-links">
              <li className="link">
                <a className="link-click" href={BRAND.contact.phoneHref}>
                  <span>T: {BRAND.contact.phoneDisplay}</span>
                </a>
              </li>
              <li className="link">
                <a className="link-click" href={BRAND.contact.emailHref}>
                  <span>E: {BRAND.contact.emailDisplay}</span>
                </a>
              </li>
              <li className="link">
                <div className="link-click">
                  <span>Reception: WhatsApp</span>
                  <a className="overlay" href={`https://wa.me/${BRAND.contact.whatsapp}`} target="_blank" rel="noreferrer" />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="row row-credits">
          <div className="border-top" />
          <div className="col col-socials">
            <div className="border-left" />
            <ul className="col-row col-row-socials">
              <li className="link small inactive">
                <a className="link-click" href={BRAND.social.instagram} target="_blank" rel="noreferrer">
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="col col-copyright">
            <div className="border-left" />
            <div className="col-split">
              <p className="small inactive">© 2026 {BRAND.copyright}</p>
            </div>
            <div className="col-split">
              <BuiltInCredits />
            </div>
          </div>
        </div>

        <div className="row row-book" ref={bookRef}>
          <div className="col">
            <motion.figure className="overlay" style={{ y }}>
              <picture className="styled-image overlay">
                <img className="overlay" src={footerImage} alt="" loading="lazy" decoding="async" />
              </picture>
            </motion.figure>
            <div className="btn secondary">
              <button className="btn-click" type="button" onClick={() => openBooking()}>
                <div className="btn-content">
                  <span>Book your stay</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BuiltInCredits() {
  const { creditsOpen, setCreditsOpen } = useApp();
  return (
    <div className="icon-link built-in">
      <div
        className="icon-link-click"
        onClick={() => setCreditsOpen(!creditsOpen)}
      >
        <div className="icon-link-content">
          <span>Built by {BRAND.creditsName}</span>
        </div>
      </div>
    </div>
  );
}

