import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/services.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import { services } from "@/data/dumpy-data";
import Pagination from "@/components/Pagination/Pagination";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import { CanonicalLink } from "@/components/CanonicalLink/CanonicalLink";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { Suspense } from "react";

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

export default async function Services() {
  const settings = await getSettings();
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
        <div className={styles.services}>
          {services.map((item, index) => (
            <ServiceItem key={index} item={item} />
          ))}
        </div>

        <div className={styles.pagination}>
          <Suspense>
            <Pagination current={1} max={10} maxPerView={6} />
          </Suspense>
        </div>

        {settings && <Feedback settings={settings} />}
      </div>
    </>
  );
}
