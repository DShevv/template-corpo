import Header from "@/blocks/Header/Header";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import Footer from "@/blocks/Footer/Footer";
import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";
import MobileMenu from "@/blocks/MobileMenu/MobileMenu";
import { getContacts } from "@/services/SettingsService";
import { getSettings } from "@/services/SettingsService";
import dynamic from "next/dynamic";
import { getStoreUrl } from "@/services/base";
import { getServices } from "@/services/ServicesService";

const FloatingCallButton = dynamic(
  () => import("@/components/FloatingCallButton/FloatingCallButton")
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contacts = getContacts();
  const settings = getSettings();
  const storeUrl = getStoreUrl();
  const services = getServices();

  return (
    <>
      <Header
        contacts={contacts}
        settings={settings}
        storeUrl={storeUrl}
        services={services}
        isInverted={true}
      />
      <HeaderMobile
        contacts={contacts}
        settings={settings}
        storeUrl={storeUrl}
      />
      <div className="wrapper">
        <main className={"white"}>{children}</main>
        <Footer settings={settings} contacts={contacts} />
      </div>
      <ImageViewer />

      <FeedbackPopup />
      <FloatingCallButton />
      <MobileMenu contacts={contacts} services={services} />
    </>
  );
}
