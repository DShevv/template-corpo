import Hero from "@/blocks/Hero/Hero";
import styles from "./page.module.scss";
import Header from "@/blocks/Header/Header";
import OurServices from "@/blocks/OurServices/OurServices";
import AboutBlock from "@/blocks/AboutBlock/AboutBlock";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import NewsBlock from "@/blocks/NewsBlock/NewsBlock";
import Feedback from "@/blocks/Feedback/Feedback";
import Footer from "@/blocks/Footer/Footer";

export default async function Home() {
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
          <OurAdvantages />
          <ContactsBlock />
          <NewsBlock />
          <Feedback />
        </div>
        <Footer />
      </div>
    </>
  );
}
