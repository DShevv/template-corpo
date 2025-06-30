import Hero from "@/blocks/Hero/Hero";
import styles from "./page.module.scss";
import Header from "@/blocks/Header/Header";
import OurServices from "@/blocks/OurServices/OurServices";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import NewsBlock from "@/blocks/NewsBlock/NewsBlock";
import Feedback from "@/blocks/Feedback/Feedback";
import Footer from "@/blocks/Footer/Footer";
import heroImage from "@/assets/images/hero.png";
import { getPartners } from "@/services/PartnersService";
import { getReviews } from "@/services/ReviewsService";
import { getAdvantages } from "@/services/AdvantagesService";
import {
  getContacts,
  getSeoTag,
  getSettings,
} from "@/services/SettingsService";
import { getNews } from "@/services/NewsService";

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

export default async function Home() {
  const partners = await getPartners();
  const reviews = await getReviews();
  const advantages = await getAdvantages();
  const contacts = await getContacts();
  const settings = await getSettings();
  const news = await getNews();

  return (
    <>
      <Hero
        image={heroImage}
        title={"Создаем счастливое будущее для вас"}
        description={
          " Мы специализируемся в 11 отраслях в более чем 55 странах и регионах, предлагая инновационные решения для самых сложных задач наших клиентов."
        }
        contacts={contacts || undefined}
        settings={settings || undefined}
      />

      <div className={styles.wrapper}>
        <Header
          contacts={contacts || undefined}
          settings={settings || undefined}
        />
        <div className="wrapper">
          <OurServices />
          <AboutBlock />
          <OurPartners partners={partners} />
          <OurReviews reviews={reviews} />
          <OurAdvantages advantages={advantages} />
          <ContactsBlock
            contacts={contacts || undefined}
            logo={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${settings?.logo}`}
          />
          <NewsBlock news={news} />
          <Feedback settings={settings || undefined} />
        </div>
        <Footer
          settings={settings || undefined}
          contacts={contacts || undefined}
        />
      </div>
    </>
  );
}
