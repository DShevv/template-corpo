import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/about.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurEmployees from "@/blocks/OurEmployees/OurEmployees";
import OurServicesSlider from "@/blocks/OurServicesSlider/OurServicesSlider";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";
import { getServices } from "@/services/ServicesService";

export async function generateMetadata() {
  const seoTag = await getSeoTag("about");
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

export default function About() {
  const settings = getSettings();
  const storeUrl = getStoreUrl();
  const services = getServices();
  return (
    <>
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "О компании", href: "/about" },
        ]}
        title="О компании"
        description="Мы — компания Speceffektyminsk, и наша миссия заключается в том, чтобы создавать незабываемые визуальные впечатления и атмосферу настоящего «вау»-эффекта для ваших событий."
      />
      <div className={styles.wrapper}>
        <AboutBlock isHeader={false} />
        <OurEmployees />
        <OurServicesSlider services={services} storeUrl={storeUrl} />

        <Feedback settings={settings || undefined} storeUrl={storeUrl} />
      </div>
    </>
  );
}
