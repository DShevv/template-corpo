"use client";
import clsx from "clsx";
import styles from "./OurAdvantages.module.scss";
import { advantages } from "@/data/dumpy-data";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const OurAdvantages = () => {
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
              src={advantage.image}
              alt={advantage.title}
              className={styles.image}
            />
            <div className={clsx("h5", styles.number)}>{index + 1}</div>
            <div className={clsx("h5", styles.title)}>
              {advantage.title.split(" ").map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </div>
            <p className={clsx("body-4", styles.description)}>
              {advantage.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurAdvantages;
