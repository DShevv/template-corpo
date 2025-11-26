import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/about.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import OurEmployees from "@/blocks/OurEmployees/OurEmployees";
import { getReviews } from "@/services/ReviewsService";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";
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
  const reviews = getReviews();
  const settings = getSettings();
  const storeUrl = getStoreUrl();
  const employees = getEmployees();
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
        <OurEmployees employees={employees} storeUrl={storeUrl} />

        <OurReviews reviews={reviews} storeUrl={storeUrl} />

        <Feedback settings={settings || undefined} storeUrl={storeUrl} />
      </div>
    </>
  );
}
