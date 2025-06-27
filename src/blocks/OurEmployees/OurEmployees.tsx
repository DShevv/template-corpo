"use client";
import React, { useState } from "react";
import s from "./OurEmployees.module.scss";
import EmployeeItem from "@/components/EmployeeItem/EmployeeItem";
import EmployeeImage from "@/assets/images/employee.jpg";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";

const employees = [
  {
    id: 1,
    image: EmployeeImage,
    name: "Анна Иванова",
    phone: "+375 (99) 999-99-99",
    email: "info@website.by",
    position: "Директор",
  },
  {
    id: 2,
    image: EmployeeImage,
    name: "Анна Иванова",
    phone: "+375 (99) 999-99-99",
    email: "info@website.by",
    position: "Директор",
  },
  {
    id: 3,
    image: EmployeeImage,
    name: "Анна Иванова",
    phone: "+375 (99) 999-99-99",
    email: "info@website.by",
    position: "Директор",
  },
  {
    id: 4,
    image: EmployeeImage,
    name: "Анна Иванова",
    phone: "+375 (99) 999-99-99",
    email: "info@website.by",
    position: "Директор",
  },
  {
    id: 5,
    image: EmployeeImage,
    name: "Анна Иванова",
    phone: "+375 (99) 999-99-99",
    email: "info@website.by",
    position: "Директор",
  },
];

const OurEmployees = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
        onSwiper={setSwiperInstance}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {employees.map((employee, index) => (
          <SwiperSlide key={employee.id} className={s.slide}>
            <EmployeeItem employee={employee} active={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={s.navigation}>
        <ArrowButton
          className={s.prev}
          onClick={() => swiperInstance?.slidePrev()}
          aria-label="Назад"
        />
        <ArrowButton
          className={s.next}
          onClick={() => swiperInstance?.slideNext()}
          aria-label="Вперёд"
        />
      </div>
    </div>
  );
};

export default OurEmployees;
