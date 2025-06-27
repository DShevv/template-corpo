"use client";
import clsx from "clsx";
import styles from "./OurServicesSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { useState } from "react";
import { services } from "@/data/dumpy-data";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import { Grid } from "swiper/modules";

const OurServicesSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>Услуги компании</h2>

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
      </div>

      <Swiper
        className={styles.swiper}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
            grid: {
              rows: 1,
            },
          },
        }}
        onSwiper={setSwiperInstance}
        modules={[Grid]}
        grid={{
          rows: 4,
          fill: "row",
        }}
        loop={true}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <ServiceItem item={service} className={styles.item} />
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

export default OurServicesSlider;
