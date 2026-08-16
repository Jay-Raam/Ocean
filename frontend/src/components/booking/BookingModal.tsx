import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, ReactNode, SVGProps } from "react";
import { useApp } from "../../lib/AppContext";
import { assets } from "../../lib/assets";
import { checkPromo, createBooking, listPromos } from "../../lib/api";
import type { BookingSubmitPayload, PromoInfo } from "../../lib/api";
import { fetchPromos } from "../../lib/graphql";
import { BOOKING_ADDONS, BOOKING_VILLAS, formatDate, formatPrice, nightsBetween } from "./data";
import type { BookingAddOn, BookingRate, BookingVilla, Currency } from "./data";
import { DateRangePicker } from "./DateRangePicker";

/* ------------------------- Tiny inline icons ------------------------- */

type IconProps = SVGProps<SVGSVGElement>;

const StrokeIcon = ({ children, ...props }: IconProps & { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const CalendarIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <rect x="3" y="4.5" width="18" height="17" rx="3" />
    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
  </StrokeIcon>
);
const UserIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.5-3.5 4.2-5 7.5-5s6 1.5 7.5 5" />
  </StrokeIcon>
);
const BedIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M3 18.5v-13M3 10.5h13a4 4 0 0 1 4 4v4M3 14.5h18M3 18.5h18" />
  </StrokeIcon>
);
const InfoIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10.8v5M12 7.6v.2" />
  </StrokeIcon>
);
const HelpIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.4 9.4a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1 .8-1 1.6M12 16.8v.2" />
  </StrokeIcon>
);
const CheckIcon = (p: IconProps) => (
  <StrokeIcon strokeWidth="2.4" {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </StrokeIcon>
);
const ChevronIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </StrokeIcon>
);
const PlusIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M12 5v14M5 12h14" />
  </StrokeIcon>
);

/* ------------------------- Shared UI bits ------------------------- */

const STEPS = ["Dates", "Categories", "Rates", "Summary", "Details"] as const;

function Counter({
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="bk-counter">
      <button
        type="button"
        className="bk-counter-btn"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease"
      >
        −
      </button>
      <span className="bk-counter-value">{value}</span>
      <button
        type="button"
        className="bk-counter-btn"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

function Badge() {
  return <span className="bk-badge">Free cancellation</span>;
}

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button type="button" className="bk-toggle" onClick={onToggle} role="switch" aria-checked={on}>
      <span className="bk-toggle-label">{label}</span>
      <span className={`bk-toggle-track ${on ? "is-on" : ""}`}>
        <span className="bk-toggle-knob" />
      </span>
    </button>
  );
}

function SummaryBar({
  checkin,
  checkout,
  adults,
  children,
  baby,
  onEdit,
}: {
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  baby: number;
  onEdit: () => void;
}) {
  const nights = nightsBetween(checkin, checkout);
  const guests = adults + children + baby;
  return (
    <div className="bk-summary-bar">
      <div className="bk-summary-col">
        <p className="bk-summary-label">
          Nights selected <strong>{nights}</strong>
        </p>
        <p className="bk-summary-value">
          {formatDate(checkin)} → {formatDate(checkout)}
        </p>
      </div>
      <div className="bk-summary-col">
        <p className="bk-summary-label">
          Guests selected <strong>{guests}</strong>
        </p>
        <p className="bk-summary-value">
          Adults {adults}
          {children > 0 ? ` · Children ${children}` : ""}
          {baby > 0 ? ` · Baby ${baby}` : ""}
        </p>
      </div>
      <button type="button" className="bk-edit-btn" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}

/**
 * Swipeable image carousel for villa cards. Arrows + clickable dots on
 * desktop, touch-swipe on mobile; track slides via transform.
 *
 * Accessibility: arrow-key navigation on the focusable region, an ARIA
 * live region announcing the current slide, and semantic buttons.
 */
function VillaCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const list = images.length > 0 ? images : [""];
  const go = (i: number) => setIndex(((i % list.length) + list.length) % list.length);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
  };

  return (
    <div
      className="bk-carousel"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} images`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="bk-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {list.map((src, i) => (
          <div className="bk-carousel-slide" key={i} aria-hidden={i !== index}>
            {src ? (
              <img src={src} alt={i === index ? alt : ""} aria-label={i === index ? alt : undefined} loading="lazy" />
            ) : null}
          </div>
        ))}
      </div>
      {list.length > 1 && (
        <>
          <button type="button" className="bk-carousel-arrow bk-carousel-prev" onClick={() => go(index - 1)} aria-label="Previous image">
            <ChevronIcon width={13} height={13} />
          </button>
          <button type="button" className="bk-carousel-arrow bk-carousel-next" onClick={() => go(index + 1)} aria-label="Next image">
            <ChevronIcon width={13} height={13} />
          </button>
          <div className="bk-dots bk-carousel-dots">
            {list.map((_, i) => (
              <button
                type="button"
                key={i}
                className={`bk-carousel-dot${i === index ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1} of ${list.length}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
          {/* Live region announces slide changes to screen readers. */}
          <span className="visually-hidden" role="status" aria-live="polite">
            Image {index + 1} of {list.length}
          </span>
        </>
      )}
    </div>
  );
}

