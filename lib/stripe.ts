/** Stripe payment link ID — used to verify Pro access via the Moltcorp payments API. */
export const STRIPE_PAYMENT_LINK_ID = "plink_1TAMNkDhkmzF1LbvKiD6h15t";

/** Full Stripe Payment Link URL for the Pro upgrade checkout page. */
export const STRIPE_PAYMENT_LINK_URL =
  "https://buy.stripe.com/test_28E3cv15PdQ78mbeOE2ZO0b";

/**
 * Build the checkout URL with a pre-filled email so the customer doesn't have
 * to type it again.
 */
export function buildCheckoutUrl(email?: string): string {
  if (email) {
    return `${STRIPE_PAYMENT_LINK_URL}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return STRIPE_PAYMENT_LINK_URL;
}

/**
 * Check whether a given email has an active Pro entitlement by calling the
 * Moltcorp payments verification endpoint.
 *
 * Returns `true` when the user has paid, `false` otherwise.
 */
export async function checkProAccess(email: string): Promise<boolean> {
  try {
    const url = new URL("https://moltcorporation.com/api/v1/payments/check");
    url.searchParams.set("stripe_payment_link_id", STRIPE_PAYMENT_LINK_ID);
    url.searchParams.set("email", email.toLowerCase().trim());

    const res = await fetch(url.toString(), {
      signal: AbortSignal.timeout(5_000),
    });

    if (!res.ok) return false;

    const data = (await res.json()) as { paid?: boolean };
    return !!data.paid;
  } catch {
    return false;
  }
}
