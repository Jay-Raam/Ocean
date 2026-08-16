import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Ornament } from "../ui/Ornament";
import { Button } from "../ui/Button";
import { assets } from "../../lib/assets";
import { fetchPackages, USE_GRAPHQL } from "../../lib/graphql";

interface PackageCard {
  eyebrow: string;
  title: string;
  text: string;
  to: string;
  image: string;
}

const PACKAGES: PackageCard[] = [
  {
    eyebrow: "2 nights or more - save over 15%",
    title: "Ocean & dolphins",
    text: "Experience the dolphins of Lovina with our most popular package",
    to: "/packages/ocean-dolphins",
    image: assets.packages.dolphins,
  },
  {
    eyebrow: "2 nights or more - save over 15%",
    title: "Ocean Romance",
    text: "For honeymoons or romantic getaways",
    to: "/packages/ocean-romance",
    image: assets.packages.romance,
  },
  {
    eyebrow: "Save over 15%",
    title: "Ocean Spa Bliss",
    text: "Experience the best of the Ocean spa",
    to: "/packages/ocean-spa-bliss",
    image: assets.packages.spaBliss,
  },
];

export function PackagesIntro() {
  return (
    <section className="section section-packages-intro" data-theme-section="light" data-bg-section="light">
      <div className="border-top-ornament">
        <Ornament />
      </div>
      <div className="container">
        <ul className="row centered">
          <div className="col col-content styled-col">
            <div className="col-row col-row-title">
              <h2>Ocean packages</h2>
            </div>
            <div className="col-row col-row-text medium styled-content">
              <p>
                Upgrade your stay with one of our package offers to let you enjoy more of Ocean at a special
                promotional rate.
              </p>
            </div>
          </div>
        </ul>
      </div>
    </section>
  );
}

export function PackagesCards() {
  const [packages, setPackages] = useState<PackageCard[]>(PACKAGES);

  // Optional live content: with VITE_USE_GRAPHQL=1 the card text comes from
  // the backend's /graphql endpoint; images and routes stay bundled so the
  // page degrades gracefully if the API is unreachable.
  useEffect(() => {
    if (!USE_GRAPHQL) return;
    let cancelled = false;
    fetchPackages()
      .then((live) => {
        if (cancelled) return;
        setPackages((prev) =>
          prev.map((card) => {
            const slug = card.to.split("/").pop();
            const match = live.find((g) => g.slug === slug);
            return match
              ? {
                  ...card,
                  eyebrow: match.eyebrow.replace(/^Package — /, ""),
                  title: match.title,
                  text: match.text,
                }
              : card;
          }),
        );
      })
      .catch(() => {
        /* keep the bundled static content */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section section-packages-cards" data-theme-section="light" data-bg-section="light">
      <div className="container wide">
        <ul className="row grid">
          {packages.map((p) => (
            <li className="col" key={p.to}>
              <RouterLink to={p.to} className="single-packages-card">
                <div className="card-image">
                  <img className="overlay" src={p.image} alt={p.title} loading="lazy" decoding="async" />
                  <div className="overlay overlay-gradient" />
                  <div className="overlay overlay-dark" />
                </div>
                <div className="card-content">
                  <div className="card-row card-row-eyebrow">
                    <span className="eyebrow small">{p.eyebrow}</span>
                  </div>
                  <div className="card-row card-row-info">
                    <div className="card-row card-row-title">
                      <h3 className="small">{p.title}</h3>
                    </div>
                    <div className="card-row card-row-text">
                      <p>{p.text}</p>
                    </div>
                  </div>
                  <div className="card-row card-row-btn">
                    <Button variant="blur" size="small" icon={false}>
                      More info
                    </Button>
                  </div>
                </div>
              </RouterLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
