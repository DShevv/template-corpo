import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/services.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import ServicesList from "@/components/ServicesList/ServicesList";
import { CanonicalLink } from "@/components/CanonicalLink/CanonicalLink";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";

export async function generateMetadata() {
  const seoTag = await getSeoTag("services");
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
        <ServicesList current={1} max={10} maxPerView={6} storeUrl={storeUrl} />

        {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
      </div>
    </>
  );
}
