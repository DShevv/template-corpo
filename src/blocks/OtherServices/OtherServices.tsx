import React from "react";
import s from "./OtherServices.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import { services } from "@/data/dumpy-data";

const OtherServices = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className="h2">Другие услуги</h2>
        <MainButton type="link" href="/services">
          Все услуги
        </MainButton>
      </div>

      <div className={s.servicesList}>
        {services.slice(0, 4).map((item) => (
          <ServiceItem item={item} key={item.slug} />
        ))}
      </div>

      <MainButton type="link" href="/services">
        Все услуги
      </MainButton>
    </div>
  );
};

export default OtherServices;
