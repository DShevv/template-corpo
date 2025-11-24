"use client";
import React, { use, useRef, useState } from "react";
import s from "./OurEmployees.module.scss";
import EmployeeItem from "@/components/EmployeeItem/EmployeeItem";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import clsx from "clsx";
import { EmployeeT } from "@/types/types";

const OurEmployees = ({
  employees,
  storeUrl,
}: {
  employees: Promise<EmployeeT[]>;
  storeUrl: string;
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const employeesData = use(employees);

  if (!employeesData || employeesData.length === 0) return null;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className="h2">Сотрудники</h2>
        <p className="body-2">
          Наши специалисты обладают многолетним опытом и профессиональной
          экспертизой. Под руководством признанных экспертов в отрасли команда
          реализует проекты повышенной сложности, гарантируя безупречный
          результат.
        </p>
      </div>

      <Swiper
        className={s.swiper}
        slidesPerView={"auto"}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        onSwiper={(instance) => {
          swiperRef.current = instance;
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {employeesData.map((employee, index) => (
          <SwiperSlide key={employee.id} className={s.slide}>
            <EmployeeItem
              employee={employee}
              active={index === activeIndex}
              storeUrl={storeUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={clsx(s.navigation, {
          [s.isHiddenOnDesktop]: employeesData.length <= 4,
        })}
      >
        <ArrowButton
          className={s.prev}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Назад"
        />
        <ArrowButton
          className={s.next}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Вперёд"
        />
      </div>
    </div>
  );
};

export default OurEmployees;
