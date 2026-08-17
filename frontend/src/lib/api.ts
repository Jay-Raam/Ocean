/**
 * Booking API client.
 *
 * Dev/preview proxy `/api` → http://127.0.0.1:8000 (see vite.config.ts).
 * Override the base with VITE_API_BASE for a deployed backend.
 */

const API_BASE: string = (import.meta.env.VITE_API_BASE as string | undefined) ?? "/api/v1";

export interface BookingSubmitResult {
  ok: boolean;
  booking?: {
    id: string;
    status: string;
    total: number;
  };
  error?: string;
}

export interface PromoInfo {
  code: string;
  label: string;
  discountPercent: number;
}

export interface PromoCheckResult {
  valid: boolean;
  promo?: PromoInfo;
  reason?: string;
}

/** Quick validity check used on the Dates step (GET /promo/check). */
export async function checkPromo(code: string): Promise<PromoCheckResult> {
  try {
    const res = await fetch(`${API_BASE}/promo/check?code=${encodeURIComponent(code)}`);
    if (!res.ok) return { valid: false, reason: `check failed (${res.status})` };
    const body = (await res.json()) as {
      valid: boolean;
      reason?: string;
      promo?: { code: string; label: string; discount_percent: number };
    };
    if (!body.valid) return { valid: false, reason: body.reason };
    return {
      valid: true,
      promo: {
        code: body.promo!.code,
        label: body.promo!.label,
        discountPercent: body.promo!.discount_percent,
      },
    };
  } catch {
    return { valid: false, reason: "could not reach the booking service" };
  }
}

/** List active promos (GET /promos) — used for the "available codes" chips. */
export async function listPromos(): Promise<PromoInfo[]> {
  try {
    const res = await fetch(`${API_BASE}/promos`);
    if (!res.ok) return [];
    const body = (await res.json()) as Array<{
      code: string;
      label: string;
      discount_percent: number;
      active: boolean;
    }>;
    return body.map((p) => ({
      code: p.code,
      label: p.label,
      discountPercent: p.discount_percent,
    }));
  } catch {
    return [];
  }
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  error?: string;
}

/** Send a contact/enquiry form message (POST /messages). */
export async function sendContactMessage(payload: ContactMessagePayload): Promise<ContactSubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      let detail = `Request failed (${res.status})`;
      try {
        const body = (await res.json()) as { detail?: string | Array<{ msg?: string }> };
        if (body.detail) {
          detail = Array.isArray(body.detail)
            ? body.detail
                .map((d) => (d.msg ?? "").replace(/^Value error, /, ""))
                .filter(Boolean)
                .join(". ")
            : body.detail;
        }
      } catch {
        /* ignore parse errors */
      }
      return { ok: false, error: detail };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not reach the booking service. Is the backend running?",
    };
  }
}

export interface BookingSubmitPayload {
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  baby: number;
  rooms: number;
  promo_code: string | null;
  villa: {
    slug: string;
    name: string;
    rate_id: string;
    rate_title: string;
    nightly_price: number;
    nights: number;
    rooms: number;
  };
  add_ons: Array<{
    id: string;
    title: string;
    price: number;
    unit: "once" | "per person";
    quantity: number;
  }>;
  guests: {
    booking_for_self: boolean;
    first_name: string | null;
    last_name: string;
    email: string;
    phone: string | null;
    nationality: string | null;
    special_requests: string | null;
  };
  payment: {
    cardholder_name: string | null;
    card_number: string | null;
    expiry: string | null;
  };
  totals: { subtotal: number; ppn: number; total: number };
}

export async function createBooking(payload: BookingSubmitPayload): Promise<BookingSubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      let detail = `Request failed (${res.status})`;
      try {
        const body = (await res.json()) as { detail?: string | Array<{ msg?: string }> };
        if (body.detail) {
          // FastAPI validation errors arrive as an array of {loc, msg, type} —
          // flatten them into readable text (e.g. "promo code 'NOPE' is not valid").
          detail = Array.isArray(body.detail)
            ? body.detail
                .map((d) => (d.msg ?? "").replace(/^Value error, /, ""))
                .filter(Boolean)
                .join(". ")
            : body.detail;
        }
      } catch {
        /* ignore parse errors */
      }
      return { ok: false, error: detail };
    }
    const booking = (await res.json()) as { id: string; status: string; total: number };
    return { ok: true, booking };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not reach the booking service. Is the backend running?",
    };
  }
}
