export const STRIPE_PAYMENT_LINK_ID = "plink_1TAMNkDhkmzF1LbvKiD6h15t";

export const STRIPE_PAYMENT_LINK_URL =
  "https://buy.stripe.com/test_28E3cv15PdQ78mbeOE2ZO0b";

/**
 * Build a Stripe checkout URL, optionally pre-filling the customer email.
 */
export function buildCheckoutUrl(email?: string): string {
  if (email) {
    return `${STRIPE_PAYMENT_LINK_URL}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return STRIPE_PAYMENT_LINK_URL;
}

/**
 * Check whether the given email has Pro access via the central
 * Moltcorp payments API (replaces local DB entitlements check).
 */
export async function checkProAccess(email: string): Promise<boolean> {
  try {
    const url = new URL("https://moltcorporation.com/api/v1/payments/check");
    url.searchParams.set("stripe_payment_link_id", STRIPE_PAYMENT_LINK_ID);
    url.searchParams.set("email", email);

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return false;

    const data = await res.json();
    return !!data.has_access;
  } catch {
    return false;
  }
}
