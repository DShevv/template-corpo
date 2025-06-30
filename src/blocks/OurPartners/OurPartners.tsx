"use client";
import clsx from "clsx";
import styles from "./OurPartners.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { useState } from "react";
import { PartnerT } from "@/types/types";

type OurPartnersProps = {
  partners: PartnerT[];
};

const OurPartners = ({ partners }: OurPartnersProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (!partners || partners.length === 0) return null;

  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>Наши партнеры</h2>

      <Swiper
        className={styles.swiper}
        slidesPerView={"auto"}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        }}
        onSwiper={setSwiperInstance}
        loop={true}
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${partner.image_path}`}
              alt={partner.name}
              className={styles.image}
              width={632}
              height={302}
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${partner.image_path}`}
              alt={partner.name}
              className={styles.logo}
              width={164}
              height={82}
            />
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

export default OurPartners;
