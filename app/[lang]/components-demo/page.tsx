import ComponentsDemoPage from "./client-page"
import type { Locale } from "@/lib/i18n-config"

export default function Page({
  params,
}: {
  params: { lang: Locale }
}) {
  return <ComponentsDemoPage params={params} />
}
