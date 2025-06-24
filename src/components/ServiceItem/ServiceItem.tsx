import Image from "next/image";
import styles from "./ServiceItem.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { ServiceItemT } from "@/types/types";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton";

interface ServiceItemProps {
  className?: string;
  service: ServiceItemT;
}

const ServiceItem = ({ className, service }: ServiceItemProps) => {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={clsx(styles.container, className)}
    >
      <div className={clsx("h6", styles.title)}>{service.title}</div>
      <div className={styles.image}>
        <ArrowButton className={styles.button} />

        <Image
          src={service.image}
          alt={service.title}
          width={304}
          height={106}
        />
      </div>
    </Link>
  );
};

export default ServiceItem;
