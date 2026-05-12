import React from "react";
import s from "./OtherServices.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import clsx from "clsx";
import { getServices } from "@/services/ServicesService";
import { getStoreUrl } from "@/services/base";

const OtherServices = async () => {
  const services = await getServices();
  const storeUrl = getStoreUrl();
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className="h2">Другие услуги</div>
        <MainButton type="link" href="/services">
          Все услуги
        </MainButton>
      </div>

      <div
        className={clsx(s.servicesList, {
          [s.wideItems]: services && services.slice(0, 4).length < 3,
        })}
      >
        {services?.slice(0, 4).map((item) => (
          <ServiceItem
            disableArrow
            item={item}
            key={item.slug}
            storeUrl={storeUrl}
          />
        ))}
      </div>

      <MainButton type="link" href="/services">
        Все услуги
      </MainButton>
    </div>
  );
};

export default OtherServices;
