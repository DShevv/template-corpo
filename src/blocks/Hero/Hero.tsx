"use client";

import clsx from "clsx";
import styles from "./Hero.module.scss";
import heroImage from "@/assets/images/hero.png";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Image from "next/image";
import Header from "../Header/Header";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
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
    <div ref={heroRef} className={styles.wrapper}>
      <Header isTransparent isHidden={isHeaderHidden} />
      <div className="wrapper">
        <section className={styles.container}>
          <div className={styles.image}>
            <Image src={heroImage} alt="hero" />
          </div>
          <h1 className={clsx(styles.title, "h1")}>
            Создаем счастливое будущее для вас
          </h1>
          <p className={clsx("body-1", styles.description)}>
            Мы специализируемся в 11 отраслях в более чем 55 странах и регионах,
            предлагая инновационные решения для самых сложных задач наших
            клиентов.
          </p>
          <MainButton className={styles.button} href="/">
            Подробнее
          </MainButton>
        </section>
      </div>
    </div>
  );
};

export default Hero;
