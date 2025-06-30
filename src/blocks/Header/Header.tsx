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
import { ContactsT, SettingsT } from "@/types/types";

const Header = observer(
  ({
    isTransparent = false,
    isHidden = false,
    contacts,
    settings,
  }: {
    isTransparent?: boolean;
    isHidden?: boolean;
    contacts?: ContactsT;
    settings?: SettingsT;
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
          <Logo
            className={styles.logo}
            image={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${settings?.logo}`}
          />

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
            {contacts?.working_hours && (
              <div className={clsx(styles.infoItem, "t-button-2")}>
                <div className={styles.icon}>
                  <SvgTime />
                </div>
                <div className={styles.infoText}>{contacts?.working_hours}</div>
              </div>
            )}
            {contacts?.email && (
              <Link
                className={clsx(styles.infoItem, "t-button-2")}
                href={`mailto:${contacts?.email}`}
              >
                <div className={styles.icon}>
                  <SvgMail />
                </div>
                <div className={styles.infoText}>{contacts?.email}</div>
              </Link>
            )}
            {contacts?.phones && contacts.phones.length > 0 && (
              <Link
                className={clsx(styles.infoItem, "t-button-2")}
                href={`tel:${contacts?.phones[0]}`}
              >
                <div className={styles.icon}>
                  <SvgPhone />
                </div>
                <div className={styles.infoText}>{contacts?.phones[0]}</div>
              </Link>
            )}
          </div>
          <MainButton
            className={styles.button}
            variant={isTransparent ? "secondary" : "primary"}
            onClick={() => openPopup("feedback")}
          >
            Обратный звонок
          </MainButton>

          <div className={styles.socials}>
            {contacts?.social_links.telegram && (
              <Link
                href={`https://t.me/${contacts?.social_links.telegram}`}
                target="_blank"
                aria-label="Telegram"
              >
                <SvgTelegram />
              </Link>
            )}
            {contacts?.social_links.instagram && (
              <Link
                href={`https://www.instagram.com/${contacts?.social_links.instagram}`}
                target="_blank"
                aria-label="Instagram"
              >
                <SvgInstagram />
              </Link>
            )}
            {contacts?.social_links.whatsapp && (
              <Link
                href={`https://wa.me/${contacts?.social_links.whatsapp}`}
                target="_blank"
                aria-label="WhatsApp"
              >
                <SvgWhatsApp />
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }
);

export default Header;
