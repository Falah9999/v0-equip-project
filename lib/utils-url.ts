/**
 * Gets the site base URL
 * - In browser environments: Uses window.location.origin
 * - In server environments: Uses process.env.NEXT_PUBLIC_SITE_URL or empty string
 */
export function getSiteBaseUrl(): string {
  // Use window.location.origin if in browser environment
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  // Otherwise use the environment variable or empty string
  return process.env.NEXT_PUBLIC_SITE_URL || ""
}
