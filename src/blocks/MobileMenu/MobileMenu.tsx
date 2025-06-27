"use client";
import clsx from "clsx";
import styles from "./MobileMenu.module.scss";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { useEffect, useState } from "react";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import {
  SvgArrowRight,
  SvgClose,
  SvgPhone,
  SvgMail,
  SvgTime,
  SvgWhatsApp,
  SvgTelegram,
  SvgInstagram,
} from "@/assets/icons/svgs";
import Link from "next/link";
import { AnimatePresence, motion as m } from "motion/react";
import { services } from "@/data/dumpy-data";
import MainButton from "@/components/Buttons/MainButton/MainButton";

const MobileMenu = observer(() => {
  const { popupStore } = globalStore;
  const { menu, closePopup, openPopup } = popupStore;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (menu) {
      const scrollPosition = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.overflowY = "scroll";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.overflowY = "auto";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [menu]);

  return (
    <div
      className={clsx(styles.wrapper, { [styles.active]: menu })}
      onClick={() => closePopup("menu")}
    >
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <IconButton
          className={styles.close}
          onClick={() => closePopup("menu")}
          icon={<SvgClose />}
        />

        <m.ul layout className={styles.menu}>
          <li>
            <Link href="/" className={clsx(styles.link, "h5")}>
              Главная
            </Link>
          </li>
          <m.li layout>
            <div
              className={clsx(styles.link, "h5")}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link href="/services">Услуги</Link>{" "}
              <SvgArrowRight
                style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              />
            </div>
            <AnimatePresence>
              {isOpen && (
                <m.ul
                  layout
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={styles.subMenu}
                >
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        className={clsx(styles.subLink, "body-5")}
                        href={`/services/${service.slug}`}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </m.ul>
              )}
            </AnimatePresence>
          </m.li>
          <li>
            <Link href="/about" className={clsx(styles.link, "h5")}>
              О компании
            </Link>
          </li>
          <li>
            <Link href="/news" className={clsx(styles.link, "h5")}>
              Статьи
            </Link>
          </li>
          <li>
            <Link href="/contacts" className={clsx(styles.link, "h5")}>
              Контакты
            </Link>
          </li>
        </m.ul>

        <div className={styles.bottom}>
          <div className={styles.info}>
            <div className={clsx(styles.infoItem, "body-6")}>
              <div className={styles.icon}>
                <SvgTime />
              </div>
              <div className={styles.infoText}>
                Пн-пт <br /> с 09:00 по 18:00
              </div>
            </div>
            <Link
              className={clsx(styles.infoItem, "body-6")}
              href="mailto:info@example.com"
            >
              <div className={styles.icon}>
                <SvgMail />
              </div>
              <div className={styles.infoText}>info@example.com</div>
            </Link>
            <Link
              className={clsx(styles.infoItem, "body-6")}
              href="tel:+79999999999"
            >
              <div className={styles.icon}>
                <SvgPhone />
              </div>
              <div className={styles.infoText}>+375 (99) 999-99-99</div>
            </Link>
          </div>
          <MainButton
            className={styles.button}
            onClick={() => openPopup("feedback")}
          >
            Обратный звонок
          </MainButton>

          <div className={styles.socials}>
            <Link href="https://t.me/example" target="_blank">
              <SvgTelegram />
            </Link>
            <Link href="https://www.instagram.com/example" target="_blank">
              <SvgInstagram />
            </Link>
            <Link href="https://wa.me/example" target="_blank">
              <SvgWhatsApp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MobileMenu;
