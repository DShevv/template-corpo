import { Onest } from "next/font/google";
import "./globals.scss";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";

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

        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
