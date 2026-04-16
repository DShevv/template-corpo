import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/about.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";
import ServicesList from "@/components/ServicesList/ServicesList";
import { getCompanyServices } from "@/services/ServicesService";

export async function generateMetadata() {
  const seoTag = await getSeoTag("/about");
  return {
    title: seoTag?.title,
    description: seoTag?.description,
    keywords: seoTag?.keywords,
    openGraph: {
      title: seoTag?.title,
      description: seoTag?.description,
    },
    alternates: {
      canonical: "/about",
    },
  };
}

export default function About() {
  const settings = getSettings();
  const storeUrl = getStoreUrl();
  const companyServices = getCompanyServices();
  return (
    <>
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Информация о компании", href: "/about" },
        ]}
        title="Информация о компании"
        description="Здесь вы найдете исчерпывающую информацию о компании."
      />
      <div className={styles.wrapper}>
        <ServicesList
          current={1}
          max={10}
          maxPerView={6}
          storeUrl={storeUrl}
          services={companyServices}
          href="about"
        />

        {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
      </div>
    </>
  );
}
