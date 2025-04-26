/**
 * Gets the base URL for the site, prioritizing window.location.origin in browser environments
 * and falling back to NEXT_PUBLIC_SITE_URL in server environments
 */
export function getSiteBaseUrl(): string {
  let baseUrl = ""

  if (typeof window !== "undefined") {
    baseUrl = window.location.origin
  } else {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ""
  }

  return baseUrl
}
