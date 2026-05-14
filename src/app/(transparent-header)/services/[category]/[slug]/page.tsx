import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import OurEmployees from "@/blocks/OurEmployees/OurEmployees";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import Footer from "@/blocks/Footer/Footer";
import Hero from "@/blocks/Hero/Hero";
import Header from "@/blocks/Header/Header";
import GalleryBlock from "@/blocks/GalleryBlock/GalleryBlock";
import { getAdvantages } from "@/services/AdvantagesService";
import { getPartners } from "@/services/PartnersService";
import {
  getContacts,
  getSeoTag,
  getSettings,
} from "@/services/SettingsService";
import { getGallery } from "@/services/GalleryService";
import { getStoreUrl } from "@/services/base";
import {
  getServiceBySlug,
  getServiceBySlugTwo,
  getServices,
  getServicesTwo,
} from "@/services/ServicesService";
import { notFound } from "next/navigation";
import OurServicesSlider from "@/blocks/OurServicesSlider/OurServicesSlider";
import { getEmployees } from "@/services/EmployeesService";
import TextBlock from "@/blocks/TextBlock/TextBlock";
import ImageTextBlock from "@/blocks/ImageTextBlock/ImageTextBlock";
import {
  ImageBlockT,
  ImageTextBlockT,
  ServiceT,
  TextBlockT,
} from "@/types/types";
import ImageBlock from "@/blocks/ImageBlock/ImageBlock";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) {
  const { slug, category } = await params;
  const seoTag = await getSeoTag(`/services/${category}/${slug}`);

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
    alternates: {
      canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}services/${category}/${slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) {
  const { slug, category } = await params;

  if (category !== "events" && category !== "special-effects") {
    notFound();
  }

  const advantages = getAdvantages();
  const partners = getPartners();
  const settings = getSettings();
  const contacts = getContacts();
  const gallery = getGallery();
  const storeUrl = getStoreUrl();
  const services = category === "events" ? getServicesTwo() : getServices();
  const employees = getEmployees();
  const servicesData =
    category === "events"
      ? await getServiceBySlugTwo({ slug })
      : await getServiceBySlug({ slug });
  const servicesTwo = getServices();

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
            title: category === "events" ? "Мероприятия" : "Спецэффекты",
            href: `/services/${category}`,
          },
          {
            title: servicesData.title || "",
            href: `/services/${category}/${slug}`,
          },
        ]}
        title={servicesData.title || ""}
        description={servicesData.subtitle || ""}
        popup={"feedback"}
        storeUrl={storeUrl}
        isVideo={false}
      />

      <div className={styles.wrapper}>
        <Header
          contacts={contacts || undefined}
          settings={settings || undefined}
          storeUrl={storeUrl}
          services={servicesTwo}
        />
        <div className="wrapper">
          <ServiceContent servicesData={servicesData} />
          {/* <ServiceInfoBlock /> */}
          <OurAdvantages advantages={advantages} />
          <OurEmployees employees={employees} storeUrl={storeUrl} />
          <OurPartners partners={partners} />
          <GalleryBlock gallery={gallery} storeUrl={storeUrl} />

          <OurServicesSlider
            title="Другие услуги"
            services={services || []}
            storeUrl={storeUrl}
            category={category}
          />
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

const ServiceContent = async ({ servicesData }: { servicesData: ServiceT }) => {
  return (
    <>
      {servicesData.blocks?.map((block, index) => {
        if (block.type === "text_image") {
          return (
            <ImageTextBlock
              key={index}
              className={index === 0 ? "mt-0" : ""}
              images={block.images}
              content={
                {
                  text: block.text,
                  image_path: block.image_path,
                  image_position: block.image_position,
                } as ImageTextBlockT["content"]
              }
            />
          );
        }

        if (block.type === "text") {
          return (
            <TextBlock
              key={index}
              className={index === 0 ? "mt-0" : ""}
              content={
                {
                  text: block.text,
                } as TextBlockT["content"]
              }
            />
          );
        }

        if (block.type === "image") {
          return (
            <ImageBlock
              key={index}
              className={index === 0 ? "mt-0" : ""}
              images={block.images}
              content={
                {
                  image_path: block.image_path,
                } as ImageBlockT["content"]
              }
            />
          );
        }
      })}
    </>
  );
};
