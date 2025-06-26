"use client";

import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/news.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useState } from "react";
import clsx from "clsx";
import { news } from "@/data/dumpy-data";
import NewsItem from "@/components/NewsItem/NewsItem";
import Pagination from "@/components/Pagination/Pagination";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <>
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Статьи", href: "/news" },
        ]}
        title="Статьи по тематикам"
        description="Предлагаем вам детально изучить актуальные материалы по выбранным направлениям из нашей обновлённой базы публикаций"
      />
      <div className={styles.wrapper}>
        <Swiper
          className={styles.tags}
          spaceBetween={16}
          slidesPerView={"auto"}
          freeMode={true}
        >
          <SwiperSlide
            className={clsx(
              styles.tag,
              selectedTag === null && styles.selected
            )}
            onClick={() => {
              setSelectedTag(null);
            }}
          >
            <div>Все</div>
          </SwiperSlide>
          <SwiperSlide
            className={clsx(
              styles.tag,
              selectedTag === "Тематика 1" && styles.selected
            )}
            onClick={() => {
              setSelectedTag("Тематика 1");
            }}
          >
            <div>Тематика 1</div>
          </SwiperSlide>
          <SwiperSlide
            className={clsx(
              styles.tag,
              selectedTag === "Тематика 2" && styles.selected
            )}
            onClick={() => {
              setSelectedTag("Тематика 2");
            }}
          >
            <div>Тематика 2</div>
          </SwiperSlide>
        </Swiper>

        <div className={styles.news}>
          {news.map((item) => (
            <NewsItem item={item} key={item.slug} />
          ))}
        </div>

        <div className={styles.pagination}>
          <Pagination current={1} max={10} maxPerView={6} />
        </div>

        <Feedback />
      </div>
    </>
  );
}
