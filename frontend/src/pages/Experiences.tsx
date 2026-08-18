import { useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage, TextSplit } from "../components/sections/PageSections";
import { ImageSplit } from "../components/sections/ImageSplit";
import { Reveal } from "../components/motion/Reveal";
import { Ornament } from "../components/ui/Ornament";
import { Button } from "../components/ui/Button";
import { assets } from "../lib/assets";
import { EXPERIENCES, EXPERIENCE_CATEGORIES } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";
import { useApp } from "../lib/AppContext";

export function Experiences() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  usePageMeta(
    "Experiences | Ocean Resort – Bali",
    "Experiences at Ocean Resort, Lovina — dolphin safaris, waterfall treks, Balinese cooking classes, snorkelling, yoga and village walks in North Bali.",
    assets.discover.bigImageWide,
  );

  const filtered = activeCategory
    ? EXPERIENCES.filter((e) => e.category === activeCategory)
    : EXPERIENCES;

  return (
    <PageShell footerImage={assets.footers.discover}>
      <DefaultHeader
        eyebrow="Do, explore, feel"
        title="Experiences at Ocean"
        text="From dawn dolphin safaris to Balinese cooking classes — every day at Ocean can be as active or as still as you wish."
        image={assets.discover.bigImageWide}
        imageAlt="North Bali scenery"
        overlay="bottom"
      />
      <section className="section section-discover-cards" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-eyebrow">
                <span className="eyebrow">Filter by category</span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title small">
                <h2>What would you like to do?</h2>
              </Reveal>
              <Reveal index={3} className="col-row col-row-text styled-content">
                <div className="experience-filters" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  <button
                    className={`btn secondary small ${activeCategory === null ? "" : ""}`}
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    style={{
                      padding: "0.5rem 1.25rem",
                      borderRadius: "2rem",
                      border: "1px solid",
                      borderColor: activeCategory === null ? "var(--c-primary)" : "var(--c-border)",
                      background: activeCategory === null ? "var(--c-primary)" : "transparent",
                      color: activeCategory === null ? "#fff" : "inherit",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                    }}
                  >
                    All
                  </button>
                  {EXPERIENCE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: "0.5rem 1.25rem",
                        borderRadius: "2rem",
                        border: "1px solid",
                        borderColor: activeCategory === cat.id ? "var(--c-primary)" : "var(--c-border)",
                        background: activeCategory === cat.id ? "var(--c-primary)" : "transparent",
                        color: activeCategory === cat.id ? "#fff" : "inherit",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontFamily: "inherit",
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-discover-cards" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <ul className="row grid">
            {filtered.map((exp) => (
              <li className="col" key={exp.slug}>
                <div className="single-discover-card">
                  <div className="card-image">
                    <img className="overlay" src={exp.image} alt={exp.title} loading="lazy" decoding="async" />
                    <div className="overlay overlay-gradient" />
                    <div className="overlay overlay-dark" />
                  </div>
                  <div className="card-content">
                    <div className="card-row card-row-eyebrow">
                      <span className="eyebrow small">{exp.category}</span>
                    </div>
                    <div className="card-row card-row-text">
                      <p className="location">{exp.title}</p>
                    </div>
                    {exp.duration && (
                      <div className="card-row card-row-info">
                        <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>{exp.duration}</p>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TextSplit
        eyebrow="Every day, something new"
        title="Make it yours"
        text="Your reception team will help you plan each day — whether it's a pre-dawn dolphin trip, a morning yoga session, an afternoon by the pool, or a sunset dinner. Nothing is rushed. Everything is optional."
      />
      <BigImage
        src={assets.discover.bigImageWide}
        alt="North Bali coastline"
        textOverlay
        eyebrow="Ready to explore?"
        title="Your adventure starts at reception"
        text="Ask our team to arrange any experience — we work with trusted local guides and will shape the day around you."
        buttonLabel="Get in touch"
        buttonTo="/contact"
      />
      <ImageSplit
        image={assets.relax.split}
        imageAlt="Spa fountains"
        eyebrow="After the adventure"
        title="Come back to calm"
        text="Return from your excursion to a poolside cocktail, a spa treatment, or simply the sound of the sea. Ocean is where adventure meets rest."
        buttonLabel="Explore our spa"
        buttonTo="/relax"
        flipped
        bg="white"
        titleSmall
      />
    </PageShell>
  );
}
