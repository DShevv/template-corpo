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
import { getStoreUrl } from "@/services/base";
import { getServiceBySlug, getServices } from "@/services/ServicesService";
import { notFound } from "next/navigation";

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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const advantages = getAdvantages();
  const partners = getPartners();
  const reviews = getReviews();
  const settings = getSettings();
  const contacts = getContacts();
  const gallery = getGallery();
  const storeUrl = getStoreUrl();
  const services = getServices();

  const servicesData = await getServiceBySlug({ slug });

  if (!servicesData) {
    notFound();
  }

  return (
    <>
      <Hero
        settings={settings || undefined}
        contacts={contacts || undefined}
        image={`${storeUrl}/${servicesData.photo_path}`}
        items={[
          { title: "Главная", href: "/" },
          { title: "Услуги", href: "/services" },
          {
            title: servicesData.title || "",
            href: `/services/${slug}`,
          },
        ]}
        title={servicesData.title || ""}
        description={servicesData.subtitle || ""}
        popup={"feedback"}
        storeUrl={storeUrl}
        services={services}
      />

      <div className={styles.wrapper}>
        <Header
          contacts={contacts || undefined}
          settings={settings || undefined}
          storeUrl={storeUrl}
          services={services}
        />
        <div className="wrapper">
          <ServiceInfoBlock />
          <OurAdvantages advantages={advantages} />
          <OurEmployees />
          <OurPartners partners={partners} />
          <GalleryBlock gallery={gallery} storeUrl={storeUrl} />
          <OurReviews reviews={reviews} storeUrl={storeUrl} />
          <OtherServices />
          {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
        </div>
        <Footer
          contacts={contacts || undefined}
          settings={settings || undefined}
        />
      </div>
    </>
  );
}
