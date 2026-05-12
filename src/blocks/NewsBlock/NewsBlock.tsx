"use client";
import clsx from "clsx";
import styles from "./NewsBlock.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import NewsItem from "@/components/NewsItem/NewsItem";
import { use, useEffect, useRef, useState } from "react";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { NewsResponse } from "@/types/api";
import "swiper/css";

const NewsBlock = ({
  className,
  title,
  isArrows = false,
  news,
  storeUrl,
}: {
  className?: string;
  title?: string;
  isArrows?: boolean;
  news: Promise<NewsResponse | null>;
  storeUrl: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  const newsData = use(news);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (!newsData || newsData.data.length === 0) return null;

  return (
    <section className={clsx(styles.container, className)}>
      <header className={styles.header}>
        <div className={clsx("h2", styles.title)}>
          {title || "Новости компании"}
        </div>
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
            Все статьи
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
        {(isArrows ? newsData.data : newsData.data.slice(0, 4)).map(
          (item, index) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <NewsItem
                item={item}
                active={activeIndex === index}
                storeUrl={storeUrl}
              />
            </SwiperSlide>
          ),
        )}
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
          Все статьи
        </MainButton>
      )}
    </section>
  );
};

export default NewsBlock;
