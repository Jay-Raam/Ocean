import { useEffect, useRef, useState } from "react";
import { useApp } from "../../lib/AppContext";
import { assets } from "../../lib/assets";
import { BRAND } from "../../lib/brand";
import { WhatsAppIcon } from "../ui/icons";
import { Button } from "../ui/Button";

const CREDIT_PEOPLE = [
  { role: "Design & Code", name: BRAND.creditsName, url: "#" },
];

export function FloatingElements() {
  const { creditsOpen, whatsappOpen, benefitsOpen } = useApp();

  return (
    <div className="floating-elements">
      <CreditsPopup open={creditsOpen} />
      <WhatsappPopup open={whatsappOpen} />
      <BenefitsPopup open={benefitsOpen} />
      <FloatingWhatsapp />
    </div>
  );
}

function CreditsPopup({ open }: { open: boolean }) {
  const { setCreditsOpen } = useApp();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    setActive(0);
    const interval = setInterval(() => {
      setPrev((p) => p);
      setActive((a) => {
        setPrev(a);
        return (a + 1) % assets.credits.length;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setPrev(null), 1000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <>
      <div className="overlay overlay-dark credits-back" onClick={() => setCreditsOpen(false)} />
      <div className="credits-box">
        <div className="credits">
          <div className="close" onClick={() => setCreditsOpen(false)}>
            <div className="close-inner">
              <div className="bar" />
              <div className="bar" />
            </div>
          </div>
          <ul className="credits-images">
            <div className="overlay overlay-gradient" />
            {assets.credits.map((src, i) => (
              <li
                key={src}
                className={`overlay single-credits-image ${i === active ? "active" : ""} ${
                  prev === i ? "prev-active" : ""
                }`}
              >
                <img alt="Credits Image" className="overlay" src={src} loading="lazy" />
              </li>
            ))}
          </ul>
          <div className="credits-title">
            <h4>Credits</h4>
          </div>
          <div className="credits-names">
            {CREDIT_PEOPLE.map((p) => (
              <div className="single-name" key={p.name}>
                <span className="eyebrow tiny">{p.role}</span>
                <div className="link small">
                  <a className="link-click" href={p.url} target="_blank" rel="noreferrer">
                    <span>{p.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function WhatsappPopup({ open: _open }: { open: boolean }) {
  const { setWhatsappOpen } = useApp();
  return (
    <>
      <div className="overlay overlay-dark whatsapp-back" onClick={() => setWhatsappOpen(false)} />
      <div className="whatsapp-box">
        <div className="whatsapp">
          <div className="close" onClick={() => setWhatsappOpen(false)}>
            <div className="close-inner">
              <div className="bar" />
              <div className="bar" />
            </div>
          </div>
          <div className="whatsapp-qr">
            <WhatsAppQr />
          </div>
          <div className="whatsapp-eyebrow">
            <span className="eyebrow tiny primary">Whatsapp us</span>
          </div>
          <div className="whatsapp-text">
            <p className="small">Scan the QR Code to chat with our staff via your smartphone.</p>
          </div>
          <div className="whatsapp-btn">
            <Button size="tiny" variant="outline" as="a" href={`https://wa.me/${BRAND.contact.whatsapp}`} external icon={false}>
              or chat via desktop
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function BenefitsPopup({ open: _open }: { open: boolean }) {
  const { setBenefitsOpen } = useApp();
  return (
    <>
      <div className="overlay overlay-dark benefits-back" onClick={() => setBenefitsOpen(false)} />
      <div className="benefits-box">
        <div className="benefits" data-lenis-prevent>
          <div className="close" onClick={() => setBenefitsOpen(false)}>
            <div className="close-inner">
              <div className="bar" />
              <div className="bar" />
            </div>
          </div>
          <div className="benefits-eyebrow">
            <h3 className="small">Direct Booking Benefits:</h3>
          </div>
          <div className="benefits-box-list">
            <div className="benefits-box-item">
              <span className="eyebrow small primary">Best Rate Guarantee</span>
              <p className="medium">
                Should you find a lower publicly available rate within 24 hours of booking and at least 48 hours
                before arrival, we will match it. The rate must apply to the same room type, stay dates, guests and
                booking conditions.
              </p>
            </div>
            <div className="benefits-box-item">
              <span className="eyebrow small primary">Free Daily Sundowner Cocktail</span>
              <p className="medium">
                Enjoy a complimentary sundowner cocktail each day of your stay, served between 17:00 and 19:00. A
                non-alcoholic alternative is also available, with one complimentary drink included per person, per
                day of your stay.
              </p>
            </div>
            <div className="benefits-box-item">
              <span className="eyebrow small primary">One Hour Free Massage</span>
              <p className="medium">
                Relax with one complimentary 60-minute spa treatment per booking, designed to help you slow down and
                unwind during your stay. Advance reservation is recommended to ensure availability at your preferred
                time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FloatingWhatsapp() {
  const { setWhatsappOpen } = useApp();
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={buttonRef}
      className="floating-whatsapp-btn"
      onClick={() => setWhatsappOpen(true)}
      aria-label="WhatsApp"
    >
      <WhatsAppIcon />
    </button>
  );
}

/** Simplified WhatsApp QR (the full 464×464 matrix was extracted; render a compact block pattern). */
function WhatsAppQr() {
  return (
    <svg viewBox="0 0 464 464" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="464" height="464" fill="#fff" />
      {QR_CELLS.map((c, i) => (
        <rect key={i} x={c[0]} y={c[1]} width="16" height="16" fill="#000" />
      ))}
    </svg>
  );
}

/** Cells of the WhatsApp QR code svg. */
const QR_CELLS: Array<[number, number]> = [
  [16, 144], [16, 208], [16, 224], [16, 240], [16, 272], [16, 288],
  [32, 128], [32, 144], [32, 160], [32, 192], [32, 208], [32, 240],
  [32, 256], [32, 288], [32, 320], [48, 128], [48, 144], [48, 192],
  [48, 208], [48, 256], [48, 304], [64, 240], [64, 272], [64, 304],
  [80, 160], [80, 176], [80, 240], [80, 256], [80, 304], [80, 320],
  [96, 144], [96, 224], [96, 240], [96, 272], [96, 288], [96, 304],
  [96, 320], [112, 128], [112, 160], [112, 192], [112, 224], [112, 256],
  [112, 288], [112, 320], [128, 176], [128, 192], [128, 208], [128, 256],
  [128, 320], [144, 16], [144, 32], [144, 48], [144, 80], [144, 96],
  [144, 144], [144, 160], [144, 176], [144, 208], [144, 240], [144, 256],
  [144, 288], [144, 304], [144, 320], [144, 416], [144, 432], [160, 0],
  [160, 16], [160, 32], [160, 80], [160, 112], [160, 160], [160, 208],
  [160, 240], [160, 256], [160, 272], [160, 288], [160, 304], [160, 352],
  [160, 384], [160, 400], [160, 448], [176, 0], [176, 16], [176, 32],
  [176, 48], [176, 64], [176, 80], [176, 96], [176, 144], [176, 160],
  [176, 176], [176, 192], [176, 224], [176, 256], [176, 272], [176, 288],
  [176, 320], [176, 352], [176, 368], [176, 400], [176, 432], [192, 0],
  [192, 16], [192, 32], [192, 80], [192, 128], [192, 144], [192, 160],
  [192, 176], [192, 192], [192, 288], [192, 304], [192, 384], [192, 400],
  [192, 448], [208, 64], [208, 80], [208, 96], [208, 144], [208, 160],
  [208, 176], [208, 192], [208, 240], [208, 256], [208, 272], [208, 336],
  [208, 368], [208, 400], [208, 416], [208, 432], [208, 448], [224, 0],
  [224, 32], [224, 64], [224, 80], [224, 128], [224, 208], [224, 240],
  [224, 272], [224, 304], [224, 352], [224, 368], [224, 400], [224, 416],
  [224, 432], [224, 448], [240, 0], [240, 32], [240, 48], [240, 64],
  [240, 96], [240, 112], [240, 144], [240, 160], [240, 176], [240, 192],
  [240, 240], [240, 256], [240, 304], [240, 320], [240, 336], [240, 352],
  [240, 368], [240, 384], [240, 400], [240, 448], [256, 16], [256, 32],
  [256, 48], [256, 128], [256, 176], [256, 192], [256, 208], [256, 224],
  [256, 256], [256, 304], [256, 320], [256, 336], [256, 384], [256, 400],
  [256, 432], [272, 0], [272, 16], [272, 32], [272, 48], [272, 80],
  [272, 96], [272, 112], [272, 144], [272, 208], [272, 224], [272, 272],
  [272, 384], [272, 400], [272, 448], [288, 16], [288, 32], [288, 64],
  [288, 128], [288, 176], [288, 208], [288, 224], [288, 288], [288, 336],
  [304, 0], [304, 80], [304, 96], [304, 128], [304, 144], [304, 352],
  [304, 384], [304, 400], [304, 416], [320, 48], [320, 64], [320, 128],
  [320, 144], [320, 176], [320, 208], [320, 224], [320, 240], [320, 256],
  [320, 272], [320, 288], [320, 320], [320, 336], [320, 352], [320, 368],
  [320, 384], [320, 416], [320, 432], [320, 448], [336, 16], [336, 32],
  [336, 64], [336, 96], [336, 112], [336, 160], [336, 176], [336, 192],
  [336, 224], [336, 240], [336, 272], [336, 304], [336, 320], [336, 336],
  [336, 352], [336, 368], [336, 384], [336, 416], [352, 128], [352, 144],
  [352, 160], [352, 176], [352, 192], [352, 208], [352, 224], [352, 272],
  [352, 288], [352, 304], [352, 320], [352, 384], [352, 400], [352, 448],
  [368, 144], [368, 176], [368, 208], [368, 288], [368, 304], [368, 320],
  [368, 352], [368, 384], [368, 416], [384, 128], [384, 144], [384, 192],
  [384, 208], [384, 240], [384, 272], [384, 320], [384, 384], [400, 144],
  [400, 176], [400, 224], [400, 240], [400, 256], [400, 320], [400, 336],
  [400, 352], [400, 368], [400, 384], [400, 400], [400, 416], [400, 432],
  [416, 128], [416, 144], [416, 176], [416, 208], [416, 224], [416, 304],
  [416, 384], [416, 432], [432, 128], [432, 272], [432, 288], [432, 320],
  [432, 368], [432, 400], [432, 448], [448, 128], [448, 160], [448, 176],
  [448, 208], [448, 240], [448, 304], [448, 320], [448, 336], [448, 384],
  [448, 432], [464, 144], [464, 208], [464, 256], [464, 320], [464, 336],
  [464, 368], [464, 400], [464, 432], [80, 32],
];
