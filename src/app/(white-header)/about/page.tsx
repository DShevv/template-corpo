import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/about.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import OurEmployees from "@/blocks/OurEmployees/OurEmployees";
import OurServices from "@/blocks/OurServices/OurServices";

export default function Home() {
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
        <AboutBlock />
        <OurEmployees />
        <OurReviews />
        <OurServices />
        <Feedback />
      </div>
    </>
  );
}
