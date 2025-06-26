import Image from "next/image";
import styles from "./ServiceItem.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { ServiceItemT } from "@/types/types";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton";

interface ServiceItemProps {
  className?: string;
  item: ServiceItemT;
}

const ServiceItem = ({ className, item }: ServiceItemProps) => {
  return (
    <Link
      href={`/services/${item.slug}`}
      className={clsx(styles.container, className)}
    >
      <div className={clsx("h6", styles.title)}>{item.title}</div>
      <div className={styles.image}>
        <ArrowButton className={styles.button} />

        <Image src={item.image} alt={item.title} width={304} height={106} />
      </div>
    </Link>
  );
};

export default ServiceItem;
