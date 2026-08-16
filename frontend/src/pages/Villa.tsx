import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";
import { BigImage, ThreeImages } from "../components/sections/PageSections";
import { PackagesIntro, PackagesCards } from "../components/sections/PackagesSection";
import { DoubleSlider } from "../components/sections/DoubleSlider";
import { ImageSplit, SectionShell } from "../components/sections/ImageSplit";
import { Reveal } from "../components/motion/Reveal";
import { Ornament } from "../components/ui/Ornament";
import { Dots } from "../components/ui/icons";
import { usePageMeta } from "../hooks/usePageMeta";
import { assets } from "../lib/assets";
import { VILLAS } from "../lib/content";
import { useApp } from "../lib/AppContext";

function FacilitiesTable({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const visible = items.slice(0, 6);
  const hidden = items.slice(6);

  return (
    <ul className="table" data-table-status={open ? "active" : "not-active"}>
      <div className="table-group table-group-visible">
        {visible.map((item, i) => (
          <li className="table-row" key={item}>
            {i < 2 && <div className="border-top" />}
            <div className="border-bottom" />
            <span>{item}</span>
          </li>
        ))}
      </div>
      <div className="table-group table-group-hidden">
        <div className="table-group-inner">
          {hidden.map((item) => (
            <li className="table-row" key={item}>
              <div className="border-bottom" />
              <span>{item}</span>
            </li>
          ))}
        </div>
      </div>
      {hidden.length > 0 && (
        <div className="icon-link">
          <div
            className="icon-link-click"
            onClick={() => setOpen((o) => !o)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen((o) => !o);
              }
            }}
          >
            <div className="icon-link-content">
              <span className="on-not-active">Show more</span>
              <span className="on-active">Show less</span>
              <Dots />
            </div>
          </div>
        </div>
      )}
    </ul>
  );
}

export function Villa() {
  const { slug } = useParams();
  const { openBooking } = useApp();
  const villa = VILLAS.find((v) => v.slug === slug) ?? VILLAS[0];
  const nextVilla = VILLAS[(VILLAS.findIndex((v) => v.slug === villa.slug) + 1) % VILLAS.length];
  usePageMeta(
    `${villa.name} | Ocean Resort – Bali`,
    `${villa.text} Book ${villa.name.toLowerCase()} at Ocean Resort, Lovina, Bali.`,
    villa.headerImage,
  );

  return (
    <PageShell footerImage={villa.footer}>
      <section
        className="section default-header default-image-header section-stay-single-header full-height"
        data-theme-section="dark"
        data-bg-section="light"
      >
        <div className="background-media overlay">
          <figure className="overlay">
            <picture className="styled-image overlay">
              <img className="overlay" src={villa.headerImage} alt={villa.name} loading="eager" decoding="async" />
            </picture>
            <div className="overlay overlay-dark-gradient" />
          </figure>
        </div>
        <div className="container">
          <div className="row row-title centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-ornament">
                <Ornament variant="white" />
              </Reveal>
              <Reveal index={1} className="col-row col-row-title big">
                <h1>{villa.name}</h1>
              </Reveal>
              <Reveal index={2} className="col-row col-row-text">
                <p>{villa.sleeps}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-theme-section="light" data-bg-section="light">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-eyebrow">
                <span className="eyebrow secondary">{villa.name}</span>
              </Reveal>
              <Reveal index={1} className="col-row col-row-title medium">
                <h2>{villa.title}</h2>
              </Reveal>
              <Reveal index={2} className="col-row col-row-text styled-content large">
                <p>{villa.text}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ThreeImages
        offset
        images={villa.images.map((src) => ({ src, alt: villa.name }))}
      />

      <SectionShell className="section-text-center">
        <div className="container">
          <div className="row centered">
            <div className="col styled-col">
              <Reveal index={0} className="col-row col-row-text styled-content large">
                <p>
                  Stay in elegant simplicity with all the luxuries that matter, and none that don't. Our villas are
                  surrounded by gardens and decorated in a personal style, that makes you feel like staying in the
                  home of a friend, rather than in a resort.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </SectionShell>

      <ImageSplit
        image={assets.villaFacilitiesImage}
        imageAlt={`${villa.name} bathroom`}
        eyebrow="Facilities"
        title="The villa is equipped with"
        text=""
        buttonLabel=""
        buttonTo=""
        titleSmall
      >
        <div className="col-row col-row-table">
          <FacilitiesTable items={villa.facilities} />
        </div>
      </ImageSplit>

      <DoubleSlider main={[...assets.villaGallery]} secondary={[...assets.villaGallery]} title="Get an impression" villa />

      <PackagesIntro />
      <PackagesCards />

      <BigImage
        src={assets.villaBigImage}
        alt={villa.name}
        eyebrow={`Discover our ${nextVilla.name}`}
        title="Visit Ocean"
        buttonLabel="Book your stay"
        buttonTo="/stay"
        onButtonClick={() => openBooking(villa.slug)}
        textOverlay
      />
    </PageShell>
  );
}
