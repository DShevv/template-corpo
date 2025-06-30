"use client";
import clsx from "clsx";
import styles from "./GalleryBlock.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

import Image from "next/image";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { useState } from "react";
import { GalleryT } from "@/types/types";

const GalleryBlock = ({ gallery }: { gallery: GalleryT[] }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (gallery.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>Фотогалерея проектов</h2>

      <Swiper
        className={styles.swiper}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={16}
        speed={500}
        loop={true}
        breakpoints={{
          768: {
            slidesPerView: "auto",
            spaceBetween: 24,
          },
        }}
        onSwiper={setSwiperInstance}
      >
        {gallery.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.image_path}`}
              alt={item.title}
              className={styles.image}
              width={960}
              height={520}
            />
            <div className={styles.caption}>
              <div className={clsx(styles.itemTitle, "h5")}>{item.title}</div>
              <p className={clsx("body-3", styles.description)}>
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
        {gallery.length < 6 &&
          gallery.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.image_path}`}
                alt={item.title}
                className={styles.image}
                width={960}
                height={520}
              />
              <div className={styles.caption}>
                <div className={clsx(styles.itemTitle, "h5")}>{item.title}</div>
                <p className={clsx("body-3", styles.description)}>
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className={styles.navigation}>
        <ArrowButton
          className={styles.prev}
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Назад"
        />
        <ArrowButton
          className={styles.next}
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Вперёд"
        />
      </div>
    </section>
  );
};

export default GalleryBlock;
