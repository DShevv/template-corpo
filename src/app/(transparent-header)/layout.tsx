import ImageViewer from "@/components/ImageViewer/ImageViewer";
import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";
import MobileMenu from "@/blocks/MobileMenu/MobileMenu";
import { getContacts } from "@/services/SettingsService";
import { getSettings } from "@/services/SettingsService";
import dynamic from "next/dynamic";

const FloatingCallButton = dynamic(
  () => import("@/components/FloatingCallButton/FloatingCallButton")
);

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contacts = await getContacts();
  const settings = await getSettings();

  return (
    <>
      <HeaderMobile
        contacts={contacts || undefined}
        settings={settings || undefined}
      />

      <main>{children}</main>
      <ImageViewer />
      <FeedbackPopup />
      <FloatingCallButton />
      <MobileMenu contacts={contacts || undefined} />
    </>
  );
}
