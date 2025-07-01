import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/about.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import OurEmployees from "@/blocks/OurEmployees/OurEmployees";
import OurServicesSlider from "@/blocks/OurServicesSlider/OurServicesSlider";
import { getReviews } from "@/services/ReviewsService";
import { getSeoTag, getSettings } from "@/services/SettingsService";

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

export default async function About() {
  const reviews = await getReviews();
  const settings = await getSettings();
  return (
    <>
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "О компании", href: "/about" },
        ]}
        title="О компании"
        description="Наша компания относительно недавно вышла на рынок услуг, но уже успела зарекомендовать себя как надежный партнер."
      />
      <div className={styles.wrapper}>
        <AboutBlock isHeader={false} />
        <OurEmployees />
        <OurServicesSlider />
        <OurReviews reviews={reviews || []} />

        <Feedback settings={settings || undefined} />
      </div>
    </>
  );
}
