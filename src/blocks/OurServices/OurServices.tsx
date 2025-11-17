import clsx from "clsx";
import styles from "./OurServices.module.scss";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import { getStoreUrl } from "@/services/base";
import { getServices } from "@/services/ServicesService";

const OurServices = async () => {
  const storeUrl = getStoreUrl();
  const services = await getServices();
  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>Наши услуги</h2>

      <div className={styles.services}>
        {services &&
          services.map((service, index) => (
            <ServiceItem key={index} item={service} storeUrl={storeUrl} />
          ))}
      </div>
    </section>
  );
};

export default OurServices;
