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
  category?: string;
}

const ServiceItem = ({
  className,
  item,
  disableArrow,
  storeUrl,
  category,
}: ServiceItemProps) => {
  const image =
    typeof item.photo_path === "string"
      ? `${storeUrl}/${item.photo_path}`
      : item.photo_path.src;
  return (
    <Link
      href={`/services/${category ? `${category}/` : ""}${item.slug}`}
      className={clsx(styles.container, className)}
    >
      <div className={clsx("h6", styles.title)}>{item.title}</div>
      <div className={clsx("body-3", styles.subtitle)}>{item.subtitle}</div>
      <div className={styles.image}>
        {!disableArrow && (
          <ArrowButton className={styles.button} aria-label="Подробнее" />
        )}

        <Image src={image} alt={item.title} width={304} height={106} />
      </div>
    </Link>
  );
};

export default ServiceItem;
