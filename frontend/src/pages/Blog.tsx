import { useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage } from "../components/sections/PageSections";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { CalendarIcon, ArrowIcon } from "../components/ui/icons";
import { assets } from "../lib/assets";
import { BLOG_CARDS } from "../lib/content";
import { usePageMeta } from "../hooks/usePageMeta";

export function Blog() {
  usePageMeta(
    "Blog | Ocean Resort – Bali",
    "Guides and stories about Lovina, North Bali — from dolphins and waterfalls to choosing the perfect villa at Ocean Resort.",
    assets.blog.bigImage,
  );
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? BLOG_CARDS.filter((card) => card.title.toLowerCase().includes(q))
    : BLOG_CARDS;

  return (
    <PageShell footerImage={assets.footers.blog}>
      <DefaultHeader
        eyebrow="Blog"
        title="Ocean Blog"
        text="Welcome to our blog, where we share unforgettable experiences waiting for you in the serene north of Bali. From breathtaking nature and cultural encounters to indulgent wellness retreats and culinary delights, Ocean is your gateway to a world of tranquility and adventure. Whether you're seeking relaxation or exploration, find inspiration for your next journey right here."
        decoLine={false}
        extraClass="section-blog-header"
      />
      <section className="section section-blog-cards" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <div className="blog-search">
            <div className="blog-search-field">
              <svg
                className="blog-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20.5 20.5l-4.6-4.6" />
              </svg>
              <input
                className="blog-search-input"
                type="search"
                placeholder="Search articles"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search articles by title"
              />
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="blog-search-empty">No articles match "{query.trim()}".</p>
          ) : (
          <ul className="row grid">
            {filtered.map((card) => (
              <li className="col" key={card.title}>
                <a href={card.href} className="single-discover-card" data-cursor-bubble-text="Read">
                  <div className="card-image">
                    <img className="overlay" src={card.image} alt={card.title} loading="lazy" decoding="async" />
                    <div className="overlay overlay-gradient" />
                    <div className="overlay overlay-dark" />
                  </div>
                  <div className="card-content">
                    <div className="card-row card-row-eyebrow">
                      <span className="eyebrow">{card.title}</span>
                    </div>
                    <div className="card-row card-row-location">
                      <p className="location">
                        <CalendarIcon />
                        {card.date}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          )}
        </div>
      </section>
      <section className="section section-newsletter" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-eyebrow">
                <span className="eyebrow">Newsletter</span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title small">
                <h2>The Ocean letter</h2>
              </Reveal>
              <Reveal index={3} className="col-row col-row-text styled-content large">
                <p>
                  A little note from North Bali, delivered to your inbox — new stories, seasonal offers, and
                  quiet moments from the resort. No noise, ever.
                </p>
              </Reveal>
              <Reveal index={4} className="col-row col-row-newsletter">
                {subscribed ? (
                  <p className="newsletter-done" role="status">
                    Thank you for subscribing. See you in your inbox.
                  </p>
                ) : (
                  <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
                    <label className="visually-hidden" htmlFor="newsletter-email">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      className={`newsletter-input ${error ? "has-error" : ""}`}
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      aria-label="Email address"
                    />
                    <button className="btn btn-newsletter" type="submit">
                      <span>Subscribe</span>
                      <ArrowIcon />
                    </button>
                    {error && (
                      <p className="newsletter-error" role="alert">
                        {error}
                      </p>
                    )}
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-small-image" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament />
              </Reveal>
              <Reveal index={1} className="col-row col-row-title small">
                <h2>Step off the beaten path</h2>
              </Reveal>
              <Reveal index={2} className="col-row col-row-text styled-content large">
                <p>
                  Here, just a few steps off the beaten path, you will find yourself far from the crowds, and close
                  to the true heart of Bali. A dance class in the village. The scent of clove in the breeze. A famous
                  temple or a secret waterfall. Welcome to North Bali.
                </p>
              </Reveal>
              <Reveal index={3} className="col-row-image">
                <ParallaxImage src={assets.discover.smallImage} alt="Discover" strength={0.5} height={0.2} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <BigImage src={assets.blog.bigImage} alt="North Bali scenery" />
    </PageShell>
  );
}
