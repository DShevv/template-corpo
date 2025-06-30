import Header from "@/blocks/Header/Header";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import Footer from "@/blocks/Footer/Footer";
import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";
import MobileMenu from "@/blocks/MobileMenu/MobileMenu";
import { getContacts } from "@/services/SettingsService";
import { getSettings } from "@/services/SettingsService";
import dynamic from "next/dynamic";

const FloatingCallButton = dynamic(
  () => import("@/components/FloatingCallButton/FloatingCallButton")
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contacts = await getContacts();
  const settings = await getSettings();

  return (
    <>
      <Header
        contacts={contacts || undefined}
        settings={settings || undefined}
      />
      <HeaderMobile
        contacts={contacts || undefined}
        settings={settings || undefined}
      />
      <div className="wrapper">
        <main className={"white"}>{children}</main>
        <Footer
          settings={settings || undefined}
          contacts={contacts || undefined}
        />
      </div>
      <ImageViewer />

      <FeedbackPopup />
      <FloatingCallButton />
      <MobileMenu contacts={contacts || undefined} />
    </>
  );
}
