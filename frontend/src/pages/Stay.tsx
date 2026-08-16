import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { Link as RouterLink } from "react-router-dom";
import { Ornament as OrnamentIcon } from "../components/ui/icons";
import { BigImage, AfterBigImage } from "../components/sections/PageSections";
import { assets } from "../lib/assets";
import { VILLAS } from "../lib/content";
import { useApp } from "../lib/AppContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function Stay() {
  usePageMeta(
    "Stay | Ocean Resort – Bali",
    "Garden and pool villas at Ocean Resort, Lovina — elegant private villas surrounded by gardens, each with its own pool.",
    assets.stay.header,
  );
  return (
    <PageShell footerImage={assets.footers.stay}>
      <DefaultHeader
        eyebrow="Our villas"
        title="Stay in elegant simplicity"
        text="With all the luxuries that matter, and none that don't. Our villas are surrounded by gardens and decorated in a personal style, that makes you feel like staying in the home of a friend, rather than in a resort."
        extraClass="section-stay-header"
      />
      <section className="section section-stay-cards" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <ul className="row grid">
            {VILLAS.map((v) => (
              <StayCard key={v.slug} v={v} />
            ))}
          </ul>
        </div>
      </section>
      <BigImage src={assets.stay.bigImage} alt="Ocean gardens" />
      <AfterBigImage src={assets.stay.bigImage2} alt="Ocean pavilion detail" />
    </PageShell>
  );
}

function StayCard({ v }: { v: (typeof VILLAS)[number] }) {
  const { setCursorBubble } = useApp();
  return (
    <li className="col">
      <RouterLink to={`/stay/${v.slug}`} className="single-stay-card">
        <div className="card-row card-row-image">
          <div
            className="card-image"
            data-cursor-bubble-text="View"
            onMouseEnter={() => setCursorBubble("View")}
            onMouseLeave={() => setCursorBubble(null)}
          >
            <div className="card-image-wrap overlay">
              <img className="overlay lazy" src={v.image} alt={`${v.name} Overview`} loading="lazy" decoding="async" />
              <img
                className="overlay overlay-hover lazy"
                src={v.hoverImage}
                alt={`${v.name} Overview`}
                loading="lazy"
                decoding="async"
              />
              <div className="ornament white">
                <OrnamentIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="card-row card-row-title">
          <h3>{v.name}</h3>
        </div>
        <div className="card-row card-row-info">
          <p>{v.description}</p>
        </div>
      </RouterLink>
    </li>
  );
}
