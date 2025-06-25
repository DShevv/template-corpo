import { Onest } from "next/font/google";
import "@/app/globals.scss";
import Script from "next/script";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";

const onest = Onest({
  variable: "--font-family",
  subsets: ["latin", "cyrillic"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${onest.variable}`}>
        <Script
          src="https://api-maps.yandex.ru/v3/?apikey=e1f9579b-8502-438f-8273-6dff1fc98656&lang=ru_RU"
          strategy="beforeInteractive"
        />

        <HeaderMobile />

        <main>{children}</main>
        <ImageViewer />
      </body>
    </html>
  );
}
