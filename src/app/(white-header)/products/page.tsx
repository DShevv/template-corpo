import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/services.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import ServicesList from "@/components/ServicesList/ServicesList";
import { CanonicalLink } from "@/components/CanonicalLink/CanonicalLink";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";
import { getProducts } from "@/services/ServicesService";

export async function generateMetadata() {
  const seoTag = await getSeoTag("products");
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

export default function Services() {
  const settings = getSettings();
  const storeUrl = getStoreUrl();
  const products = getProducts();
  return (
    <>
      <CanonicalLink href="/products" />
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Продукция", href: "/products" },
        ]}
        title="Продукция компании"
        description="Здесь вы найдете исчерпывающую информацию о спектре профессиональных решений, которые мы предлагаем клиентам."
      />
      <div className={styles.wrapper}>
        <ServicesList
          current={1}
          max={10}
          maxPerView={6}
          storeUrl={storeUrl}
          services={products}
          href="products"
        />

        {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
      </div>
    </>
  );
}
