"use client";
import clsx from "clsx";
import styles from "./MobileMenu.module.scss";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { use, useEffect, useState } from "react";
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
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { ContactsT, ServiceT } from "@/types/types";

const MobileMenu = observer(
  ({
    contacts,
    services,
  }: {
    contacts: Promise<ContactsT | null>;
    services: Promise<ServiceT[] | null>;
  }) => {
    const { popupStore } = globalStore;
    const { menu, closePopup, openPopup } = popupStore;
    const [isOpen, setIsOpen] = useState(false);
    const contactsData = use(contacts);
    const servicesData = use(services);
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
        <div className={styles.blur}></div>
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
            aria-label="Закрыть меню"
          />

          <m.ul className={styles.menu}>
            <li>
              <Link
                href="/"
                className={clsx(styles.link, "h5")}
                onClick={() => closePopup("menu")}
              >
                Главная
              </Link>
            </li>
            <li>
              <div
                className={clsx(styles.link, "h5")}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Link href="/services" onClick={() => closePopup("menu")}>
                  Услуги
                </Link>{" "}
                <SvgArrowRight
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
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
                    {servicesData?.map((service, index) => (
                      <li key={index}>
                        <Link
                          className={clsx(styles.subLink, "body-5")}
                          href={`/services/${service.slug}`}
                          onClick={() => closePopup("menu")}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </m.ul>
                )}
              </AnimatePresence>
            </li>
            <li>
              <Link
                href="/about"
                className={clsx(styles.link, "h5")}
                onClick={() => closePopup("menu")}
              >
                О компании
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className={clsx(styles.link, "h5")}
                onClick={() => closePopup("menu")}
              >
                Статьи
              </Link>
            </li>
            <li>
              <Link
                href="/contacts"
                className={clsx(styles.link, "h5")}
                onClick={() => closePopup("menu")}
              >
                Контакты
              </Link>
            </li>
          </m.ul>

          <div className={styles.bottom}>
            <div className={styles.info}>
              {contactsData?.working_hours && (
                <div className={clsx(styles.infoItem, "body-6")}>
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
                  className={clsx(styles.infoItem, "body-6")}
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
                  className={clsx(styles.infoItem, "body-6")}
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
              onClick={() => {
                openPopup("feedback");
                closePopup("menu");
              }}
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
        </div>
      </div>
    );
  }
);

export default MobileMenu;
