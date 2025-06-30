"use client";
import clsx from "clsx";
import styles from "./OurReviews.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { useState } from "react";
import ReviewItem from "@/components/ReviewItem/ReviewItem";
import { ReviewT } from "@/types/types";

type OurReviewsProps = {
  reviews: ReviewT[];
};

const OurReviews = ({ reviews }: OurReviewsProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={clsx("h2", styles.title)}>Отзывы на нашу работу</h2>
        <p className={clsx("body-2", styles.description)}>
          Наши специалисты обладают многолетним опытом и профессиональной
          экспертизой. Под руководством признанных экспертов в отрасли команда
          реализует проекты повышенной сложности, гарантируя безупречный
          результат.
        </p>
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
      </div>

      <Swiper
        className={styles.swiper}
        slidesPerView={"auto"}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        onSwiper={setSwiperInstance}
        loop={true}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <ReviewItem
              image={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${review.author_photo}`}
              title={"title"}
              className={styles.item}
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

export default OurReviews;
