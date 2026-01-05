import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurReviews from "@/blocks/OurReviews/OurReviews";
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
import {
  getCompanyServices,
  getProductBySlug,
  getProducts,
  getServices,
} from "@/services/ServicesService";
import { notFound } from "next/navigation";
import TextBlock from "@/blocks/TextBlock/TextBlock";
import ImageBlock from "@/blocks/ImageBlock/ImageBlock";
import {
  TextBlockT,
  ImageBlockT,
  ServiceT,
  ImageTextBlockT,
} from "@/types/types";
import ImageTextBlock from "@/blocks/ImageTextBlock/ImageTextBlock";
import { getNews } from "@/services/NewsService";

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
  const products = getProducts();
  const companyServices = getCompanyServices();
  const news = getNews();
  const servicesData = await getProductBySlug({ slug });

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
          { title: "Продукция", href: "/products" },
          {
            title: servicesData.title || "",
            href: `/products/${slug}`,
          },
        ]}
        title={servicesData.title || ""}
        description={servicesData.subtitle || ""}
        popup={"feedback"}
        storeUrl={storeUrl}
        services={products}
        products={products}
        companyServices={companyServices}
        news={news}
      />

      <div className={styles.wrapper}>
        <Header
          contacts={contacts || undefined}
          settings={settings || undefined}
          storeUrl={storeUrl}
          services={services}
          products={products}
          companyServices={companyServices}
          isInverted={true}
          news={news}
        />
        <div className="wrapper">
          <ServiceContent servicesData={servicesData.blocks} />

          <OurAdvantages advantages={advantages} />
          <OurPartners partners={partners} />
          <GalleryBlock gallery={gallery} storeUrl={storeUrl} />
          <OurReviews reviews={reviews} storeUrl={storeUrl} />
          <OtherServices
            services={products}
            href="products"
            title="Продукция компании"
            buttonText="Вся продукция"
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

const ServiceContent = ({
  servicesData,
}: {
  servicesData: ServiceT["blocks"];
}) => {
  return (
    <>
      {servicesData?.map((block, index) => {
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
              content={
                {
                  image_path: block.image_path,
                } as ImageBlockT["content"]
              }
            />
          );
        }

        if (block.type === "text_image") {
          return (
            <ImageTextBlock
              key={index}
              className={index === 0 ? "mt-0" : ""}
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

        return null;
      })}
    </>
  );
};
