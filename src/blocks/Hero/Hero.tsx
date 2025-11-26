"use client";

import clsx from "clsx";
import styles from "./Hero.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Image, { StaticImageData } from "next/image";
import Header from "../Header/Header";
import { use, useEffect, useRef, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import heroImage from "@/assets/images/hero.png";
import { BannerT, ContactsT, ServiceT, SettingsT } from "@/types/types";
import OpenPopupButton from "@/components/Buttons/OpenPopupButton/OpenPopupButton";

const Hero = ({
  items,
  image,
  title,
  description,
  contacts,
  settings,
  popup,
  storeUrl,
  services,
  products,
  companyServices,
  banners,
}: {
  items?: { title: string; href: string }[];
  image?: StaticImageData | string;
  title?: string;
  description?: string;
  contacts: Promise<ContactsT | null>;
  settings: Promise<SettingsT | null>;
  popup?: string;
  storeUrl: string;
  services: Promise<ServiceT[] | null>;
  products: Promise<ServiceT[] | null>;
  companyServices: Promise<ServiceT[] | null>;
  banners?: Promise<BannerT[] | null>;
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const bannersData = banners ? use(banners) : [];

  const imageUrl = image || `${storeUrl}/${bannersData?.[0]?.photo_path}`;

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
    <div
      ref={heroRef}
      data-first-block
      className={clsx(styles.wrapper, { [styles.service]: items })}
    >
      <Header
        isTransparent
        isHidden={isHeaderHidden}
        contacts={contacts}
        settings={settings}
        storeUrl={storeUrl}
        services={services}
        products={products}
        companyServices={companyServices}
      />
      <div className="wrapper">
        <section className={styles.container}>
          <div className={styles.image}>
            <Image
              src={imageUrl || heroImage}
              alt="hero"
              width={1920}
              height={1080}
            />
          </div>

          {items && <Breadcrumbs items={items} />}

          <h1 className={clsx(styles.title, "h1")}>
            {title ||
              bannersData?.[0]?.title ||
              "Создаем счастливое будущее для вас"}
          </h1>
          <p className={clsx("body-1", styles.description)}>
            {description ||
              bannersData?.[0]?.description ||
              "Мы специализируемся в 11 отраслях в более чем 55 странах и регионах, предлагая инновационные решения для самых сложных задач наших клиентов."}
          </p>
          {!items && (
            <MainButton
              className={styles.button}
              type="link"
              href={bannersData?.[0]?.button_link || "/about"}
            >
              Подробнее
            </MainButton>
          )}
          {popup && (
            <OpenPopupButton className={styles.button} popup={popup}>
              Оставить заявку
            </OpenPopupButton>
          )}
        </section>
      </div>
    </div>
  );
};

export default Hero;
