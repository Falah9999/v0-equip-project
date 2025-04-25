import "server-only"
import type { Locale } from "./i18n-config"

// Use a more explicit approach to importing dictionaries
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  try {
    return await dictionaries[locale]()
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error)
    // Fallback to English if there's an error
    return dictionaries.en()
  }
}
