import { Suspense } from "react";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./ServicesList.module.scss";
import { getServices } from "@/services/ServicesService";

interface ServicesListProps {
  current?: number;
  max?: number;
  maxPerView?: number;
  storeUrl: string;
}

export default async function ServicesList({
  current = 1,
  max = 10,
  maxPerView = 6,
  storeUrl,
}: ServicesListProps) {
  const services = await getServices();

  return (
    <>
      <div className={styles.services}>
        {services?.map((item, index) => (
          <ServiceItem key={index} item={item} storeUrl={storeUrl} />
        ))}
      </div>

      {services && services.length > maxPerView && (
        <div className={styles.pagination}>
          <Suspense>
            <Pagination current={current} max={max} maxPerView={maxPerView} />
          </Suspense>
        </div>
      )}
    </>
  );
}
