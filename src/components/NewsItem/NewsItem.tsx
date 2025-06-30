import Image from "next/image";
import styles from "./NewsItem.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { NewsItemT } from "@/types/types";
import { formatDate } from "@/utils/helper";

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
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.photo_path}`}
          alt={item.title}
          width={304}
          height={106}
        />
      </div>
      {item.tags.length > 0 && (
        <div className={clsx("body-2", styles.tag)}>{item.tags[0]}</div>
      )}
      <div className={clsx("body-6", styles.date)}>
        {formatDate(item.publication_date)}
      </div>
      <div className={clsx("h5", styles.title)}>{item.title}</div>
    </Link>
  );
};

export default NewsItem;
