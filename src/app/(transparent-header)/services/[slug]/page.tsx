import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import OurEmployees from "@/blocks/OurEmployees/OurEmployees";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import ServiceInfoBlock from "@/blocks/ServiceInfoBlock/ServiceInfoBlock";
import OtherServices from "@/blocks/OtherServices/OtherServices";
import Hero from "@/blocks/Hero/Hero";
import Header from "@/blocks/Header/Header";
import Footer from "@/blocks/Footer/Footer";
import HeroImage from "@/assets/images/service-bg.jpg";

export default function Home() {
  return (
    <>
      <Hero
        image={HeroImage}
        title={"Строительство коттеджей и таунхаусов"}
        description="Строим стильные дома и коммерческие объекты в Минске и области. Предлагаем популярные проекты дуплексов на 2 семьи и таунхаусов под ключ по конкурентоспособным ценам."
      />

      <div className={styles.wrapper}>
        <Header />
        <div className="wrapper">
          <ServiceInfoBlock />
          <OurAdvantages />
          <OurEmployees />
          <OurPartners />
          <OurReviews />
          <OtherServices />
          <Feedback />
        </div>
        <Footer />
      </div>
    </>
  );
}
