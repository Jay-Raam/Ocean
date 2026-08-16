import { useEffect, useRef, useState } from "react";
import { ClockIcon } from "../ui/icons";

export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
  duration?: string;
  category: string;
  special?: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
}

interface MenuSectionProps {
  title: string;
  categories: MenuCategory[];
  items: MenuItem[];
  disclaimer?: string;
  bg?: "light" | "white";
  /** Anchor id so other sections on the page can link straight to the menu. */
  id?: string;
}

function MenuStar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <polygon points="12 2.5 14.6 8.9 21.5 9.4 16.3 13.9 17.9 20.6 12 17 6.1 20.6 7.7 13.9 2.5 9.4 9.4 8.9 12 2.5" />
    </svg>
  );
}

/**
 * Filterable menu (dining / spa treatments). The first category is active by
 * default; switching filters fades the grid out, swaps items and fades back in
 * — matching a toggle-fade-out / toggle-fade-in sequence.
 */
export function MenuSection({ title, categories, items, disclaimer, bg = "white", id }: MenuSectionProps) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const select = (category: string) => {
    if (category === active) return;
    setPhase("out");
    timers.current.push(
      window.setTimeout(() => {
        setActive(category);
        setPhase("in");
      }, 200),
    );
    timers.current.push(
      window.setTimeout(() => {
        setPhase("idle");
      }, 400),
    );
  };

  return (
    <section id={id} className="section section-menu" data-filter-section data-theme-section="light" data-bg-section={bg}>
      <div className="border-top" />
      <div className="container">
        <div className="row">
          <h2>{title}</h2>
        </div>
        <div className="row row-menu-controls" data-filter-group>
          <div className="col">
            <ul className="menu-controls" data-lenis-prevent>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`single-menu-btn ${active === c.id ? "filter-active" : ""}`}
                  data-filter-category={c.id}
                  data-filter-status={active === c.id ? "active" : "not-active"}
                  onClick={() => select(c.id)}
                >
                  <span>{c.label}</span>
                </button>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="row row-menu-grid"
          data-filter-grid
          style={{
            opacity: phase === "idle" ? 1 : 0,
            transform: phase === "out" ? "translateY(0.5em)" : phase === "in" ? "translateY(var(--gap))" : "translateY(0em)",
            transition:
              phase === "out"
                ? "opacity 0.2s ease-in, transform 0.2s cubic-bezier(0.7, 0, 0.84, 0)"
                : "opacity 0.2s ease-out, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="col">
            {categories.map((c) => {
              const visible = items.filter((i) => i.category === c.id);
              return (
                <ul
                  key={c.id}
                  className="menu-list"
                  data-filter-category={c.id}
                  data-filter-status={active === c.id ? "active" : "not-active"}
                  style={{ display: active === c.id ? "flex" : "none" }}
                >
                  {visible.map((item, i) => (
                    <li
                      key={`${item.name}-${i}`}
                      className={`single-menu-item ${item.special ? "special" : ""}`}
                      data-filter-category={item.category}
                    >
                      <div className="border-top" />
                      <div className="col-menu col-menu-eyebrow">
                        {item.special && <MenuStar />}
                        <span className="eyebrow primary">{item.name}</span>
                      </div>
                      {item.description && (
                        <div className="col-menu col-menu-text">
                          <p>{item.description}</p>
                        </div>
                      )}
                      <div className="col-menu col-menu-price">
                        {item.price && <p>{item.price}</p>}
                        {item.duration && (
                          <p className="duration">
                            <ClockIcon />
                            <span>{item.duration}</span>
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        </div>
        {disclaimer && (
          <div className="row row-disclaimer">
            <div className="col">
              <p>{disclaimer}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
