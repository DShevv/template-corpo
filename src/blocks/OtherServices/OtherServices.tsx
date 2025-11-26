import React from "react";
import s from "./OtherServices.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import ServiceItem from "@/components/ServiceItem/ServiceItem";
import clsx from "clsx";
import { getStoreUrl } from "@/services/base";
import { ServiceT } from "@/types/types";

const OtherServices = async ({
  services,
  title,
  href,
  buttonText,
}: {
  services: Promise<ServiceT[] | null>;
  title?: string;
  href: string;
  buttonText?: string;
}) => {
  const servicesData = await services;
  const storeUrl = getStoreUrl();
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className="h2">{title || "Другие услуги"}</h2>
        <MainButton type="link" href={`/${href}`}>
          {buttonText || "Все услуги"}
        </MainButton>
      </div>

      <div
        className={clsx(s.servicesList, {
          [s.wideItems]: servicesData && servicesData.slice(0, 4).length < 3,
        })}
      >
        {servicesData?.slice(0, 4).map((item) => (
          <ServiceItem
            item={item}
            key={item.slug}
            storeUrl={storeUrl}
            href={href}
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
