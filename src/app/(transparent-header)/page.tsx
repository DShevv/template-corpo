import Hero from "@/blocks/Hero/Hero";
import styles from "./page.module.scss";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import NewsBlock from "@/blocks/NewsBlock/NewsBlock";
import Feedback from "@/blocks/Feedback/Feedback";
import Footer from "@/blocks/Footer/Footer";
import { getPartners } from "@/services/PartnersService";
import { getAdvantages } from "@/services/AdvantagesService";
import {
  getContacts,
  getSeoSettings,
  getSeoTag,
  getSettings,
} from "@/services/SettingsService";
import { getServices } from "@/services/ServicesService";
import { getNews } from "@/services/NewsService";
import OurServicesSlider from "@/blocks/OurServicesSlider/OurServicesSlider";
import { Suspense } from "react";
import { getStoreUrl } from "@/services/base";
import { VideosBlockWrapper } from "@/blocks/VideoBlock";

export async function generateMetadata() {
  const seoTag = await getSeoTag("/home");
  const settings = await getSettings();
  const seoSettings = await getSeoSettings();

  const storageUrl = getStoreUrl();
  return {
    title: seoTag?.title,
    description: seoTag?.description,
    keywords: seoTag?.keywords,
    openGraph: {
      title: seoTag?.title,
      description: seoTag?.description,
    },
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: `${storageUrl}/${settings?.favicon}`,
    },
    verification: {
      google: seoSettings?.google_search_console,
    },
    other: {
      'yandex-verification': seoSettings?.yandex_webmaster ?? '',
    },
  };
}

export default function Home() {
  const contacts = getContacts();
  const settings = getSettings();
  const partners = getPartners();
  const advantages = getAdvantages();
  const news = getNews();
  const storeUrl = getStoreUrl();
  const services = getServices();
  return (
    <>
      <Hero
        contacts={contacts}
        settings={settings}
        storeUrl={storeUrl}
        isVideo={true}
      />

      <div className={styles.wrapper}>
        <div className="wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <OurServicesSlider
              title="Какие спецэффекты мы создаём"
              services={services || []}
              storeUrl={storeUrl}
              category="special-effects"
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <AboutBlock />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <OurPartners partners={partners} />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <OurAdvantages advantages={advantages} />
          </Suspense>
          <ContactsBlock
            contacts={contacts}
            settings={settings}
            storeUrl={storeUrl}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <VideosBlockWrapper />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <NewsBlock
              title="Последние статьи"
              news={news}
              storeUrl={storeUrl}
            />
          </Suspense>
          <Feedback settings={settings} storeUrl={storeUrl} />
        </div>
        <Footer settings={settings} contacts={contacts} />
      </div>
    </>
  );
}
