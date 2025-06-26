import clsx from "clsx";
import styles from "./OurServices.module.scss";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import { services } from "@/data/dumpy-data";

const OurServices = () => {
  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>Наши услуги</h2>

      <div className={styles.services}>
        {services.map((service, index) => (
          <ServiceItem key={index} item={service} />
        ))}
      </div>
    </section>
  );
};

export default OurServices;
