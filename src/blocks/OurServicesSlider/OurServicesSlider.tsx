"use client";
import clsx from "clsx";
import styles from "./OurServicesSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { use, useEffect, useState } from "react";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import { Grid } from "swiper/modules";
import { ServiceT } from "@/types/types";

const OurServicesSlider = ({
  title,
  services,
  storeUrl,
  category,
}: {
  title?: string;
  services: Promise<ServiceT[] | null>;
  storeUrl: string;
  category?: string;
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isClient, setIsClient] = useState(false);
  const servicesData = use(services);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!servicesData) return null;

  if (!isClient) return null;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={clsx("h2", styles.title)}>
          {title || "Услуги компании"}
        </div>

        {servicesData?.length > 4 && (
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
        )}
      </div>

      <Swiper
        className={styles.swiper}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: "auto",
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
      >
        {servicesData?.map((service, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <ServiceItem
              item={service}
              className={styles.item}
              disableArrow={servicesData?.length > 4}
              storeUrl={storeUrl}
              category={category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {servicesData?.length && servicesData?.length > 4 && (
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
      )}
    </section>
  );
};

export default OurServicesSlider;
