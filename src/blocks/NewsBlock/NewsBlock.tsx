"use client";
import clsx from "clsx";
import styles from "./NewsBlock.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { news } from "@/data/dumpy-data";
import NewsItem from "@/components/NewsItem/NewsItem";
import { useState } from "react";

const NewsBlock = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>Новости компании</h2>
        <MainButton type="link" href="/news" className={styles.button}>
          Все новости
        </MainButton>
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
      >
        {news.slice(0, 4).map((item, index) => (
          <SwiperSlide key={item.slug} className={styles.slide}>
            <NewsItem item={item} active={activeIndex === index} />
          </SwiperSlide>
        ))}
      </Swiper>

      <MainButton type="link" href="/news" className={styles.button}>
        Все новости
      </MainButton>
    </section>
  );
};

export default NewsBlock;
