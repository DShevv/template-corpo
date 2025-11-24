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
import { ContactsT, ServiceT, SettingsT } from "@/types/types";
import { use } from "react";

const Header = observer(
  ({
    isTransparent = false,
    isHidden = false,
    contacts,
    settings,
    storeUrl,
    services,
    isInverted = false,
  }: {
    isTransparent?: boolean;
    isHidden?: boolean;
    contacts: Promise<ContactsT | null>;
    settings: Promise<SettingsT | null>;
    storeUrl: string;
    services: Promise<ServiceT[] | null>;
    isInverted?: boolean;
  }) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;
    const contactsData = use(contacts);
    const settingsData = use(settings);
    const servicesData = use(services);
    return (
      <header
        className={clsx(styles.container, {
          [styles.transparent]: isTransparent,
          [styles.hidden]: isHidden,
        })}
      >
        <div className={styles.top}>
          <Logo
            className={clsx(styles.logo, { [styles.inverted]: isInverted })}
            image={`${storeUrl}/${settingsData?.logo}`}
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
                {servicesData?.map((service, index) => (
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
            {contactsData?.working_hours && (
              <div className={clsx(styles.infoItem, "t-button-2")}>
                <div className={styles.icon}>
                  <SvgTime />
                </div>
                <div className={styles.infoText}>
                  {contactsData?.working_hours}
                </div>
              </div>
            )}
            {contactsData?.email && (
              <Link
                className={clsx(styles.infoItem, "t-button-2")}
                href={`mailto:${contactsData?.email}`}
              >
                <div className={styles.icon}>
                  <SvgMail />
                </div>
                <div className={styles.infoText}>{contactsData?.email}</div>
              </Link>
            )}
            {contactsData?.phones && contactsData.phones.length > 0 && (
              <Link
                className={clsx(styles.infoItem, "t-button-2")}
                href={`tel:${contactsData?.phones[0]}`}
              >
                <div className={styles.icon}>
                  <SvgPhone />
                </div>
                <div className={styles.infoText}>{contactsData?.phones[0]}</div>
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
            {contactsData?.social_links.telegram && (
              <Link
                href={`https://t.me/${contactsData?.social_links.telegram}`}
                target="_blank"
                aria-label="Telegram"
              >
                <SvgTelegram />
              </Link>
            )}
            {contactsData?.social_links.instagram && (
              <Link
                href={`https://www.instagram.com/${contactsData?.social_links.instagram}`}
                target="_blank"
                aria-label="Instagram"
              >
                <SvgInstagram />
              </Link>
            )}
            {contactsData?.social_links.whatsapp && (
              <Link
                href={`https://wa.me/${contactsData?.social_links.whatsapp}`}
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
