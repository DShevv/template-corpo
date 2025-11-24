"use client";

import {
  SvgArrowRight,
  SvgInstagram,
  SvgTelegram,
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
import { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

const Header = observer(
  ({
    isTransparent = false,
    isHidden = false,
    contacts,
    settings,
    storeUrl,
    services,
  }: {
    isTransparent?: boolean;
    isHidden?: boolean;
    contacts: Promise<ContactsT | null>;
    settings: Promise<SettingsT | null>;
    storeUrl: string;
    services: Promise<ServiceT[] | null>;
  }) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;
    const contactsData = use(contacts);
    const settingsData = use(settings);
    const servicesData = use(services);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 100);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <header
        className={clsx(styles.container, {
          [styles.transparent]: isTransparent,
          [styles.hidden]: isHidden,
          [styles.scrolled]: isScrolled,
        })}
      >
        <div className={styles.inner}>
          <div className={styles.top}>
            <Logo
              className={styles.logo}
              image={`${storeUrl}/${settingsData?.logo}`}
            />

            <ul className={styles.menu}>
              <li className={styles.menuItem}>
                <Link className={clsx(styles.link, "body-2")} href="/services">
                  Каталог <SvgArrowRight />
                </Link>
                <ul className={styles.subMenu}>
                  <li>
                    <Link
                      className={clsx(styles.link, "body-2")}
                      href="/services/special-effects"
                    >
                      Спецэффекты
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={clsx(styles.link, "body-2")}
                      href="/services/events"
                    >
                      Мероприятия
                    </Link>
                  </li>
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

              {contactsData?.phones && contactsData.phones.length > 0 && (
                <Link
                  href={`tel:${contactsData?.phones[0]}`}
                  className={styles.infoItem}
                >
                  <div className={clsx("body-2", styles.infoText)}>
                    {contactsData?.phones[0]}
                    <span className="body-4">
                      {contactsData?.working_hours}
                    </span>
                  </div>
                </Link>
              )}
              <MainButton
                className={styles.button}
                variant={isTransparent ? "secondary" : "primary"}
                onClick={() => openPopup("feedback")}
              >
                Обратный звонок
              </MainButton>
            </div>
          </div>
        </div>
        <Swiper className={styles.swiper} slidesPerView={"auto"}>
          {servicesData?.map((service) => (
            <SwiperSlide key={service.id} className={styles.slide}>
              <Link
                href={`/services/special-effects/${service.slug}`}
                className={styles.sliderLink}
              >
                {service.icon_path && (
                  <Image
                    src={`${storeUrl}/${service.icon_path}`}
                    alt={service.title}
                    width={24}
                    height={24}
                  />
                )}
                <div className={clsx("t-button-2", styles.sliderText)}>
                  {service.title}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>
    );
  }
);

export default Header;
