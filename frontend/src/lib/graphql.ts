/**
 * Minimal GraphQL client for the Ocean backend.
 *
 * Queries POST to `/graphql`, which the Vite dev/preview server proxies to
 * http://127.0.0.1:8000 (see vite.config.ts). Point VITE_GRAPHQL_URL at a
 * deployed backend to override, or VITE_USE_GRAPHQL=1 to prefer live catalog
 * data (with automatic fallback to the bundled static content).
 */

const GRAPHQL_URL: string = (import.meta.env.VITE_GRAPHQL_URL as string | undefined) ?? "/graphql";
export const USE_GRAPHQL: boolean =
  (import.meta.env.VITE_USE_GRAPHQL as string | undefined) === "1";

export interface GraphQLResult<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<GraphQLResult<T>> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`GraphQL request failed (${res.status})`);
  }
  return (await res.json()) as GraphQLResult<T>;
}

/* ------------------------- Typed queries ------------------------- */

export interface GqlRate {
  id: string;
  title: string;
  description: string;
  badge: string;
  until: string;
  was: number | null;
  price: number;
}

export interface GqlVilla {
  slug: string;
  name: string;
  maxPersons: number;
  available: number;
  fromPrice: number;
  rates: GqlRate[];
}

export interface GqlPackage {
  slug: string;
  title: string;
  eyebrow: string;
  text: string;
  bookingCode: string;
  includes: string[];
  promoLabel: string | null;
  discountPercent: number | null;
}

export interface GqlPromo {
  code: string;
  label: string;
  discountPercent: number;
  active: boolean;
}

export const VILLAS_QUERY = /* GraphQL */ `
  query Villas {
    villas {
      slug
      name
      maxPersons
      available
      fromPrice
      rates {
        id
        title
        description
        badge
        until
        was
        price
      }
    }
  }
`;

export const RATES_QUERY = /* GraphQL */ `
  query Rates($checkin: String!, $checkout: String!) {
    rates(checkin: $checkin, checkout: $checkout) {
      slug
      name
      maxPersons
      available
      fromPrice
      rates {
        id
        title
        description
        badge
        until
        was
        price
      }
    }
  }
`;

export const PACKAGES_QUERY = /* GraphQL */ `
  query Packages {
    packages {
      slug
      title
      eyebrow
      text
      bookingCode
      includes
      promoLabel
      discountPercent
    }
  }
`;

export const PROMOS_QUERY = /* GraphQL */ `
  query Promos {
    promos {
      code
      label
      discountPercent
      active
    }
  }
`;

export async function fetchVillas(): Promise<GqlVilla[]> {
  const result = await graphqlRequest<{ villas: GqlVilla[] }>(VILLAS_QUERY);
  if (result.errors?.length) throw new Error(result.errors[0].message);
  return result.data?.villas ?? [];
}

export async function fetchRates(checkin: string, checkout: string): Promise<GqlVilla[]> {
  const result = await graphqlRequest<{ rates: GqlVilla[] }>(RATES_QUERY, { checkin, checkout });
  if (result.errors?.length) throw new Error(result.errors[0].message);
  return result.data?.rates ?? [];
}

export async function fetchPackages(): Promise<GqlPackage[]> {
  const result = await graphqlRequest<{ packages: GqlPackage[] }>(PACKAGES_QUERY);
  if (result.errors?.length) throw new Error(result.errors[0].message);
  return result.data?.packages ?? [];
}

export async function fetchPromos(): Promise<GqlPromo[]> {
  const result = await graphqlRequest<{ promos: GqlPromo[] }>(PROMOS_QUERY);
  if (result.errors?.length) throw new Error(result.errors[0].message);
  return result.data?.promos ?? [];
}

/* ------------------------- Convenience ------------------------- */

/**
 * Fetch the catalog, preferring GraphQL when enabled (VITE_USE_GRAPHQL=1).
 * Returns `null` when GraphQL is disabled or unreachable, so callers fall
 * back to the bundled static data.
 */
export async function tryGraphQLCatalog(): Promise<{
  villas: GqlVilla[];
  packages: GqlPackage[];
} | null> {
  if (!USE_GRAPHQL) return null;
  try {
    const [villas, packages] = await Promise.all([fetchVillas(), fetchPackages()]);
    return { villas, packages };
  } catch {
    return null;
  }
}
