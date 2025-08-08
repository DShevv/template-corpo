"use client";
import React, { useRef, useState } from "react";
import s from "./OurEmployees.module.scss";
import EmployeeItem from "@/components/EmployeeItem/EmployeeItem";
import EmployeeImage from "@/assets/images/employee.jpg";
import EmployeeImage2 from "@/assets/images/emp1.jpg";
import EmployeeImage3 from "@/assets/images/emp2.jpg";
import EmployeeImage4 from "@/assets/images/emp3.jpg";
import ArrowButton from "@/components/Buttons/ArrowButton/ArrowButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import clsx from "clsx";

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
    image: EmployeeImage3,
    name: "Елена Николаева",
    phone: "+375 (99) 999-99-99",
    email: "info@website.by",
    position: "Заместитель директора",
  },
  {
    id: 3,
    image: EmployeeImage2,
    name: "Иван Алексеев",
    phone: "+375 (99) 999-99-99",
    email: "info@website.by",
    position: "Менеджер по продаже",
  },
  {
    id: 4,
    image: EmployeeImage4,
    name: "Михаил Новиков",
    phone: "+375 (99) 999-99-99",
    email: "info@website.by",
    position: "Специалист по продаже",
  },
];

const OurEmployees = () => {
  const swiperRef = useRef<SwiperType | null>(null);
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
        onSwiper={(instance) => {
          swiperRef.current = instance;
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {employees.map((employee, index) => (
          <SwiperSlide key={employee.id} className={s.slide}>
            <EmployeeItem employee={employee} active={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={clsx(s.navigation, {
          [s.isHiddenOnDesktop]: employees.length <= 4,
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
