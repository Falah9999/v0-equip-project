/**
 * Determines the base URL for the application
 * - In browser environments: Uses window.location.origin
 * - In server environments: Uses process.env.NEXT_PUBLIC_SITE_URL or empty string
 */
export const baseUrl = typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || ""
