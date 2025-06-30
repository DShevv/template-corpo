import { getSeoTag } from "@/services/SettingsService";
import { Suspense } from "react";

export async function generateMetadata() {
  const seoTag = await getSeoTag("news");
  return {
    title: seoTag?.title,
    description: seoTag?.description,
    keywords: seoTag?.keywords,
    openGraph: {
      title: seoTag?.title,
      description: seoTag?.description,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
