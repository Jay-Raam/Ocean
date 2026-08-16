import { assets } from "../../lib/assets";
import { BRAND } from "../../lib/brand";
import { VILLAS } from "../../lib/content";

/* ------------------------- Types ------------------------- */

export interface BookingRate {
  id: string;
  title: string;
  description: string;
  /** Badge shown on the rate card. */
  badge: string;
  /** "until …" text next to the badge. */
  until: string;
  /** Optional strikethrough "was" price. */
  was?: number;
  /** The nightly price. */
  price: number;
}

export interface BookingVilla {
  slug: string;
  name: string;
  image: string;
  /** Carousel image set (falls back to [image]). */
  images: string[];
  maxPersons: number;
  available: number;
  description: string;
  /** "From" price shown on the category card. */
  from: number;
  rates: BookingRate[];
}

export interface BookingAddOn {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  unit: "once" | "per person";
}

/* ------------------------- Data ------------------------- */

const transferImage = assets.dining.barImage;
const transferReturnImage = assets.stay.bigImage2;
const spaImage = assets.relax.kien402;

/** Rate template used by the booking engine. */
const makeRates = (from: number): BookingRate[] => {
  const serenity = {
    id: "serenity",
    title: `Serenity Season at ${BRAND.name}`,
    description: "Indulge in a rejuvenating weekend designed for pure relaxation and effortless comfort.",
    badge: "Free cancellation",
    until: "until 23/09/2026 00:00",
    was: Math.round(from * 1.346),
    price: from,
  };
  const best = {
    id: "best-available",
    title: "Best Available Rates + 20 Mins Welcome Massage",
    description: "Rate includes : complimentary 20-minute welcome massage per person, on arrival.",
    badge: "Free cancellation",
    until: "until 23/09/2026 00:00",
    price: Math.round(from * 2.024),
  };
  return [serenity, best];
};

/** Carousel images per villa slug (from the site's villa content). */
const villaImages = (slug: string) => VILLAS.find((v) => v.slug === slug)?.images ?? [];

export const BOOKING_VILLAS: BookingVilla[] = [
  {
    slug: "garden-villa",
    name: "Garden Villa",
    image: assets.stay.villas.garden.main,
    images: villaImages("garden-villa"),
    maxPersons: 2,
    available: 2,
    description:
      "68 sqm villa designed in Balinese style, surrounded by tropical gardens. A spacious bedroom with an adjacent seating area and a small veranda with outdoor Balinese shower.",
    from: 20600,
    rates: makeRates(20600),
  },
  {
    slug: "pool-villa",
    name: "Pool Villa",
    image: assets.stay.villas.pool.main,
    images: villaImages("pool-villa"),
    maxPersons: 3,
    available: 3,
    description:
      "77 sqm villa with its own private pool and garden. A spacious bedroom with a daybed on the veranda where you can enjoy the sunset with a book in your hand.",
    from: 33000,
    rates: makeRates(33000),
  },
  {
    slug: "luxury-pool-villa",
    name: "Luxury Pool Villa",
    image: assets.stay.villas.luxury.main,
    images: villaImages("luxury-pool-villa"),
    maxPersons: 3,
    available: 2,
    description:
      "A spacious and luxury villa with lush gardens and seaview. The individual units range in size from 125 to 195 sqm. The bedroom has vaulted ceilings, a private pool and inside and outside bathrooms.",
    from: 41300,
    rates: makeRates(41300),
  },
  {
    slug: "two-bedroom-pool-villa",
    name: "Two Bedroom Pool Villa",
    image: assets.stay.villas.twoBedroom.main,
    images: villaImages("two-bedroom-pool-villa"),
    maxPersons: 4,
    available: 2,
    description:
      "180 sqm villa with two bedrooms, two bathrooms and two private pools. Perfect for families or friends travelling together, with plenty of space to relax.",
    from: 55300,
    rates: makeRates(55300),
  },
];

export const BOOKING_ADDONS: BookingAddOn[] = [
  {
    id: "transfer-one-way",
    title: "Private Transfer - One Way",
    description:
      "One way transfer by private, luxury vehicle to any point in Bali. The car seats up to three guests with luggage, and includes a friendly driver and cold towels.",
    image: transferImage,
    price: 8900,
    unit: "once",
  },
  {
    id: "spa-60",
    title: "60 minutes spa",
    description: `Be pampered in the ${BRAND.name} spa with any one hour treatment of your choice — from a classic Balinese massage to reflexology.`,
    image: spaImage,
    price: 5600,
    unit: "per person",
  },
  {
    id: "transfer-return",
    title: "Private Transfer - Return",
    description:
      "Return transfer by private, chauffeured vehicle to any point in Bali. The car seats up to three guests with luggage, and includes a friendly driver and cold towels.",
    image: transferReturnImage,
    price: 17800,
    unit: "once",
  },
];

/* ------------------------- Helpers ------------------------- */

/** Currency selector values used by the booking modal. */
export type Currency = "inr" | "idr";

/** Display rate used for the IDR view: 1 INR ≈ 190 IDR. */
export const INR_TO_IDR = 190;

/** Formats a number as Indian Rupees with Indian digit grouping (₹20,600). */
export const formatInr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Formats a number as Indonesian Rupiah (Rp 3,914,000). */
export const formatIdr = (n: number) => `Rp ${Math.round(n * INR_TO_IDR).toLocaleString("en-US")}`;

/** Formats a price in the selected currency (canonical values are stored in INR). */
export const formatPrice = (n: number, currency: Currency) =>
  currency === "inr" ? formatInr(n) : formatIdr(n);

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "2026-09-29" → "Tue 29/09/2026" */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${WEEKDAYS[new Date(y, m - 1, d).getDay()]} ${pad(d)}/${pad(m)}/${y}`;
};

export const nightsBetween = (checkin: string, checkout: string) => {
  const a = new Date(checkin + "T00:00:00");
  const b = new Date(checkout + "T00:00:00");
  const days = Math.round((b.getTime() - a.getTime()) / 86400000);
  return Math.max(days, 0);
};