/* ------------------------- Steps ------------------------- */

function DatesStep({
  checkin,
  checkout,
  setCheckin,
  setCheckout,
  adults,
  setAdults,
  children,
  setChildren,
  baby,
  setBaby,
  promoOpen,
  setPromoOpen,
  promoCode,
  promo,
  promoStatus,
  onApplyPromo,
  onPromoEdit,
  availablePromos,
  onSelectPromo,
  onNext,
}: {
  checkin: string;
  checkout: string;
  setCheckin: (v: string) => void;
  setCheckout: (v: string) => void;
  adults: number;
  setAdults: (v: number) => void;
  children: number;
  setChildren: (v: number) => void;
  baby: number;
  setBaby: (v: number) => void;
  promoOpen: boolean;
  setPromoOpen: (v: boolean) => void;
  promoCode: string;
  promo: PromoInfo | null;
  promoStatus: "idle" | "checking" | "valid" | "invalid";
  onApplyPromo: () => void;
  onPromoEdit: (v: string) => void;
  availablePromos: PromoInfo[];
  onSelectPromo: (p: PromoInfo) => void;
  onNext: () => void;
}) {
  const valid = checkout > checkin;

  return (
    <div className="bk-dates-wrap">
      <div className="bk-dates-card">
        <h3 className="bk-card-title">Dates</h3>

        <DateRangePicker
          checkin={checkin}
          checkout={checkout}
          onChange={(ci, co) => {
            setCheckin(ci);
            setCheckout(co);
          }}
        />

        <div className="bk-guests-grid">
          <div className="bk-guest-field">
            <span className="bk-guest-label">Adults</span>
            <Counter value={adults} onChange={setAdults} min={1} />
          </div>
          <div className="bk-guest-field">
            <span className="bk-guest-label">Children (4-10 yrs)</span>
            <Counter value={children} onChange={setChildren} />
          </div>
        </div>
        <div className="bk-guest-field bk-guest-field-wide">
          <span className="bk-guest-label">Baby (0-3 yrs)</span>
          <Counter value={baby} onChange={setBaby} />
        </div>

        {!promoOpen ? (
          <button type="button" className="bk-promo-toggle" onClick={() => setPromoOpen(true)}>
            <PlusIcon width={14} height={14} />
            Add promotional code
          </button>
        ) : (
          <div className="bk-promo-box">
            <div className="bk-promo-row">
              <input
                className="bk-input bk-promo-input"
                placeholder="Promotional code"
                value={promoCode}
                onChange={(e) => onPromoEdit(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="bk-btn-outline bk-promo-apply"
                disabled={promoStatus === "checking" || !promoCode.trim()}
                onClick={onApplyPromo}
              >
                {promoStatus === "checking" ? "Checking…" : "Apply"}
              </button>
            </div>
            {promoStatus === "valid" && promo && (
              <p className="bk-promo-status is-valid">
                <CheckIcon width={13} height={13} />
                {promo.code} — save {promo.discountPercent}% ({promo.label})
              </p>
            )}
            {promoStatus === "invalid" && (
              <p className="bk-promo-status is-invalid">This promotional code is not valid.</p>
            )}
            {availablePromos.length > 0 && (
              <div className="bk-promo-avail">
                <span className="bk-promo-avail-label">Available codes</span>
                <div className="bk-promo-chips">
                  {availablePromos.map((p) => (
                    <button
                      type="button"
                      key={p.code}
                      className={`bk-promo-chip ${promo?.code === p.code ? "is-selected" : ""}`}
                      onClick={() => onSelectPromo(p)}
                    >
                      {p.code} · {p.discountPercent}% off
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button type="button" className="bk-btn-primary" disabled={!valid} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function CategoriesStep({
  villas,
  checkin,
  checkout,
  adults,
  children,
  baby,
  currency,
  onEdit,
  onShowRates,
}: {
  villas: BookingVilla[];
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  baby: number;
  currency: Currency;
  onEdit: () => void;
  onShowRates: (v: BookingVilla) => void;
}) {
  const [freeCancelOnly, setFreeCancelOnly] = useState(true);
  const [more, setMore] = useState<string | null>(null);
  const list = freeCancelOnly ? villas : villas;

  return (
    <div className="bk-step">
      <h2 className="bk-heading">Select category</h2>
      <div className="bk-heading-row">
        <Toggle label="Free cancellation only" on={freeCancelOnly} onToggle={() => setFreeCancelOnly((v) => !v)} />
      </div>
      <SummaryBar
        checkin={checkin}
        checkout={checkout}
        adults={adults}
        children={children}
        baby={baby}
        onEdit={onEdit}
      />
      <div className="bk-cards-grid">
        {list.map((v) => (
          <div className="bk-card" key={v.slug}>
            <div className="bk-card-image">
              <VillaCarousel images={v.images} alt={v.name} />
            </div>
            <div className="bk-card-body">
              <h4 className="bk-card-name">{v.name}</h4>
              <Badge />
              <div className="bk-card-details">
                <span>
                  <UserIcon width={15} height={15} /> Maximum persons: {v.maxPersons}
                </span>
                <span>
                  <BedIcon width={15} height={15} /> Available: {v.available}
                </span>
              </div>
              <button type="button" className="bk-more" onClick={() => setMore(more === v.slug ? null : v.slug)}>
                <ChevronIcon width={14} height={14} />
                More
              </button>
              {more === v.slug && <p className="bk-more-text">{v.description}</p>}
              <div className="bk-card-price-row">
                <div className="bk-card-price">
                  <span className="bk-price-from">From</span>
                  <strong>{formatPrice(v.from, currency)}</strong>
                  <span className="bk-price-unit">per villa/nightly</span>
                </div>
                <button type="button" className="bk-btn-primary bk-btn-small" onClick={() => onShowRates(v)}>
                  Show rates
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RatesStep({
  villa,
  addOns,
  toggleAddOn,
  villasCount,
  setVillasCount,
  adults,
  setAdults,
  children,
  setChildren,
  baby,
  setBaby,
  currency,
  onBook,
  onEdit,
  checkin,
  checkout,
}: {
  villa: BookingVilla;
  addOns: BookingAddOn[];
  toggleAddOn: (a: BookingAddOn) => void;
  villasCount: number;
  setVillasCount: (v: number) => void;
  adults: number;
  setAdults: (v: number) => void;
  children: number;
  setChildren: (v: number) => void;
  baby: number;
  setBaby: (v: number) => void;
  currency: Currency;
  onBook: (r: BookingRate) => void;
  onEdit: () => void;
  checkin: string;
  checkout: string;
}) {
  const [more, setMore] = useState<string | null>(null);
  return (
    <div className="bk-step">
      <h2 className="bk-heading">Select rate</h2>
      <SummaryBar checkin={checkin} checkout={checkout} adults={adults} children={children} baby={baby} onEdit={onEdit} />

      <div className="bk-rate-main">
        <div className="bk-rate-main-image">
          <VillaCarousel images={villa.images} alt={villa.name} />
        </div>
        <div className="bk-rate-main-body">
          <h4 className="bk-card-name">{villa.name}</h4>
          <div className="bk-card-details">
            <span>
              <BedIcon width={15} height={15} /> Available: {villa.available}
            </span>
            <span>
              <UserIcon width={15} height={15} /> Maximum persons: {villa.maxPersons}
            </span>
          </div>
          <button type="button" className="bk-more" onClick={() => setMore(more === "main" ? null : "main")}>
            <ChevronIcon width={14} height={14} />
            More
          </button>
          {more === "main" && <p className="bk-more-text">{villa.description}</p>}
        </div>
      </div>

      <div className="bk-rate-columns">
        <div className="bk-rate-col">
          <h3 className="bk-col-heading">Enhance your stay</h3>
          <div className="bk-addon-list">
            {BOOKING_ADDONS.map((a) => {
              const selected = addOns.some((x) => x.id === a.id);
              return (
                <div className="bk-addon-card" key={a.id}>
                  <img src={a.image} alt="" loading="lazy" />
                  <div className="bk-addon-body">
                    <h5 className="bk-addon-title">{a.title}</h5>
                    <button
                      type="button"
                      className="bk-more"
                      onClick={() => setMore(more === a.id ? null : a.id)}
                    >
                      <ChevronIcon width={14} height={14} />
                      More
                    </button>
                    {more === a.id && <p className="bk-more-text">{a.description}</p>}
                    <div className="bk-addon-price">
                      <strong>{formatPrice(a.price, currency)}</strong>
                      <span>{a.unit}</span>
                    </div>
                    <button
                      type="button"
                      className={`bk-btn-outline ${selected ? "is-selected" : ""}`}
                      onClick={() => toggleAddOn(a)}
                    >
                      {selected ? "Added" : "Add"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bk-rate-col">
          <h3 className="bk-col-heading">Occupancy</h3>
          <div className="bk-occupancy-card">
            <div className="bk-occ-row">
              <span>Villas</span>
              <Counter value={villasCount} onChange={setVillasCount} min={1} />
            </div>
            <p className="bk-occ-villa-title">Villa 1:</p>
            <div className="bk-occ-row">
              <span>Adults</span>
              <Counter value={adults} onChange={setAdults} min={1} />
            </div>
            <div className="bk-occ-row">
              <span>Children (4-10 yrs)</span>
              <Counter value={children} onChange={setChildren} />
            </div>
            <div className="bk-occ-row">
              <span>Baby (0-3 yrs)</span>
              <Counter value={baby} onChange={setBaby} />
            </div>
          </div>

          <h3 className="bk-col-heading">Rates</h3>
          <div className="bk-rates-card">
            {villa.rates.map((r, i) => (
              <div className="bk-rate-item" key={r.id}>
                <h5 className="bk-rate-title">{r.title}</h5>
                <div className="bk-rate-badge-row">
                  <Badge />
                  <span className="bk-rate-until">{r.until}</span>
                </div>
                <p className="bk-rate-desc">{r.description}</p>
                <button type="button" className="bk-more" onClick={() => setMore(more === r.id ? null : r.id)}>
                  <ChevronIcon width={14} height={14} />
                  More
                </button>
                <div className="bk-rate-price-row">
                  <div>
                    {r.was && <span className="bk-rate-was">{formatPrice(r.was, currency)}</span>}
                    <strong className="bk-rate-price">{formatPrice(r.price, currency)}</strong>
                    <span className="bk-price-unit">nightly</span>
                  </div>
                  <button type="button" className="bk-btn-primary bk-btn-small" onClick={() => onBook(r)}>
                    Book now
                  </button>
                </div>
                {i < villa.rates.length - 1 && <div className="bk-divider" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryStep({
  villa,
  rate,
  checkin,
  checkout,
  adults,
  children,
  baby,
  addOns,
  rooms,
  setRooms,
  promo,
  currency,
  onNext,
  onAddMore,
}: {
  villa: BookingVilla;
  rate: BookingRate;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  baby: number;
  addOns: BookingAddOn[];
  rooms: number;
  setRooms: (v: number) => void;
  promo: PromoInfo | null;
  currency: Currency;
  onNext: () => void;
  onAddMore: () => void;
}) {
  const nights = nightsBetween(checkin, checkout);
  const guests = adults + children + baby;

  const addOnTotal = addOns.reduce((sum, a) => sum + (a.unit === "once" ? a.price : a.price * guests), 0);
  const nightsTotal = rate.price * nights * rooms;
  // Mirrors the backend discount: percent off the nights portion only.
  const discount = promo ? Math.round((nightsTotal * promo.discountPercent) / 100) : 0;
  const subtotal = nightsTotal - discount + addOnTotal;
  const ppn = Math.round(subtotal * 0.1);
  const total = subtotal + ppn;

  return (
    <div className="bk-step bk-summary-step">
      <h2 className="bk-heading">Summary</h2>

      <div className="bk-summary-card">
        <div className="bk-summary-image">
          <VillaCarousel images={villa.images} alt={villa.name} />
        </div>
        <div className="bk-summary-info">
          <h4 className="bk-card-name">{villa.name}</h4>
          <p className="bk-summary-row">
            <CalendarIcon width={15} height={15} />
            {formatDate(checkin)} - {formatDate(checkout)}
          </p>
          <p className="bk-summary-row">
            <UserIcon width={15} height={15} />
            Adults: {adults}
            {children > 0 ? ` · Children: ${children}` : ""}
            {baby > 0 ? ` · Baby: ${baby}` : ""}
          </p>
          <p className="bk-summary-row">
            <InfoIcon width={15} height={15} />
            Rate: {rate.title}
          </p>
          <p className="bk-summary-row bk-summary-nights">
            <CalendarIcon width={15} height={15} />
            {nights} night{nights > 1 ? "s" : ""}
          </p>
          <Badge />
        </div>
        <div className="bk-summary-price">
          <p className="bk-summary-qty">
            {rooms} × {formatPrice(rate.price, currency)}
          </p>
          <div className="bk-qty-stepper">
            <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} aria-label="Decrease rooms">
              −
            </button>
            <span>{rooms}</span>
            <button type="button" onClick={() => setRooms(rooms + 1)} aria-label="Increase rooms">
              +
            </button>
          </div>
        </div>
        <div className="bk-summary-alert">
          <InfoIcon width={16} height={16} />
          <span>Free cancellation until 00:00 on 23/09/2026</span>
          <HelpIcon width={16} height={16} />
        </div>
      </div>

      <button type="button" className="bk-add-more" onClick={onAddMore}>
        <PlusIcon width={14} height={14} />
        Add more stays
      </button>

      <div className="bk-totals-card">
        <div className="bk-total-row">
          <span>
            {villa.name} + {rate.title}
          </span>
          <span>{formatPrice(nightsTotal, currency)}</span>
        </div>
        {addOns.map((a) => (
          <div className="bk-total-row" key={a.id}>
            <span>
              {a.title} {a.unit === "per person" ? `(× ${guests})` : ""}
            </span>
            <span>
              {formatPrice(a.unit === "once" ? a.price : a.price * guests, currency)}
            </span>
          </div>
        ))}
        {promo && (
          <div className="bk-total-row bk-total-promo">
            <span>
              Promo {promo.code} (−{promo.discountPercent}%)
            </span>
            <span>−{formatPrice(discount, currency)}</span>
          </div>
        )}
        <div className="bk-total-row bk-total-sub">
          <span>
            {rooms} × {formatPrice(rate.price, currency)} × {nights} night{nights > 1 ? "s" : ""}
          </span>
          <span>{formatPrice(nightsTotal, currency)}</span>
        </div>
        <div className="bk-total-row">
          <span>PPN 10%</span>
          <span>{formatPrice(ppn, currency)}</span>
        </div>
        <div className="bk-total-row bk-total-grand">
          <span>Total</span>
          <span>{formatPrice(total, currency)}</span>
        </div>
      </div>

      <button type="button" className="bk-btn-primary bk-btn-next" onClick={onNext}>
        Next
      </button>
    </div>
  );
}

interface DetailsForm {
  guests: {
    booking_for_self: boolean;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    nationality: string;
    special_requests: string;
  };
  payment: {
    cardholder_name: string;
    card_number: string;
    expiry: string;
  };
}

function DetailsStep({
  submitting,
  submitError,
  onSubmit,
}: {
  submitting: boolean;
  submitError: string | null;
  onSubmit: (form: DetailsForm) => void;
}) {
  const [forSelf, setForSelf] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    specialRequests: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.lastName.trim() !== "" && form.email.trim() !== "";

  const handleSubmit = () => {
    if (!valid || submitting) return;
    onSubmit({
      guests: {
        booking_for_self: forSelf,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        nationality: form.nationality,
        special_requests: form.specialRequests,
      },
      payment: {
        cardholder_name: form.cardName,
        card_number: form.cardNumber,
        expiry: form.expiry,
      },
    });
  };

  return (
    <div className="bk-step bk-details-step">
      <h2 className="bk-heading">Contact &amp; payment details</h2>

      <div className="bk-details-card">
        <div className="bk-segmented">
          <button
            type="button"
            className={forSelf ? "is-active" : ""}
            onClick={() => setForSelf(true)}
          >
            I'm booking for myself
          </button>
          <button
            type="button"
            className={!forSelf ? "is-active" : ""}
            onClick={() => setForSelf(false)}
          >
            I'm booking for someone else
          </button>
        </div>

        <h3 className="bk-section-title">Your details</h3>

        <div className="bk-form-row">
          <label className="bk-field">
            <span>First name</span>
            <input className="bk-input" value={form.firstName} onChange={set("firstName")} />
          </label>
          <label className="bk-field">
            <span>Last name *</span>
            <input className="bk-input" value={form.lastName} onChange={set("lastName")} />
          </label>
        </div>

        <div className="bk-form-row">
          <label className="bk-field">
            <span>Email *</span>
            <input className="bk-input" type="email" value={form.email} onChange={set("email")} />
          </label>
          <label className="bk-field">
            <span>Phone</span>
            <div className="bk-phone">
              <select className="bk-input bk-country-code" defaultValue="+62">
                <option value="+62">🇮🇩 +62</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+31">🇳🇱 +31</option>
              </select>
              <input className="bk-input" value={form.phone} onChange={set("phone")} placeholder="Phone number" />
            </div>
          </label>
        </div>

        <div className="bk-form-row">
          <label className="bk-field">
            <span>Nationality</span>
            <select className="bk-input" value={form.nationality} onChange={set("nationality")}>
              <option value="">Select nationality</option>
              <option>Indonesian</option>
              <option>American</option>
              <option>British</option>
              <option>Australian</option>
              <option>Singaporean</option>
              <option>Dutch</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        <div className="bk-form-row">
          <label className="bk-field">
            <span>Special requests</span>
            <textarea className="bk-input bk-textarea" rows={4} value={form.specialRequests} onChange={set("specialRequests")} />
          </label>
        </div>

        <h3 className="bk-section-title">Payment</h3>
        <div className="bk-form-row">
          <label className="bk-field">
            <span>Cardholder name</span>
            <input className="bk-input" value={form.cardName} onChange={set("cardName")} />
          </label>
        </div>
        <div className="bk-form-row">
          <label className="bk-field">
            <span>Card number</span>
            <input className="bk-input" inputMode="numeric" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={set("cardNumber")} />
          </label>
        </div>
        <div className="bk-form-row">
          <label className="bk-field">
            <span>Expiry</span>
            <input className="bk-input" placeholder="MM / YY" value={form.expiry} onChange={set("expiry")} />
          </label>
          <label className="bk-field">
            <span>CVC</span>
            <input className="bk-input" inputMode="numeric" placeholder="123" value={form.cvc} onChange={set("cvc")} />
          </label>
        </div>
      </div>

      {submitError && (
        <div className="bk-error" role="alert">
          {submitError}
        </div>
      )}

      <button
        type="button"
        className="bk-btn-primary bk-btn-next"
        disabled={!valid || submitting}
        onClick={handleSubmit}
      >
        {submitting ? "Submitting…" : "Complete booking"}
      </button>
    </div>
  );
}

function DoneStep({ onClose }: { onClose: () => void }) {
  return (
    <div className="bk-step bk-done-step">
      <div className="bk-done-circle">
        <CheckIcon width={34} height={34} />
      </div>
      <h2 className="bk-heading">Request received</h2>
      <p className="bk-done-text">
        Thank you! Your booking request has been received. Our team will confirm availability and send you the
        details by email shortly.
      </p>
      <button type="button" className="bk-btn-primary" onClick={onClose}>
        Done
      </button>
    </div>
  );
}

/* ------------------------- Modal shell ------------------------- */

export function BookingModal() {
  const { bookingOpen, bookingVilla, bookingPromo, setBookingOpen } = useApp();
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const preset = useMemo(
    () => BOOKING_VILLAS.find((v) => v.slug === bookingVilla) ?? null,
    [bookingVilla],
  );

  const [step, setStep] = useState(0);
  const [checkin, setCheckin] = useState("2026-09-29");
  const [checkout, setCheckout] = useState("2026-09-30");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [baby, setBaby] = useState(0);
  const [villa, setVilla] = useState<BookingVilla | null>(preset);
  const [rate, setRate] = useState<BookingRate | null>(null);
  const [addOns, setAddOns] = useState<BookingAddOn[]>([]);
  const [rooms, setRooms] = useState(1);
  const [currency, setCurrency] = useState<Currency>("inr");
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState<PromoInfo | null>(null);
  const [promoStatus, setPromoStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [availablePromos, setAvailablePromos] = useState<PromoInfo[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Reset the flow each time the modal opens
  useEffect(() => {
    if (bookingOpen) {
      setStep(0);
      setCheckin("2026-09-29");
      setCheckout("2026-09-30");
      setAdults(2);
      setChildren(0);
      setBaby(0);
      setVilla(preset);
      setRate(null);
      setAddOns([]);
      setRooms(1);
      setPromoOpen(bookingPromo ? true : false);
      setPromoCode(bookingPromo ?? "");
      setPromo(null);
      setPromoStatus(bookingPromo ? "checking" : "idle");
      setSubmitting(false);
      setSubmitError(null);
      setDone(false);

      // Auto-check a prefilled promo (e.g. from a package page) and load the
      // available codes for the promo section (GraphQL first, REST fallback).
      if (bookingPromo) {
        checkPromo(bookingPromo).then((res) => {
          if (res.valid && res.promo) {
            setPromo(res.promo);
            setPromoStatus("valid");
          } else {
            setPromo(null);
            setPromoStatus("invalid");
          }
        });
      }
      fetchPromos()
        .then((list) =>
          setAvailablePromos(
            list.map((p) => ({ code: p.code, label: p.label, discountPercent: p.discountPercent })),
          ),
        )
        .catch(() => {
          listPromos().then(setAvailablePromos).catch(() => setAvailablePromos([]));
        });
    }
  }, [bookingOpen, preset, bookingPromo]);

  // Keyboard: close on Escape, trap Tab inside the dialog
  useEffect(() => {
    if (!bookingOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBookingOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusables = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [bookingOpen, setBookingOpen]);

  // Focus management: remember the opener, move focus into the dialog,
  // and restore focus to the opener when it closes.
  useEffect(() => {
    if (!bookingOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const closeBtn = overlay.querySelector<HTMLElement>(".booking-close");
      (closeBtn ??
        overlay.querySelector<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ))?.focus();
    }, 0);
    return () => {
      window.clearTimeout(t);
      lastFocusedRef.current?.focus?.();
      lastFocusedRef.current = null;
    };
  }, [bookingOpen]);

  if (!bookingOpen) return null;

  const close = () => setBookingOpen(false);
  const heroBg = step === 0;

  const showRates = (v: BookingVilla) => {
    setVilla(v);
    setStep(2);
  };
  const bookRate = (r: BookingRate) => {
    setRate(r);
    setStep(3);
  };
  const toggleAddOn = (a: BookingAddOn) =>
    setAddOns((list) => (list.some((x) => x.id === a.id) ? list.filter((x) => x.id !== a.id) : [...list, a]));

  const applyPromo = async () => {
    const code = promoCode.trim();
    if (!code) return;
    setPromoStatus("checking");
    const res = await checkPromo(code);
    if (res.valid && res.promo) {
      setPromo(res.promo);
      setPromoCode(res.promo.code);
      setPromoStatus("valid");
    } else {
      setPromo(null);
      setPromoStatus("invalid");
    }
  };

  const selectPromo = (p: PromoInfo) => {
    setPromoCode(p.code);
    setPromo(p);
    setPromoStatus("valid");
  };

  const editPromoCode = (v: string) => {
    setPromoCode(v);
    setPromo(null);
    setPromoStatus("idle");
  };

  const handleSubmit = async (form: DetailsForm) => {
    if (!villa || !rate || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    const nights = nightsBetween(checkin, checkout);
    const guests = adults + children;
    const nightsTotal = rate.price * nights * rooms;
    const addOnTotal = addOns.reduce((sum, a) => sum + (a.unit === "once" ? a.price : a.price * guests), 0);
    const subtotal = nightsTotal + addOnTotal;
    const ppn = Math.round(subtotal * 0.1);

    const payload: BookingSubmitPayload = {
      checkin,
      checkout,
      adults,
      children,
      baby,
      rooms,
      promo_code: promo ? promo.code : promoCode.trim() ? promoCode.trim() : null,
      villa: {
        slug: villa.slug,
        name: villa.name,
        rate_id: rate.id,
        rate_title: rate.title,
        nightly_price: rate.price,
        nights,
        rooms,
      },
      add_ons: addOns.map((a) => ({ id: a.id, title: a.title, price: a.price, unit: a.unit, quantity: 1 })),
      guests: {
        booking_for_self: form.guests.booking_for_self,
        first_name: form.guests.first_name || null,
        last_name: form.guests.last_name,
        email: form.guests.email,
        phone: form.guests.phone || null,
        nationality: form.guests.nationality || null,
        special_requests: form.guests.special_requests || null,
      },
      payment: {
        cardholder_name: form.payment.cardholder_name || null,
        card_number: form.payment.card_number || null,
        expiry: form.payment.expiry || null,
      },
      totals: { subtotal, ppn, total: subtotal + ppn },
    };

    const result = await createBooking(payload);
    setSubmitting(false);
    if (result.ok) {
      setDone(true);
    } else {
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <div ref={overlayRef} className={`booking-overlay ${heroBg ? "is-hero" : ""}`} role="dialog" aria-modal="true" aria-label="Book your stay">
      {heroBg && (
        <div className="booking-hero-bg" aria-hidden="true">
          <img src={assets.staySlider.background[2]} alt="" />
          <div className="booking-hero-shade" />
        </div>
      )}

      <div className="booking-modal">
        <header className="booking-stepper">
          <div className="bk-currency" role="group" aria-label="Currency">
            <button
              type="button"
              className={currency === "inr" ? "is-active" : ""}
              onClick={() => setCurrency("inr")}
              aria-pressed={currency === "inr"}
            >
              ₹ INR
            </button>
            <button
              type="button"
              className={currency === "idr" ? "is-active" : ""}
              onClick={() => setCurrency("idr")}
              aria-pressed={currency === "idr"}
            >
              Rp IDR
            </button>
          </div>
          <button type="button" className="booking-close" onClick={close} aria-label="Close booking">
            <span />
            <span />
          </button>
          <ol className="bk-steps">
            {STEPS.map((label, i) => {
              const doneState = i < step;
              const active = i === step;
              return (
                <li className={`bk-step-item ${active ? "is-active" : ""} ${doneState ? "is-done" : ""}`} key={label}>
                  {i > 0 && <span className="bk-step-line" />}
                  <span className="bk-step-node">
                    {doneState ? <CheckIcon width={13} height={13} /> : active ? i + 1 : i + 1}
                  </span>
                  <span className="bk-step-label">{label}</span>
                </li>
              );
            })}
          </ol>
        </header>

        <div className="booking-body" data-lenis-prevent>
          {done ? (
            <DoneStep onClose={close} />
          ) : step === 0 ? (
            <DatesStep
              checkin={checkin}
              checkout={checkout}
              setCheckin={setCheckin}
              setCheckout={setCheckout}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              baby={baby}
              setBaby={setBaby}
              promoOpen={promoOpen}
              setPromoOpen={setPromoOpen}
              promoCode={promoCode}
              promo={promo}
              promoStatus={promoStatus}
              onApplyPromo={applyPromo}
              onPromoEdit={editPromoCode}
              availablePromos={availablePromos}
              onSelectPromo={selectPromo}
              onNext={() => setStep(1)}
            />
          ) : step === 1 ? (
            <CategoriesStep
              villas={BOOKING_VILLAS}
              checkin={checkin}
              checkout={checkout}
              adults={adults}
              children={children}
              baby={baby}
              currency={currency}
              onEdit={() => setStep(0)}
              onShowRates={showRates}
            />
          ) : step === 2 && villa ? (
            <RatesStep
              villa={villa}
              addOns={addOns}
              toggleAddOn={toggleAddOn}
              villasCount={rooms}
              setVillasCount={setRooms}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              baby={baby}
              setBaby={setBaby}
              currency={currency}
              onBook={bookRate}
              onEdit={() => setStep(0)}
              checkin={checkin}
              checkout={checkout}
            />
          ) : step === 3 && villa && rate ? (
            <SummaryStep
              villa={villa}
              rate={rate}
              checkin={checkin}
              checkout={checkout}
              adults={adults}
              children={children}
              baby={baby}
              addOns={addOns}
              rooms={rooms}
              setRooms={setRooms}
              promo={promo}
              currency={currency}
              onNext={() => setStep(4)}
              onAddMore={() => setStep(1)}
            />
          ) : step === 4 ? (
            <DetailsStep submitting={submitting} submitError={submitError} onSubmit={handleSubmit} />
          ) : (
            <DatesStep
              checkin={checkin}
              checkout={checkout}
              setCheckin={setCheckin}
              setCheckout={setCheckout}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              baby={baby}
              setBaby={setBaby}
              promoOpen={promoOpen}
              setPromoOpen={setPromoOpen}
              promoCode={promoCode}
              promo={promo}
              promoStatus={promoStatus}
              onApplyPromo={applyPromo}
              onPromoEdit={editPromoCode}
              availablePromos={availablePromos}
              onSelectPromo={selectPromo}
              onNext={() => setStep(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
