/**
 * Single source of truth for cross-app URLs and contact emails in the landing.
 *
 * Change the domain/emails in ONE place: set the NEXT_PUBLIC_* vars per
 * environment (in Dokploy as Build Arguments — they are inlined at build time).
 * The URL defaults below point at the current domain so a missing env var still
 * produces working links; the email defaults are the real heychato.com inboxes.
 * At the heychato.com cutover, only the env values change — no code edits. These
 * values feed the landing, the legal pages (/privacidad, /eliminar-datos) and the
 * URLs you copy into the Meta console.
 */

function trimTrailingSlash(s: string): string {
  return s.replace(/\/$/, "");
}

const APP_URL_DEFAULT = "https://chato-app.xerebrumgroup.com";
const API_URL_DEFAULT = "https://chato-api.xerebrumgroup.com";
const LANDING_URL_DEFAULT = "https://chato.xerebrumgroup.com";

const LEGAL_EMAIL_DEFAULT = "privacidad@heychato.com";
const CONTACT_EMAIL_DEFAULT = "hola@heychato.com";

export const URLS = {
  app: trimTrailingSlash(process.env.NEXT_PUBLIC_APP_URL ?? APP_URL_DEFAULT),
  api: trimTrailingSlash(process.env.NEXT_PUBLIC_API_URL ?? API_URL_DEFAULT),
  landing: trimTrailingSlash(process.env.NEXT_PUBLIC_LANDING_URL ?? LANDING_URL_DEFAULT),

  /** Direct link used by signup/CTA buttons. */
  get signIn(): string {
    return `${this.app}/login`;
  },
} as const;

/** Contact emails shown on the site and legal pages. */
export const EMAILS = {
  /** Privacy / legal / data-deletion requests. */
  legal: process.env.NEXT_PUBLIC_LEGAL_EMAIL ?? LEGAL_EMAIL_DEFAULT,
  /** General contact / support. */
  contact: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? CONTACT_EMAIL_DEFAULT,
} as const;
