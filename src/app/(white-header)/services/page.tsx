import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/services.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import { services } from "@/data/dumpy-data";
import Pagination from "@/components/Pagination/Pagination";
import ServiceItem from "@/components/ServiceItem/ServiceItem";

export default function Home() {
  return (
    <>
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Услуги", href: "/services" },
        ]}
        title="Услуги компании"
        description="Здесь вы найдете исчерпывающую информацию о спектре профессиональных решений, которые мы предлагаем клиентам."
      />
      <div className={styles.wrapper}>
        <div className={styles.services}>
          {services.map((item, index) => (
            <ServiceItem key={index} item={item} />
          ))}
        </div>

        <div className={styles.pagination}>
          <Pagination current={1} max={10} maxPerView={6} />
        </div>

        <Feedback />
      </div>
    </>
  );
}
