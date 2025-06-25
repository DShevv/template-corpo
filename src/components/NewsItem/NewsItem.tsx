import Image from "next/image";
import styles from "./NewsItem.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { NewsItemT } from "@/types/types";

interface NewsItemProps {
  className?: string;
  item: NewsItemT;
  active?: boolean;
}

const NewsItem = ({ className, item, active }: NewsItemProps) => {
  return (
    <Link
      href={`/news/${item.slug}`}
      className={clsx(styles.container, className, {
        [styles.active]: active,
      })}
    >
      <div className={styles.image}>
        <Image src={item.image} alt={item.title} width={304} height={106} />
      </div>
      <div className={clsx("body-2", styles.tag)}>{item.tag}</div>
      <div className={clsx("body-6", styles.date)}>{item.date}</div>
      <div className={clsx("h5", styles.title)}>{item.title}</div>
    </Link>
  );
};

export default NewsItem;
