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
import heroImage from "@/assets/images/hero.png";

export default async function Home() {
  return (
    <>
      <Hero
        image={heroImage}
        title={"Создаем счастливое будущее для вас"}
        description={
          " Мы специализируемся в 11 отраслях в более чем 55 странах и регионах, предлагая инновационные решения для самых сложных задач наших клиентов."
        }
      />

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
