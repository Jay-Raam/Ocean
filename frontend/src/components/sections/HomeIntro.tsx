import { ParallaxImage } from "../ui/ParallaxImage";
import { Ornament } from "../ui/Ornament";
import { Button } from "../ui/Button";
import { assets } from "../../lib/assets";

export function HomeIntro() {
  return (
    <>
      <section className="section section-home-intro" data-theme-section="light" data-bg-section="light">
        <div className="container wide">
          <div className="row grid centered">
            <div className="col col-images-left">
              <div className="col-row">
                <ParallaxImage src={assets.intro.lobbyview} alt="The Ocean lobby view" />
              </div>
              <div className="col-row">
                <ParallaxImage src={assets.intro.blacktable} alt="Black table at the Ocean restaurant" />
              </div>
            </div>
            <div className="col styled-col">
              <div className="col-row col-row-ornament">
                <Ornament />
              </div>
              <div className="col-row col-row-title small">
                <h2>Hard to find, hard to leave</h2>
              </div>
              <div className="col-row col-row-text styled-content">
                <p>
                  Just a few hours from the airport. Light years away from the crowds. Here you you find the true
                  Bali. And a small resort with a big view, a great restaurant, and a special sense of calm. Welcome
                  to Ocean.
                </p>
              </div>
              <div className="col-row col-row-btn">
                <Button variant="primary" as="link" to="/stay">
                  Explore our villas
                </Button>
              </div>
            </div>
            <div className="col col-images-right">
              <div className="col-row">
                <ParallaxImage src={assets.intro.kien228} alt="Pool villa lookout" />
              </div>
              <div className="col-row">
                <ParallaxImage src={assets.intro.poolcombo} alt="Pool villa pool and lookout" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-home-intro-after" data-theme-section="light" data-bg-section="light">
        <div className="border-top" />
        <div className="container wide">
          <div className="row centered">
            <div className="col">
              <div className="col-row col-row-eyebrow">
                <span className="eyebrow small">Ocean means 'the sea'</span>
              </div>
              <div className="col-row col-row-text">
                <p className="medium">
                  Ocean has just 15 villas, set in one of the most beautiful gardens in Bali. Some have pools,
                  some have verandas. They all have views. And often the breeze carries the scent of cloves from the
                  nearby spice plantations. Simple luxuries. Graceful tropical living. The good things in life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
