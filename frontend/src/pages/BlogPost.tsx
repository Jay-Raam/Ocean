import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { Reveal } from "../components/motion/Reveal";
import { ParallaxImage } from "../components/ui/ParallaxImage";
import { Ornament } from "../components/ui/Ornament";
import { Button } from "../components/ui/Button";
import { CalendarIcon } from "../components/ui/icons";
import { assets } from "../lib/assets";
import { BLOG_POSTS, getBlogPost } from "../lib/blog";
import type { BlogPost as BlogPostData } from "../lib/blog";
import { usePageMeta } from "../hooks/usePageMeta";

/* ------------------------- Reading time ------------------------- */

function readingMinutes(post: BlogPostData): number {
  const words = post.sections.reduce(
    (total, s) => total + s.paragraphs.join(" ").split(/\s+/).filter(Boolean).length,
    0,
  );
  return Math.max(1, Math.ceil(words / 200));
}

/* ------------------------- Reading progress bar ------------------------- */

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const total = doc.scrollHeight - doc.clientHeight;
        setProgress(total > 0 ? Math.min(100, (doc.scrollTop / total) * 100) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="blog-progress" aria-hidden="true">
      <div className="blog-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

/* ------------------------- Share links ------------------------- */

function ShareRow({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = encodeURIComponent(`${title} — Ocean Resort`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="col-row col-row-share">
      <div className="share-row">
        <span className="share-label">Share</span>
        <button type="button" className="share-link" onClick={copy}>
          {copied ? "Copied!" : "Copy link"}
        </button>
        <a
          className="share-link"
          href={`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
        <a
          className="share-link"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
      </div>
    </div>
  );
}

/* ------------------------- Page ------------------------- */

export function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug ?? "") ?? BLOG_POSTS[0];
  usePageMeta(
    `${post.title} | Ocean Resort – Bali`,
    `${post.sections[0]?.paragraphs[0]?.slice(0, 150) ?? post.title} Read the full guide on the Ocean Resort blog.`,
    post.image,
  );

  const idx = Math.max(
    0,
    BLOG_POSTS.findIndex((p) => p.slug === post.slug),
  );
  const prev = BLOG_POSTS[(idx - 1 + BLOG_POSTS.length) % BLOG_POSTS.length];
  const next = BLOG_POSTS[(idx + 1) % BLOG_POSTS.length];
  const more = [
    next,
    BLOG_POSTS[(idx + 2) % BLOG_POSTS.length],
    BLOG_POSTS[(idx + 3) % BLOG_POSTS.length],
  ];

  return (
    <PageShell footerImage={assets.footers.blog}>
      <ReadingProgress />

      <section
        className="section default-header section-blog-single-header"
        data-theme-section="light"
        data-bg-section="light"
      >
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament variant="transparent-dark" />
              </Reveal>
              <Reveal index={1} className="col-row col-row-eyebrow">
                <span className="eyebrow">
                  <CalendarIcon /> {post.date} · {readingMinutes(post)} min read
                </span>
              </Reveal>
              <Reveal index={2} className="col-row col-row-title large">
                <h1>{post.title}</h1>
              </Reveal>
              <Reveal index={3} className="col-row col-row-image">
                <ParallaxImage src={post.image} alt={post.title} />
              </Reveal>
              <Reveal index={4} className="col-row col-row-share">
                <ShareRow title={post.title} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-textarea" data-theme-section="light" data-bg-section="light">
        <div className="container small">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-info styled-content blog-article">
                {post.sections.map((section, si) => (
                  <div className="blog-section" key={si}>
                    {section.heading && <h2>{section.heading}</h2>}
                    {section.paragraphs.map((p) => (
                      <p key={p.slice(0, 32)}>{p}</p>
                    ))}
                  </div>
                ))}
              </div>

              <nav className="col-row blog-prevnext" aria-label="Blog post navigation">
                <Link to={`/blog/${prev.slug}`} className="blog-prevnext-link is-prev">
                  <span className="blog-prevnext-direction">← Previous article</span>
                  <span className="blog-prevnext-title">{prev.title}</span>
                </Link>
                <Link to={`/blog/${next.slug}`} className="blog-prevnext-link is-next">
                  <span className="blog-prevnext-direction">Next article →</span>
                  <span className="blog-prevnext-title">{next.title}</span>
                </Link>
              </nav>

              <Reveal index={0} className="col-row col-row-btn">
                <Button variant="secondary" as="link" to="/blog">
                  Back to the blog
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-blog-cards" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <div className="row centered">
            <div className="col styled-col">
              <div className="col-row col-row-title small">
                <h2>More articles</h2>
              </div>
            </div>
          </div>
          <ul className="row grid">
            {more.map((p) => (
              <li className="col" key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="single-discover-card" data-cursor-bubble-text="Read">
                  <div className="card-image">
                    <img className="overlay" src={p.image} alt={p.title} loading="lazy" decoding="async" />
                    <div className="overlay overlay-gradient" />
                    <div className="overlay overlay-dark" />
                  </div>
                  <div className="card-content">
                    <div className="card-row card-row-eyebrow">
                      <span className="eyebrow">{p.title}</span>
                    </div>
                    <div className="card-row card-row-location">
                      <p className="location">
                        <CalendarIcon />
                        {p.date}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
