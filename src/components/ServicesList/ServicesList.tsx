import ServiceItem from "@/components/ServiceItem/ServiceItem";
import styles from "./ServicesList.module.scss";
import { ServiceT } from "@/types/types";

interface ServicesListProps {
  current?: number;
  max?: number;
  maxPerView?: number;
  storeUrl: string;
  services: Promise<ServiceT[] | null>;
  href: string;
}

export default async function ServicesList({
  storeUrl,
  services,
  href,
}: ServicesListProps) {
  const servicesData = await services;

  return (
    <>
      <div className={styles.services}>
        {servicesData?.map((item, index) => (
          <ServiceItem
            key={index}
            item={item}
            storeUrl={storeUrl}
            href={href}
          />
        ))}
      </div>
    </>
  );
}
