"use client";
import clsx from "clsx";
import styles from "./GalleryBlock.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

import Image from "next/image";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { useState } from "react";
import galleryImage from "@/assets/images/gallery.png";

const GalleryBlock = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
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
        <SwiperSlide className={styles.slide}>
          <Image src={galleryImage} alt="gallery" className={styles.image} />
          <div className={styles.caption}>
            <div className={clsx(styles.itemTitle, "h5")}>
              Строительство коттеджа под г. Минском
            </div>
            <p className={clsx("body-3", styles.description)}>
              Мы выполнили проектирование и строительство индивидуального жилого
              дома площадью 160 м² по утвержденным чертежам. Объект был сдан за
              6 месяцев, получив высокую оценку заказчика.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Image src={galleryImage} alt="gallery" className={styles.image} />
          <div className={styles.caption}>
            <div className={clsx(styles.itemTitle, "h5")}>
              Строительство коттеджа под г. Минском
            </div>
            <p className={clsx("body-3", styles.description)}>
              Мы выполнили проектирование и строительство индивидуального жилого
              дома площадью 160 м² по утвержденным чертежам. Объект был сдан за
              6 месяцев, получив высокую оценку заказчика.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Image src={galleryImage} alt="gallery" className={styles.image} />
          <div className={styles.caption}>
            <div className={clsx(styles.itemTitle, "h5")}>
              Строительство коттеджа под г. Минском
            </div>
            <p className={clsx("body-3", styles.description)}>
              Мы выполнили проектирование и строительство индивидуального жилого
              дома площадью 160 м² по утвержденным чертежам. Объект был сдан за
              6 месяцев, получив высокую оценку заказчика.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Image src={galleryImage} alt="gallery" className={styles.image} />
          <div className={styles.caption}>
            <div className={clsx(styles.itemTitle, "h5")}>
              Строительство коттеджа под г. Минском
            </div>
            <p className={clsx("body-3", styles.description)}>
              Мы выполнили проектирование и строительство индивидуального жилого
              дома площадью 160 м² по утвержденным чертежам. Объект был сдан за
              6 месяцев, получив высокую оценку заказчика.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <Image src={galleryImage} alt="gallery" className={styles.image} />
          <div className={styles.caption}>
            <div className={clsx(styles.itemTitle, "h5")}>
              Строительство коттеджа под г. Минском
            </div>
            <p className={clsx("body-3", styles.description)}>
              Мы выполнили проектирование и строительство индивидуального жилого
              дома площадью 160 м² по утвержденным чертежам. Объект был сдан за
              6 месяцев, получив высокую оценку заказчика.
            </p>
          </div>
        </SwiperSlide>
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
