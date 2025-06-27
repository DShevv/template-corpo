"use client";

import {
  SvgArrowRight,
  SvgInstagram,
  SvgMail,
  SvgPhone,
  SvgTelegram,
  SvgTime,
  SvgWhatsApp,
} from "@/assets/icons/svgs";
import styles from "./Header.module.scss";
import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import clsx from "clsx";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { services } from "@/data/dumpy-data";

const Header = observer(
  ({
    isTransparent = false,
    isHidden = false,
  }: {
    isTransparent?: boolean;
    isHidden?: boolean;
  }) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;

    return (
      <header
        className={clsx(styles.container, {
          [styles.transparent]: isTransparent,
          [styles.hidden]: isHidden,
        })}
      >
        <div className={styles.top}>
          <Logo className={styles.logo} />

          <ul className={styles.menu}>
            <li>
              <Link className={clsx(styles.link, "body-2")} href="/">
                Главная
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link className={clsx(styles.link, "body-2")} href="/services">
                Услуги <SvgArrowRight />
              </Link>
              <ul className={styles.subMenu}>
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      className={clsx(styles.link, "body-2")}
                      href={`/services/${service.slug}`}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link className={clsx(styles.link, "body-2")} href="/about">
                О компании
              </Link>
            </li>
            <li>
              <Link className={clsx(styles.link, "body-2")} href="/news">
                Статьи
              </Link>
            </li>
            <li>
              <Link className={clsx(styles.link, "body-2")} href="/contacts">
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.bottom}>
          <div className={styles.info}>
            <div className={clsx(styles.infoItem, "t-button-2")}>
              <div className={styles.icon}>
                <SvgTime />
              </div>
              <div className={styles.infoText}>Пн-пт с 09:00 по 18:00</div>
            </div>
            <Link
              className={clsx(styles.infoItem, "t-button-2")}
              href="mailto:info@example.com"
            >
              <div className={styles.icon}>
                <SvgMail />
              </div>
              <div className={styles.infoText}>info@example.com</div>
            </Link>
            <Link
              className={clsx(styles.infoItem, "t-button-2")}
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
            variant={isTransparent ? "secondary" : "primary"}
            onClick={() => openPopup("feedback")}
          >
            Обратный звонок
          </MainButton>

          <div className={styles.socials}>
            <Link
              href="https://t.me/example"
              target="_blank"
              aria-label="Telegram"
            >
              <SvgTelegram />
            </Link>
            <Link
              href="https://www.instagram.com/example"
              target="_blank"
              aria-label="Instagram"
            >
              <SvgInstagram />
            </Link>
            <Link
              href="https://wa.me/example"
              target="_blank"
              aria-label="WhatsApp"
            >
              <SvgWhatsApp />
            </Link>
          </div>
        </div>
      </header>
    );
  }
);

export default Header;
