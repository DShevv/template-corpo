import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/services.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import ServicesList from "@/components/ServicesList/ServicesList";
import { CanonicalLink } from "@/components/CanonicalLink/CanonicalLink";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";
import { getServices } from "@/services/ServicesService";

export async function generateMetadata() {
  const seoTag = await getSeoTag("/services");
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
  const services = getServices();
  return (
    <>
      <CanonicalLink href="/services" />
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Услуги", href: "/services" },
        ]}
        title="Услуги компании"
        description="Здесь вы найдете исчерпывающую информацию о спектре профессиональных решений, которые мы предлагаем клиентам."
      />
      <div className={styles.wrapper}>
        <ServicesList storeUrl={storeUrl} services={services} href="services" />

        {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
      </div>
    </>
  );
}
