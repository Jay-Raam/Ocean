import { useApp } from "../../lib/AppContext";

const BENEFITS = [
  { label: "Best Rate Guarantee" },
  { label: "Free Daily Sundowner Cocktail" },
  { label: "One Hour Free Massage" },
];

function CheckMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 2.5c5.248 0 9.5 4.252 9.5 9.5s-4.252 9.5-9.5 9.5S2.5 17.248 2.5 12 6.752 2.5 12 2.5zm-1.3 13.6 5.1-5.1-1.2-1.2-3.9 3.9-1.9-1.9-1.2 1.2 3.1 3.1z"
      />
    </svg>
  );
}

export function BenefitsSection() {
  const { benefitsOpen, setBenefitsOpen } = useApp();

  return (
    <section
      className="section section-benefits"
      data-theme-section="light"
      data-bg-section="light"
      onClick={() => setBenefitsOpen(!benefitsOpen)}
    >
      <div className="container wide">
        <div className="row">
          <span className="eyebrow small">Direct Booking Benefits:</span>
          <div className="benefits-list">
            {BENEFITS.map((b) => (
              <div className="benefits-item" key={b.label}>
                <CheckMark />
                <p>{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-bottom" />
    </section>
  );
}
