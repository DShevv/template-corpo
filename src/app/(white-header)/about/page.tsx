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
import ImageTextBlock from "@/blocks/ImageTextBlock/ImageTextBlock";
import { Suspense } from "react";
import TextBlock from "@/blocks/TextBlock/TextBlock";
import FeatureBlock from "@/blocks/FeatureBlock/FeatureBlock";
import { getEmployees } from "@/services/EmployeesService";

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
  const employees = getEmployees();
  return (
    <>
      <FirstBlock
        page="about"
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
        <Suspense fallback={<div>Loading...</div>}>
          <AboutContent />
        </Suspense>
        <OurEmployees employees={employees} storeUrl={storeUrl} />
        <OurServicesSlider services={services} storeUrl={storeUrl} />

        <Feedback settings={settings || undefined} storeUrl={storeUrl} />
      </div>
    </>
  );
}

const AboutContent = async () => {
  const settings = await getSettings();
  return (
    <>
      {settings?.about?.content_blocks?.map((block, index) => {
        if (block.type === "image_text") {
          return <ImageTextBlock key={index} content={block.content} />;
        }

        if (block.type === "text") {
          return <TextBlock key={index} content={block.content} />;
        }

        if (block.type === "feature_section") {
          return <FeatureBlock key={index} content={block.content} />;
        }
      })}
    </>
  );
};
