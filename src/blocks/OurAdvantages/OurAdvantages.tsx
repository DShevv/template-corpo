"use client";
import clsx from "clsx";
import styles from "./OurAdvantages.module.scss";
import { advantages as advantagesData } from "@/data/dumpy-data";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdvantageT } from "@/types/types";

type OurAdvantagesProps = {
  advantages: AdvantageT[];
};

const OurAdvantages = ({ advantages }: OurAdvantagesProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<HTMLElement[]>([]);

  const setRef = useCallback((el: HTMLElement | null, index: number) => {
    if (el) {
      itemRefs.current[index] = el;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const centerY = windowHeight / 2;

      itemRefs.current.forEach((item, index) => {
        if (item) {
          const rect = item.getBoundingClientRect();
          const itemCenterY = rect.top + rect.height / 2;

          if (
            itemCenterY >= centerY - rect.height / 2 &&
            itemCenterY <= centerY + rect.height / 2
          ) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!advantages || advantages.length === 0) return null;

  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>Наши преимущества</h2>

      <div className={styles.advantages}>
        {advantages.map((advantage, index) => (
          <div
            key={index}
            ref={(el) => setRef(el, index)}
            className={clsx(styles.advantage, {
              [styles.active]: activeIndex === index,
            })}
          >
            <Image
              src={advantagesData[index].image}
              alt={advantage.title}
              className={styles.image}
              width={190}
              height={190}
            />
            <div className={clsx("h5", styles.number)}>{index + 1}</div>
            <div className={clsx("h5", styles.title)}>
              {advantage.title.split(" ").map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </div>
            <p className={clsx("body-4", styles.description)}>
              {advantagesData[index].description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurAdvantages;
