import Hero from "@/blocks/Hero/Hero";
import styles from "./page.module.scss";
import Header from "@/blocks/Header/Header";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import NewsBlock from "@/blocks/NewsBlock/NewsBlock";
import Feedback from "@/blocks/Feedback/Feedback";
import Footer from "@/blocks/Footer/Footer";
import { getPartners } from "@/services/PartnersService";
import { getReviews } from "@/services/ReviewsService";
import { getAdvantages } from "@/services/AdvantagesService";
import {
  getContacts,
  getSeoTag,
  getSettings,
} from "@/services/SettingsService";
import { getServices } from "@/services/ServicesService";
import { getNews } from "@/services/NewsService";
import OurServicesSlider from "@/blocks/OurServicesSlider/OurServicesSlider";
import { Suspense } from "react";
import { getStoreUrl } from "@/services/base";
import { getBanners } from "@/services/BannersService";

export async function generateMetadata() {
  const seoTag = await getSeoTag("main");
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

export default function Home() {
  const contacts = getContacts();
  const settings = getSettings();
  const partners = getPartners();
  const reviews = getReviews();
  const advantages = getAdvantages();
  const news = getNews();
  const storeUrl = getStoreUrl();
  const services = getServices();
  const banners = getBanners();
  return (
    <>
      <Hero
        contacts={contacts}
        settings={settings}
        storeUrl={storeUrl}
        services={services || []}
        banners={banners}
      />

      <div className={styles.wrapper}>
        <Header
          contacts={contacts}
          settings={settings}
          storeUrl={storeUrl}
          services={services}
        />
        <div className="wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <OurServicesSlider
              title="Наши услуги"
              services={services || []}
              storeUrl={storeUrl}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <AboutBlock />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <OurPartners partners={partners} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <OurReviews reviews={reviews} storeUrl={storeUrl} />
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
            <NewsBlock news={news} storeUrl={storeUrl} />
          </Suspense>
          <Feedback settings={settings} storeUrl={storeUrl} />
        </div>
        <Footer settings={settings} contacts={contacts} />
      </div>
    </>
  );
}
