import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/services.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import ServicesList from "@/components/ServicesList/ServicesList";
import { CanonicalLink } from "@/components/CanonicalLink/CanonicalLink";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";
import { getContentPageBySlug } from "@/services/ContentPagesService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const seoTag = await getSeoTag(`/services/${category}`);
  return {
    title: seoTag?.title,
    description: seoTag?.description,
    keywords: seoTag?.keywords,
    openGraph: {
      title: seoTag?.title,
      description: seoTag?.description,
    },
    alternates: {
      canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}services/${category}`,
    },
  };
}

export default async function Services({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const settings = getSettings();
  const storeUrl = getStoreUrl();

  const contentPage = await getContentPageBySlug(category);

  return (
    <>
      <CanonicalLink href="/services" />
      <FirstBlock
        image={
          `${storeUrl}/${contentPage?.fields.image.path}` || firstBlockImage
        }
        items={[
          { title: "Главная", href: "/" },
          { title: "Каталог", href: "/services" },
          { title: contentPage?.title || "", href: `/services/${category}` },
        ]}
        title={contentPage?.title || "Каталог услуг"}
        description={
          contentPage?.fields.subtitle.html ||
          "Подберите идеальный спецэффект для вашего события! В нашем каталоге вы найдёте готовые решения и вдохновляющие идеи, которые помогут создать нужную атмосферу и удивить ваших гостей."
        }
      />
      <div className={styles.wrapper}>
        <ServicesList
          current={1}
          max={1}
          maxPerView={6}
          storeUrl={storeUrl}
          category={category}
        />

        {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
      </div>
    </>
  );
}
