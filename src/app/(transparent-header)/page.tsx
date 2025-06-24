import Hero from "@/blocks/Hero/Hero";
import styles from "./page.module.scss";
import Header from "@/blocks/Header/Header";
import OurServices from "@/blocks/OurServices/OurServices";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurReviews from "@/blocks/OurReviews/OurReviews";

export default function Home() {
  return (
    <>
      <Hero />

      <div className={styles.wrapper}>
        <Header />
        <div className="wrapper">
          <OurServices />
          <AboutBlock />
          <OurPartners />
          <OurReviews />
        </div>
      </div>
    </>
  );
}
