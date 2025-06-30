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

export default async function NotFound() {
  const settings = await getSettings();
  const contacts = await getContacts();
  return (
    <>
      <HeaderMobile />

      <main>
        <NotFoundBlock
          settings={settings || null}
          contacts={contacts || null}
        />

        <div className={styles.wrapper}>
          <Footer className={styles.footer} settings={settings || undefined} />
        </div>
      </main>
      <ImageViewer />

      <FeedbackPopup />
      <FloatingCallButton />
    </>
  );
}
