"use client";
import clsx from "clsx";
import styles from "./NewsBlock.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import NewsItem from "@/components/NewsItem/NewsItem";
import { useRef, useState } from "react";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { NewsResponse } from "@/types/api";

import "swiper/css";

const NewsBlock = ({
  className,
  title,
  isArrows = false,
  news,
}: {
  className?: string;
  title?: string;
  isArrows?: boolean;
  news: NewsResponse | null;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  if (!news || news.data.length === 0) return null;

  return (
    <section className={clsx(styles.container, className)}>
      <header className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>
          {title || "Новости компании"}
        </h2>
        {isArrows ? (
          <div className={styles.navigation}>
            <ArrowButton
              className={styles.prev}
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              aria-label="Назад"
            />
            <ArrowButton
              className={styles.next}
              onClick={() => swiperRef.current?.swiper.slideNext()}
              aria-label="Вперёд"
            />
          </div>
        ) : (
          <MainButton type="link" href="/news" className={styles.button}>
            Все новости
          </MainButton>
        )}
      </header>

      <Swiper
        spaceBetween={16}
        slidesPerView={"auto"}
        className={styles.swiper}
        breakpoints={{
          768: {
            spaceBetween: 24,
            slidesPerView: 4,
          },
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        ref={swiperRef}
      >
        {(isArrows ? news.data : news.data.slice(0, 4)).map((item, index) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <NewsItem item={item} active={activeIndex === index} />
          </SwiperSlide>
        ))}
      </Swiper>

      {isArrows ? (
        <div className={styles.navigation}>
          <ArrowButton
            className={styles.prev}
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            aria-label="Назад"
          />
          <ArrowButton
            className={styles.next}
            onClick={() => swiperRef.current?.swiper.slideNext()}
            aria-label="Вперёд"
          />
        </div>
      ) : (
        <MainButton type="link" href="/news" className={styles.button}>
          Все новости
        </MainButton>
      )}
    </section>
  );
};

export default NewsBlock;
