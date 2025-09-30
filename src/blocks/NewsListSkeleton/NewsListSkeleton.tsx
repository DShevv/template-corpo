import styles from "./NewsListSkeleton.module.scss";
import { Skeleton } from "@/components/Skeleton/Skeleton";

export default function NewsListSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tags}>
        <Skeleton className={styles.tag} />
        <Skeleton className={styles.tag} />
        <Skeleton className={styles.tag} />
      </div>

      <div className={styles.news}>
        <Skeleton className={styles.newsItem}>
          <Skeleton className={styles.newsDate} />
          <Skeleton className={styles.newsTitle} />
        </Skeleton>
        <Skeleton className={styles.newsItem}>
          <Skeleton className={styles.newsDate} />
          <Skeleton className={styles.newsTitle} />
        </Skeleton>
        <Skeleton className={styles.newsItem}>
          <Skeleton className={styles.newsDate} />
          <Skeleton className={styles.newsTitle} />
        </Skeleton>
        <Skeleton className={styles.newsItem}>
          <Skeleton className={styles.newsDate} />
          <Skeleton className={styles.newsTitle} />
        </Skeleton>
      </div>
    </div>
  );
}
