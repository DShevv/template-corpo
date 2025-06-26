import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/services.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import OurAdvantages from "@/blocks/OurAdvantages/OurAdvantages";
import OurEmployees from "@/blocks/OurEmployees/OurEmployees";
import OurPartners from "@/blocks/OurPartners/OurPartners";
import OurReviews from "@/blocks/OurReviews/OurReviews";
import ServiceInfoBlock from "@/blocks/ServiceInfoBlock/ServiceInfoBlock";
import OtherServices from "@/blocks/OtherServices/OtherServices";

export default function Home() {
  return (
    <>
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Услуги", href: "/services" },
          {
            title: "Строительство коттеджей и таунхаусов",
            href: "/services/construction-of-cottages-and-townhouses",
          },
        ]}
        title="Строительство коттеджей и таунхаусов"
        description="Строим стильные дома и коммерческие объекты в Минске и области. Предлагаем популярные проекты дуплексов на 2 семьи и таунхаусов под ключ по конкурентоспособным ценам."
      />
      <div className={styles.wrapper}>
        <ServiceInfoBlock />
        <OurAdvantages />
        <OurEmployees />
        <OurPartners />
        <OurReviews />
        <OtherServices />
        <Feedback />
      </div>
    </>
  );
}
