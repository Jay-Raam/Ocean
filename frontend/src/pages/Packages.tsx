import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { PackagesCards } from "../components/sections/PackagesSection";
import { assets } from "../lib/assets";
import { usePageMeta } from "../hooks/usePageMeta";

export function Packages() {
  usePageMeta(
    "Packages | Ocean Resort – Bali",
    "Stay packages at Ocean Resort, Lovina — enjoy more of Ocean at special promotional rates with included benefits.",
    assets.packages.dolphins,
  );
  return (
    <PageShell footerImage={assets.packages.footer}>
      <DefaultHeader
        eyebrow="Enhance your stay"
        title="Ocean packages"
        text="Upgrade your stay with one of our package offers to let you enjoy more of Ocean at a special promotional rate."
        extraClass="section-packages-header"
      />
      <PackagesCards />
    </PageShell>
  );
}
