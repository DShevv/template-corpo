import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { getSeoSettings } from "@/services/SettingsService";
import { extractScriptContent } from "@/utils/extractScriptContent";

export async function SeoScriptsHead() {
  const seoSettings = await getSeoSettings();

  return (
    <>
      {seoSettings?.google_tag && (
        <GoogleTagManager gtmId={seoSettings.google_tag} />
      )}
      {seoSettings?.yandex_metrika && (
        <Script
          id="yandex-metrika"
          dangerouslySetInnerHTML={{
            __html: extractScriptContent(seoSettings.yandex_metrika),
          }}
          strategy="lazyOnload"
        />
      )}
    </>
  );
}

export async function SeoScriptsBody() {
  const seoSettings = await getSeoSettings();

  return (
    <>
      {seoSettings?.google_search_console && (
        <Script
          id="google-search-console"
          dangerouslySetInnerHTML={{
            __html: seoSettings.google_search_console,
          }}
          strategy="lazyOnload"
        />
      )}
      {seoSettings?.yandex_webmaster && (
        <Script
          id="yandex-webmaster"
          dangerouslySetInnerHTML={{ __html: seoSettings.yandex_webmaster }}
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
