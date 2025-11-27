import { getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";

export async function DynamicSettings() {
  const [settings, storeUrl] = await Promise.all([
    getSettings(),
    getStoreUrl(),
  ]);

  return (
    <>
      <link rel="preconnect" href={storeUrl || ""} />
      <link rel="dns-prefetch" href={storeUrl || ""} />
      <style>
        {`:root {
          --color-accent-1: ${settings?.colors.icon_color};
          --color-button: ${settings?.colors.button_color_static};
          --color-button-additional: ${settings?.colors.button_color_static_additional};
          --color-button-hover: ${settings?.colors.button_color_hover};
          --color-text: ${settings?.colors.main_text_color};
          --color-link: ${settings?.colors.link_color};
          --color-bg: ${settings?.colors.background_color};
          --color-bg-card: ${settings?.colors.card_background_color};
          --color-heading: ${settings?.colors.heading_color};
        }`}
      </style>
    </>
  );
}
