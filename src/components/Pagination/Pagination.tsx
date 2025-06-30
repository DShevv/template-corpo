"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./Pagination.module.scss";
import clsx from "clsx";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";

interface PaginationProps {
  current: number;
  max: number;
  maxPerView: number;
  className?: string;
}

const Pagination = ({
  current,
  max,
  maxPerView,
  className,
}: PaginationProps) => {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className={clsx(styles.container, className)}>
      {current > 1 && (
        <ArrowButton
          disabled={current === 1}
          type="link"
          href={createPageUrl(current - 1)}
          className={styles.prev}
          aria-label="Назад"
        />
      )}
      <div className={clsx(styles.list)}>
        {Array.from({ length: max }, (_, i) => i + 1)
          .filter((_, index) => {
            if (index - current > Math.floor(maxPerView / 2) - 1) return false;
            if (current - index > Math.floor(maxPerView / 2) + 1) return false;
            return true;
          })
          .map((elem) => {
            const pageNumber = elem;
            if (elem > max) return null;
            return (
              <Link
                key={pageNumber}
                className={clsx("h5", styles.page, {
                  [styles.active]: elem === current,
                })}
                href={createPageUrl(pageNumber)}
              >
                {pageNumber}
              </Link>
            );
          })}
      </div>

      {current < max && (
        <ArrowButton
          disabled={current === max}
          type="link"
          href={createPageUrl(current + 1)}
          className={styles.next}
          aria-label="Вперёд"
        />
      )}
    </div>
  );
};

export default Pagination;
