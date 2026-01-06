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
import { use, useState, useCallback } from "react";
import Image from "next/image";
import nanImage from "@/assets/images/nan.svg";
import { NewsResponse } from "@/types/api";
import flag from "@/assets/images/flag.jpg";
import sign from "@/assets/images/sign.png";

interface SubMenuPosition {
  top: number;
  isVisible: boolean;
}

const Header = observer(
  ({
    isTransparent = false,
    isHidden = false,
    contacts,
    settings,
    storeUrl,
    services,
    products,
    companyServices,
    news,
    isInverted = false,
  }: {
    isTransparent?: boolean;
    isHidden?: boolean;
    contacts: Promise<ContactsT | null>;
    settings: Promise<SettingsT | null>;
    storeUrl: string;
    services: Promise<ServiceT[] | null>;
    products: Promise<ServiceT[] | null>;
    companyServices: Promise<ServiceT[] | null>;
    news: Promise<NewsResponse | null>;
    isInverted?: boolean;
  }) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;
    const contactsData = use(contacts);
    const settingsData = use(settings);
    const servicesData = use(services);
    const productsData = use(products);
    const companyServicesData = use(companyServices);
    const newsData = use(news);

    const [subMenuPositions, setSubMenuPositions] = useState<
      Record<string, SubMenuPosition>
    >({
      products: { top: 0, isVisible: false },
      services: { top: 0, isVisible: false },
      company: { top: 0, isVisible: false },
    });

    const handleMouseEnter = useCallback(
      (key: string, event: React.MouseEvent<HTMLLIElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSubMenuPositions((prev) => ({
          ...prev,
          [key]: { top: rect.top, isVisible: true },
        }));
      },
      []
    );

    const handleMouseLeave = useCallback((key: string) => {
      setSubMenuPositions((prev) => ({
        ...prev,
        [key]: { ...prev[key], isVisible: false },
      }));
    }, []);

    return (
      <header
        className={clsx(styles.container, {
          [styles.transparent]: isTransparent,
          [styles.hidden]: isHidden,
        })}
      >
        <div className={styles.scrollWrapper}>
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
              <li
                className={styles.menuItem}
                onMouseEnter={(e) => handleMouseEnter("products", e)}
                onMouseLeave={() => handleMouseLeave("products")}
              >
                <Link className={clsx(styles.link, "body-2")} href="/products">
                  Продукция <SvgArrowRight />
                </Link>
                <ul
                  className={clsx(styles.subMenu, {
                    [styles.visible]: subMenuPositions.products.isVisible,
                  })}
                  style={{ top: subMenuPositions.products.top }}
                >
                  {productsData?.map((product, index) => (
                    <li key={index}>
                      <Link
                        className={clsx(styles.link, "body-2")}
                        href={`/products/${product.slug}`}
                      >
                        {product.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li
                className={styles.menuItem}
                onMouseEnter={(e) => handleMouseEnter("services", e)}
                onMouseLeave={() => handleMouseLeave("services")}
              >
                <Link className={clsx(styles.link, "body-2")} href="/services">
                  Услуги <SvgArrowRight />
                </Link>
                <ul
                  className={clsx(styles.subMenu, {
                    [styles.visible]: subMenuPositions.services.isVisible,
                  })}
                  style={{ top: subMenuPositions.services.top }}
                >
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
              <li
                className={styles.menuItem}
                onMouseEnter={(e) => handleMouseEnter("company", e)}
                onMouseLeave={() => handleMouseLeave("company")}
              >
                <Link className={clsx(styles.link, "body-2")} href="/about">
                  Компания <SvgArrowRight />
                </Link>
                <ul
                  className={clsx(styles.subMenu, {
                    [styles.visible]: subMenuPositions.company.isVisible,
                  })}
                  style={{ top: subMenuPositions.company.top }}
                >
                  {companyServicesData?.map((companyService, index) => (
                    <li key={index}>
                      <Link
                        className={clsx(styles.link, "body-2")}
                        href={`/about/${companyService.slug}`}
                      >
                        {companyService.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {newsData && newsData.data.length > 0 && (
                <li>
                  <Link className={clsx(styles.link, "body-2")} href="/news">
                    Новости
                  </Link>
                </li>
              )}
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
                  <div className={styles.infoText}>
                    {contactsData?.phones[0]}
                  </div>
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

            <Image
              src={nanImage}
              alt="logo"
              width={256}
              height={58}
              className={clsx(styles.nan, { [styles.inverted]: isInverted })}
            />

            <div className={styles.flags}>
              <Image src={flag} alt="flag" width={256} height={58} />
              <Image src={sign} alt="sign" width={256} height={58} />
            </div>

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
        </div>
      </header>
    );
  }
);

export default Header;
