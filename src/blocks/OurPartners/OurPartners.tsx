"use client";
import clsx from "clsx";
import styles from "./OurPartners.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { use, useState } from "react";
import { PartnerT } from "@/types/types";
import { getStoreUrl } from "@/services/base";

type OurPartnersProps = {
  partners: Promise<PartnerT[]>;
};

const OurPartners = ({ partners }: OurPartnersProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const storeUrl = getStoreUrl();
  const partnersData = use(partners);

  if (!partnersData || partnersData.length === 0) return null;

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
      >
        {partnersData.map((partner, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Image
              src={`${storeUrl}/${partner.photo_path}`}
              alt={partner.name}
              className={styles.image}
              width={632}
              height={302}
            />
            <Image
              src={`${storeUrl}/${partner.image_path}`}
              alt={partner.name}
              className={styles.logo}
              width={164}
              height={82}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={clsx(styles.navigation, {
          [styles.isHiddenOnDesktop]: partnersData?.length <= 2,
        })}
      >
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
