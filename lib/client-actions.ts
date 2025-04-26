"use server"

import { getDictionary } from "@/lib/dictionaries"
import type { Locale } from "@/lib/i18n-config"

export async function fetchDictionary(lang: Locale) {
  return getDictionary(lang)
}
