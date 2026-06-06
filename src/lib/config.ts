/**
 * Single source of truth for cross-app URLs in the landing site.
 *
 * Set NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_URL and NEXT_PUBLIC_LANDING_URL
 * in each environment. The defaults below are the production canonical URLs
 * so a missing env var still produces working links.
 */

function trimTrailingSlash(s: string): string {
  return s.replace(/\/$/, "");
}

const APP_URL_DEFAULT = "https://chato-app.xerebrumgroup.com";
const API_URL_DEFAULT = "https://chato-api.xerebrumgroup.com";
const LANDING_URL_DEFAULT = "https://chato.xerebrumgroup.com";

export const URLS = {
  app: trimTrailingSlash(process.env.NEXT_PUBLIC_APP_URL ?? APP_URL_DEFAULT),
  api: trimTrailingSlash(process.env.NEXT_PUBLIC_API_URL ?? API_URL_DEFAULT),
  landing: trimTrailingSlash(process.env.NEXT_PUBLIC_LANDING_URL ?? LANDING_URL_DEFAULT),

  /** Direct link used by signup/CTA buttons. */
  get signIn(): string {
    return `${this.app}/login`;
  },
} as const;
