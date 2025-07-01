"use client";

import clsx from "clsx";
import styles from "./Hero.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Image, { StaticImageData } from "next/image";
import Header from "../Header/Header";
import { useEffect, useRef, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import heroImage from "@/assets/images/hero.png";
import { ContactsT, SettingsT } from "@/types/types";

const Hero = ({
  items,
  image,
  title,
  description,
  contacts,
  settings,
}: {
  items?: { title: string; href: string }[];
  image?: StaticImageData | string;
  title?: string;
  description?: string;
  contacts?: ContactsT;
  settings?: SettingsT;
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
      />
      <div className="wrapper">
        <section className={styles.container}>
          <div className={styles.image}>
            <Image src={image || heroImage} alt="hero" />
          </div>

          {items && <Breadcrumbs items={items} />}

          <h1 className={clsx(styles.title, "h1")}>
            {title || "Создаем счастливое будущее для вас"}
          </h1>
          <p className={clsx("body-1", styles.description)}>
            {description ||
              "Мы специализируемся в 11 отраслях в более чем 55 странах и регионах, предлагая инновационные решения для самых сложных задач наших клиентов."}
          </p>
          {!items && (
            <MainButton className={styles.button} href="/">
              Подробнее
            </MainButton>
          )}
        </section>
      </div>
    </div>
  );
};

export default Hero;
