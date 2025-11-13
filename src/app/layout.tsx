import { Onest } from "next/font/google";
import "./globals.scss";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { getSettings } from "@/services/SettingsService";
import Notification from "@/components/Notification/Notification";
import { getStoreUrl } from "@/services/base";
import {
  SeoScriptsBody,
  SeoScriptsHead,
} from "@/components/SeoScripts/SeoScripts";

const onest = Onest({
  variable: "--font-family",
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata() {
  const settings = await getSettings();
  const storageUrl = getStoreUrl();
  return {
    icons: {
      icon: `${storageUrl}/${settings?.favicon}`,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <SeoScriptsHead />
      </head>
      <body className={`${onest.variable}`}>
        <SeoScriptsBody />
        <Script
          src="https://api-maps.yandex.ru/v3/?apikey=e1f9579b-8502-438f-8273-6dff1fc98656&lang=ru_RU"
          strategy="beforeInteractive"
        />

        <SmoothScroll />
        {children}
        <Notification />
      </body>
    </html>
  );
}
