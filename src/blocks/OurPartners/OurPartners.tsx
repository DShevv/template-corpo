"use client";
import clsx from "clsx";
import styles from "./OurPartners.module.scss";
import { partners } from "@/data/dumpy-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { useState } from "react";

const OurPartners = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>Наши партнеры</h2>

      <Swiper
        className={styles.swiper}
        slidesPerView={2}
        spaceBetween={24}
        onSwiper={setSwiperInstance}
        loop={true}
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Image
              src={partner.image}
              alt={partner.name}
              className={styles.image}
            />
            <Image
              src={partner.logo}
              alt={partner.name}
              className={styles.logo}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigation}>
        <ArrowButton
          className={styles.prev}
          onClick={() => swiperInstance?.slidePrev()}
        />
        <ArrowButton
          className={styles.next}
          onClick={() => swiperInstance?.slideNext()}
        />
      </div>
    </section>
  );
};

export default OurPartners;
