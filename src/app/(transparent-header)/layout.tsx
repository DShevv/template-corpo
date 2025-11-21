import ImageViewer from "@/components/ImageViewer/ImageViewer";
import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";
import MobileMenu from "@/blocks/MobileMenu/MobileMenu";
import { getContacts } from "@/services/SettingsService";
import { getSettings } from "@/services/SettingsService";
import dynamic from "next/dynamic";
import { getStoreUrl } from "@/services/base";

const FloatingCallButton = dynamic(
  () => import("@/components/FloatingCallButton/FloatingCallButton")
);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contacts = getContacts();
  const settings = getSettings();
  const storeUrl = getStoreUrl();
  return (
    <>
      <HeaderMobile
        contacts={contacts}
        settings={settings}
        storeUrl={storeUrl}
      />

      <main>{children}</main>
      <ImageViewer />
      <FeedbackPopup settings={settings} storeUrl={storeUrl} />
      <FloatingCallButton />
      <MobileMenu contacts={contacts || undefined} />
    </>
  );
}
