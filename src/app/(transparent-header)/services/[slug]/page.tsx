import firstBlockImage from "@/assets/images/service-item.png";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import OurEmployees from "@/blocks/OurEmployees/OurEmployees";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import ServiceInfoBlock from "@/blocks/ServiceInfoBlock/ServiceInfoBlock";
import OtherServices from "@/blocks/OtherServices/OtherServices";
import Footer from "@/blocks/Footer/Footer";
import Hero from "@/blocks/Hero/Hero";
import Header from "@/blocks/Header/Header";
import GalleryBlock from "@/blocks/GalleryBlock/GalleryBlock";
import { getAdvantages } from "@/services/AdvantagesService";
import { getPartners } from "@/services/PartnersService";
import { getReviews } from "@/services/ReviewsService";
import {
  getContacts,
  getSeoTag,
  getSettings,
} from "@/services/SettingsService";
import { getGallery } from "@/services/GalleryService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seoTag = await getSeoTag(slug);

  if (!seoTag) {
    return {};
  }

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

export default async function ServicePage() {
  const advantages = await getAdvantages();
  const partners = await getPartners();
  const reviews = await getReviews();
  const settings = await getSettings();
  const contacts = await getContacts();
  const gallery = await getGallery();
  return (
    <>
      <Hero
        settings={settings || undefined}
        contacts={contacts || undefined}
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Услуги", href: "/services" },
          {
            title: "Строительство коттеджей и таунхаусов",
            href: "/services/construction-of-cottages-and-townhouses",
          },
        ]}
        title="Строительство коттеджей и таунхаусов"
        description="Строим стильные дома и коммерческие объекты в Минске и области. Предлагаем популярные проекты дуплексов на 2 семьи и таунхаусов под ключ по конкурентоспособным ценам."
      />

      <div className={styles.wrapper}>
        <Header
          contacts={contacts || undefined}
          settings={settings || undefined}
        />
        <div className="wrapper">
          <ServiceInfoBlock />
          <OurAdvantages advantages={advantages} />
          <OurEmployees />
          <OurPartners partners={partners} />
          <GalleryBlock gallery={gallery || []} />
          <OurReviews reviews={reviews} />
          <OtherServices />
          {settings && <Feedback settings={settings} />}
        </div>
        <Footer
          contacts={contacts || undefined}
          settings={settings || undefined}
        />
      </div>
    </>
  );
}
