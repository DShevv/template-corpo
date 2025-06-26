import clsx from "clsx";
import styles from "./OtherCities.module.scss";
import cities from "@/assets/images/cities.png";
import Image from "next/image";
import { SvgLocation, SvgPhone, SvgTime } from "@/assets/icons/svgs";
import Link from "next/link";
import InlineButton from "@/components/Buttons/InlineButton/InlineButton";

const OtherCities = () => {
  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>
        Представительства в других городах
      </h2>

      <div className={styles.list}>
        <div className={styles.item}>
          <Image src={cities} alt="Города" className={styles.image} />
          <div className={styles.content}>
            <div className={clsx("h5", styles.title)}>г. Могилёв</div>
            <div className={styles.info}>
              <div className={styles.item}>
                <div className={clsx(styles.itemTitle, "body-4")}>
                  <SvgLocation /> Адрес:
                </div>
                <div className={clsx(styles.text, "body-2")}>
                  г. Могилёвул. Ленина, 1
                </div>
              </div>
              <div className={styles.item}>
                <div className={clsx(styles.itemTitle, "body-4")}>
                  <SvgTime /> Часы работы:
                </div>
                <div className={clsx(styles.text, "body-2")}>
                  10:00-20:00 <br /> без выходных
                </div>
              </div>
              <div className={styles.item}>
                <div className={clsx(styles.itemTitle, "body-4")}>
                  <SvgPhone /> Контакты:
                </div>
                <div className={clsx(styles.text, "body-2")}>
                  <Link href="tel:+375291234567" className={styles.link}>
                    +375 (29) 123-45-67
                  </Link>
                  <Link href="tel:+375291234567" className={styles.link}>
                    +375 (29) 123-45-67
                  </Link>
                </div>
              </div>

              <InlineButton className={styles.button}>
                Показать на карте
              </InlineButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherCities;
