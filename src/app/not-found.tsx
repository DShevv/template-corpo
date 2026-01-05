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
import {
  getCompanyServices,
  getProducts,
  getServices,
} from "@/services/ServicesService";
import { getNews } from "@/services/NewsService";

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
  const services = getServices();
  const products = getProducts();
  const companyServices = getCompanyServices();
  const news = getNews();
  return (
    <>
      <HeaderMobile
        contacts={contacts}
        settings={settings}
        storeUrl={storeUrl}
      />

      <main>
        <NotFoundBlock
          settings={settings}
          contacts={contacts}
          services={services}
          products={products}
          companyServices={companyServices}
          storeUrl={storeUrl}
          news={news}
        />

        <div className={styles.wrapper}>
          <Footer
            className={styles.footer}
            settings={settings}
            contacts={contacts}
          />
        </div>
      </main>
      <ImageViewer />

      <FeedbackPopup settings={settings} storeUrl={storeUrl} />
      <FloatingCallButton />
    </>
  );
}
