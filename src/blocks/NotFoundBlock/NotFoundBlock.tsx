"use client";

import clsx from "clsx";
import styles from "./NotFoundBlock.module.scss";
import heroImage from "@/assets/images/404.jpg";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Image from "next/image";
import Header from "../Header/Header";
import { useEffect, useRef, useState } from "react";
import { ContactsT, ServiceT, SettingsT } from "@/types/types";
import { NewsResponse } from "@/types/api";

const NotFoundBlock = ({
  settings,
  contacts,
  services,
  storeUrl,
  products,
  companyServices,
  news,
}: {
  settings: Promise<SettingsT | null>;
  contacts: Promise<ContactsT | null>;
  services: Promise<ServiceT[] | null>;
  products: Promise<ServiceT[] | null>;
  companyServices: Promise<ServiceT[] | null>;
  storeUrl: string;
  news: Promise<NewsResponse | null>;
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const isHeroVisible = heroRect.bottom > 0;
        setIsHeaderHidden(!isHeroVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={heroRef} data-first-block className={styles.wrapper}>
      <Header
        isTransparent
        isHidden={isHeaderHidden}
        contacts={contacts}
        settings={settings}
        services={services}
        storeUrl={storeUrl}
        products={products}
        companyServices={companyServices}
        news={news}
      />
      <div className="wrapper">
        <section className={styles.container}>
          <div className={styles.image}>
            <Image src={heroImage} alt="background" />
          </div>
          <h1 className={clsx(styles.title, "h1")}>Страница не найдена</h1>
          <p className={clsx("body-1", styles.description)}>
            К сожалению, страница не найдена. Возможно, она была удалена или Вы
            ввели некорректный адрес (ошибка 404).
          </p>
          <MainButton className={styles.button} href="/">
            Вернуться на главную
          </MainButton>
        </section>
      </div>
    </div>
  );
};

export default NotFoundBlock;
