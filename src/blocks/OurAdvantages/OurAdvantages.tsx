"use client";
import clsx from "clsx";
import styles from "./OurAdvantages.module.scss";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { AdvantageT } from "@/types/types";
import { faIconsMap } from "@/assets/fa-icons";

type OurAdvantagesProps = {
  advantages: Promise<AdvantageT[]>;
};

const OurAdvantages = ({ advantages }: OurAdvantagesProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemRefs = useRef<HTMLElement[]>([]);
  const advantagesData = use(advantages);
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

  if (!advantagesData || advantagesData.length === 0) return null;

  return (
    <section className={styles.container}>
      <div className={clsx("h2", styles.title)}>Наши преимущества</div>

      <div className={styles.advantages}>
        {advantagesData &&
          advantagesData.length > 0 &&
          advantagesData.slice(0, 4).map((advantage, index) => {
            const Icon =
              faIconsMap[
                advantage.icon.replace("fas ", "") as keyof typeof faIconsMap
              ];

            return (
              <div
                key={index}
                ref={(el) => setRef(el, index)}
                className={clsx(styles.advantage, {
                  [styles.active]: activeIndex === index,
                })}
              >
                {/* <Image
              src={advantagesData[index].image}
              alt={advantage.title}
              className={styles.image}
              width={190}
              height={190}
            /> */}
                <Icon className={styles.image} />
                <div className={clsx("h5", styles.number)}>{index + 1}</div>
                <div className={clsx("h5", styles.title)}>
                  <span>{advantage.title.split(" ")[0]} </span>
                  {advantage.title.split(" ").slice(1).join(" ")}
                </div>
                <p className={clsx("body-4", styles.description)}>
                  {advantage.description}
                </p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default OurAdvantages;
