/**
 * Gets the base URL for the site, using the NEXT_PUBLIC_SITE_URL environment variable
 * or falling back to window.location.origin in the browser
 */
export function getSiteBaseUrl(): string {
  // In the browser, use window.location.origin as fallback
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  }
  // On the server, use the environment variable with empty string fallback
  return process.env.NEXT_PUBLIC_SITE_URL || ""
}
