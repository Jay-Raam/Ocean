/**
 * Central brand configuration — single place to update the brand name,
 * contact details, and social links for the whole site.
 */

export const BRAND = {
  /** Short brand name used in headings and copy. */
  name: "Ocean",
  /** The long-form name used in the hero eyebrow / footer. */
  fullName: "Ocean Resort – Bali",
  /** Short marketing tagline. */
  tagline: "Ocean means 'the sea'",
  /** Legal/copyright name shown in the footer. */
  copyright: "Ocean",

  contact: {
    phoneDisplay: "+62 812 3456 7890",
    phoneHref: "tel:+6281234567890",
    /** WhatsApp number in international format (no +). */
    whatsapp: "6281234567890",
    whatsappDisplay: "+62 812 3456 7890",
    emailDisplay: "hello@oceanresortbali.com",
    emailHref: "mailto:hello@oceanresortbali.com",
    addressLine1: "Jl. Pantai Lovina, Kalibukbuk",
    addressLine2: "Lovina, Buleleng, Bali, Indonesia",
  },

  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  /** Credit shown in the footer "Built by …" line. */
  creditsName: "Jayasriraam",
} as const;
