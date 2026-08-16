import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SimpleLoader } from "./Loader";
import { useApp } from "../../lib/AppContext";
import { Footer } from "./Footer";

/** Module-level flag: the simple loader only plays on the very first page load. */
let bootstrapped = false;

interface PageShellProps {
  children: ReactNode;
  footerImage: string;
}

export function PageShell({ children, footerImage }: PageShellProps) {
  const { setPageEntered } = useApp();
  const [loading, setLoading] = useState(() => !bootstrapped);
  const entered = useRef(false);

  const handleDone = useCallback(() => {
    if (!entered.current) {
      entered.current = true;
      bootstrapped = true;
      setLoading(false);
      setPageEntered(true);
    }
  }, [setPageEntered]);

  return (
    <>
      {loading && <SimpleLoader onDone={handleDone} />}
      <main className="main" id="main">
        <div className="main-wrap">{children}</div>
      </main>
      <Footer footerImage={footerImage} />
    </>
  );
}
