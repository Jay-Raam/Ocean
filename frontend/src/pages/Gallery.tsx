import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { BigImage } from "../components/sections/PageSections";
import { GalleryGrid } from "../components/sections/GallerySection";
import { ImageSplit } from "../components/sections/ImageSplit";
import { assets } from "../lib/assets";
import { usePageMeta } from "../hooks/usePageMeta";

export function Gallery() {
  usePageMeta(
    "Gallery | Ocean Resort – Bali",
    "A glimpse of Ocean Resort, Lovina — private pool villas, Balinese gardens, poolside dining and the spa.",
    assets.pages.gallery.bigImage,
  );
  return (
    <PageShell footerImage={assets.pages.footers.default}>
      <DefaultHeader
        eyebrow="A glimpse of Ocean"
        title="The gallery"
        text="Gardens, villas, sunsets and the sea — a few of the moments that make Ocean hard to leave."
        extraClass="section-gallery-header"
      />
      <BigImage src={assets.pages.gallery.bigImage} alt="Ocean at night" />
      <GalleryGrid />
      <ImageSplit
        image={assets.relax.split}
        imageAlt="Spa fountains"
        eyebrow="Experience it yourself"
        title="Some moments can't be framed"
        text="Browse the gallery as long as you like — the real thing comes with a villa, a pool and the sound of the sea."
        buttonLabel="Explore our villas"
        buttonTo="/stay"
        flipped
        bg="white"
        titleSmall
      />
    </PageShell>
  );
}
