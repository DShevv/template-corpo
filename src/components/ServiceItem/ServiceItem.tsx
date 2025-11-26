import Image from "next/image";
import styles from "./ServiceItem.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { ServiceT } from "@/types/types";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton";

interface ServiceItemProps {
  className?: string;
  item: ServiceT;
  disableArrow?: boolean;
  storeUrl: string;
  href: string;
}

const ServiceItem = ({
  className,
  item,
  disableArrow,
  storeUrl,
  href,
}: ServiceItemProps) => {
  return (
    <Link
      href={`/${href}/${item.slug}`}
      className={clsx(styles.container, className)}
    >
      <div className={clsx("h6", styles.title)}>{item.title}</div>
      <div className={styles.image}>
        {!disableArrow && (
          <ArrowButton className={styles.button} aria-label="Подробнее" />
        )}

        <Image
          src={`${storeUrl}/${item.photo_path}`}
          alt={item.title}
          width={304}
          height={106}
        />
      </div>
    </Link>
  );
};

export default ServiceItem;
