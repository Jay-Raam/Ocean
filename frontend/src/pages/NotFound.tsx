import { PageShell } from "../components/layout/PageShell";
import { DefaultHeader } from "../components/sections/DefaultHeader";
import { Button } from "../components/ui/Button";
import { Ornament } from "../components/ui/Ornament";
import { usePageMeta } from "../hooks/usePageMeta";
import { assets } from "../lib/assets";

export function NotFound() {
  usePageMeta(
    "Page Not Found | Ocean Resort – Bali",
    "The page you are looking for does not exist. Return to the Ocean Resort homepage.",
  );

  return (
    <PageShell footerImage={assets.footers.home}>
      <DefaultHeader
        eyebrow="Error 404"
        title="Page not found"
        text="The page you are looking for has drifted out to sea. Let us bring you back to shore."
        extraClass="section-not-found"
      >
        <div className="col-row col-row-ornament">
          <Ornament />
        </div>
        <div className="col-row col-row-btn">
          <Button as="link" to="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </DefaultHeader>
    </PageShell>
  );
}
