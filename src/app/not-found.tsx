import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";
import FloatingCallButton from "@/components/FloatingCallButton/FloatingCallButton";
import Footer from "@/blocks/Footer/Footer";
import NotFoundBlock from "@/blocks/NotFoundBlock/NotFoundBlock";
import styles from "./not-found.module.scss";
import {
  getContacts,
  getSeoTag,
  getSettings,
} from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";

export async function generateMetadata() {
  const seoTag = await getSeoTag("404");
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

export default function NotFound() {
  const settings = getSettings();
  const contacts = getContacts();
  const storeUrl = getStoreUrl();
  return (
    <>
      <HeaderMobile
        contacts={contacts}
        settings={settings}
        storeUrl={storeUrl}
      />

      <main>
        <NotFoundBlock />

        <div className={styles.wrapper}>
          <Footer
            className={styles.footer}
            settings={settings}
            contacts={contacts}
          />
        </div>
      </main>
      <ImageViewer />

      <FeedbackPopup />
      <FloatingCallButton />
    </>
  );
}
