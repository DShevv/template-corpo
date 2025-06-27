"use client";

import clsx from "clsx";
import styles from "./Hero.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Image, { StaticImageData } from "next/image";
import Header from "../Header/Header";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type HeroProps = {
  image: StaticImageData | string;
  title: string;
  description: string;
};

const Hero = ({ image, title, description }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const pathname = usePathname();

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
            <Image src={image} alt="hero" />
          </div>
          <h1 className={clsx(styles.title, "h1")}>{title}</h1>
          <p className={clsx("body-1", styles.description)}>{description}</p>
          {pathname === "/" && (
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
