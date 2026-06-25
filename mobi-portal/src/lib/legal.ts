/**
 * Central facts referenced across the legal pages. Update these once the owner
 * confirms the registered entity, governing law, and policy specifics.
 *
 * NOTE (owner): these documents are sensible, plain-language defaults for a
 * construction-estimating service. Have them reviewed by an attorney and
 * confirm the bracketed/!! items before relying on them. Edit values here —
 * the pages read from this module.
 */
export const LEGAL_ENTITY = "Mobi Estimates";
export const CONTACT_EMAIL = "estimates@mobiestimates.com";
export const SITE_NAME = "Mobi Estimates";

// Owner to confirm the state/country whose law governs the agreement.
export const GOVERNING_LAW = "the State of [Owner to confirm]";

// Update when the policies materially change.
export const LEGAL_EFFECTIVE_DATE = "June 25, 2026";

export const LEGAL_PAGES: { href: string; title: string }[] = [
  { href: "/legal/terms", title: "Terms of Service" },
  { href: "/legal/estimating-agreement", title: "Estimating Service Agreement" },
  { href: "/legal/cancellation-refund", title: "Cancellation & Refund Policy" },
  { href: "/legal/privacy", title: "Privacy Policy" },
];
