import { animate } from "motion";
import { useEffect, useRef } from "react";
import { assets } from "../../lib/assets";
import { Ornament } from "../ui/Ornament";
import { Button } from "../ui/Button";
import { useLoaderOffsets } from "../layout/Loader";
import type { LoaderPhase } from "../layout/Loader";
import { EASE } from "../../lib/motion";
import { Reveal } from "../motion/Reveal";

interface HeroProps {
  loaderPhase: LoaderPhase;
}

export function Hero({ loaderPhase }: HeroProps) {
  const { offsetPositive, offsetNegative, offsetTop } = useLoaderOffsets();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stripClip = `polygon(${offsetPositive} ${offsetTop}, ${offsetNegative} ${offsetTop}, ${offsetNegative} 100%, ${offsetPositive} 100%)`;
  const fullClip = "polygon(-1% -1%, 101% -1%, 101% 101%, -1% 101%)";

  // The whole hero section (video + content) is clipped to a narrow
  // vertical strip and rises from yPercent 50 while the loader plays.
  // Driven imperatively so the reveal is not dependent on React render
  // timing (declarative `animate` props on mount are unreliable with
  // motion 13 + React 19 in this app).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const controls = animate(
      el,
      {
        y: loaderPhase >= 1 ? "0%" : "50%",
        clipPath: loaderPhase >= 2 ? fullClip : stripClip,
      },
      { duration: 2, ease: EASE.expoInOut },
    );
    return () => controls.stop();
  }, [loaderPhase, fullClip, stripClip]);

  return (
    <section
      ref={sectionRef}
      className="section default-header section-home-header"
      data-theme-section="dark"
      data-bg-section="transparent"
      style={{ clipPath: stripClip, transform: "translateY(50%) rotate(0.001deg)" }}
    >
      <div className="background-media overlay">
        <figure className="overlay">
          <div className="styled-video playpauze overlay">
            <video
              className="overlay"
              poster={assets.hero.poster}
              src={assets.hero.video}
              loop
              muted
              playsInline
              preload="auto"
              ref={videoRef}
              onLoadedData={() => videoRef.current?.play().catch(() => undefined)}
            />
          </div>
          <div className="overlay overlay-dark-gradient" style={{ opacity: 0.3 }} />
        </figure>
      </div>
      <div className="container">
        <div className="row row-title centered">
          <div className="col styled-col">
            <Reveal index={0} delay={0.2} className="col-row col-row-ornament">
              <Ornament variant="white" />
            </Reveal>
            <Reveal index={1} delay={0.2} className="col-row col-row-eyebrow">
              <span className="eyebrow">Ocean Resort – Bali</span>
            </Reveal>
            <Reveal index={2} delay={0.2} className="col-row col-row-title big">
              <h1>Find the spirit of Bali</h1>
            </Reveal>
          </div>
        </div>
        <div className="row row-btn centered">
          <div className="col styled-col">
            <Reveal index={3} delay={0.2} className="col-row col-row-deco">
              <div className="deco-line-y" />
            </Reveal>
            <Reveal index={4} delay={0.2} className="col-row col-row-btn">
              <Button variant="secondary" as="link" to="/stay">
                Explore our villas
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
