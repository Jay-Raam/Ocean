import { useState } from "react";
import type { FaqItem } from "../../lib/content";
import { Ornament } from "../ui/Ornament";

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  bg?: "light" | "white";
  /** Anchor id so other sections can link straight to the FAQ. */
  id?: string;
}

/**
 * Accordion of questions/answers. One item is open at a time; the answer
 * expands with a smooth grid-rows animation (same technique as the stay
 * detail table). Reusable across Stay / Packages / Contact.
 */
export function FaqSection({ items, title = "Good to know", eyebrow = "FAQ", bg = "light", id }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={id} className="section section-faq" data-theme-section="light" data-bg-section={bg}>
      <div className="border-top" />
      <div className="container small">
        <div className="row centered">
          <div className="col styled-col">
            <div className="col-row col-row-ornament">
              <Ornament />
            </div>
            {eyebrow && (
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow">{eyebrow}</span>
              </div>
            )}
            <div className="col-row col-row-title small">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
        <div className="row row-faq">
          <div className="col">
            <ul className="faq-list">
              {items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li className={`faq-item ${isOpen ? "faq-item-active" : ""}`} key={item.question}>
                    <button
                      className="faq-question"
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <span className="faq-indicator" aria-hidden="true">
                        <span className="faq-indicator-bar" />
                        <span className="faq-indicator-bar faq-indicator-bar-h" />
                      </span>
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
