/**
 * Gets the base URL for the site, using the NEXT_PUBLIC_SITE_URL environment variable
 * or falling back to window.location.origin in the browser
 */
export function getSiteBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_SITE_URL || ""
}
