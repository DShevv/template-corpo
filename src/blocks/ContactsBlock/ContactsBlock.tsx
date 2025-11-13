"use client";
import clsx from "clsx";
import styles from "./ContactsBlock.module.scss";
import Map from "@/components/Map/Map";
import {
  SvgAddress,
  SvgInstagram,
  SvgMail,
  SvgPhone,
  SvgTelegram,
  SvgWhatsApp,
} from "@/assets/icons/svgs";
import Link from "next/link";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { ContactsT, SettingsT } from "@/types/types";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { use } from "react";

const ContactsBlock = observer(
  ({
    isStandalone,
    className,
    contacts,
    settings,
    storeUrl,
  }: {
    isStandalone?: boolean;
    className?: string;
    contacts: Promise<ContactsT | null>;
    settings: Promise<SettingsT | null>;
    storeUrl: string;
  }) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;
    const contactsData = use(contacts);
    const settingsData = use(settings);
    if (!contactsData) return null;

    return (
      <section className={clsx(styles.container, className)}>
        <h2 className={clsx("h2", styles.title)}>
          {isStandalone ? contactsData?.address : "Адрес компании"}
        </h2>

        <div className={styles.info}>
          {!isStandalone && (
            <div className={styles.item}>
              <div className={styles.icon}>
                <SvgAddress />
              </div>
              <div className={clsx("body-2", styles.text)}>
                {contactsData?.address}
              </div>
            </div>
          )}
          {contactsData?.phones && contactsData.phones.length > 0 && (
            <Link
              href={`tel:${contactsData?.phones[0]}`}
              className={styles.item}
            >
              <div className={styles.icon}>
                <SvgPhone />
              </div>
              <div className={clsx("body-2", styles.text)}>
                {contactsData?.phones[0]}
                <span className="body-4">{contactsData?.working_hours}</span>
              </div>
            </Link>
          )}
          {contactsData?.email && (
            <Link
              href={`mailto:${contactsData?.email}`}
              className={styles.item}
            >
              <div className={styles.icon}>
                <SvgMail />
              </div>
              <div className={clsx("body-2", styles.text)}>
                {contactsData?.email}
              </div>
            </Link>
          )}

          <div className={styles.socials}>
            {contactsData?.social_links.telegram && (
              <Link
                href={`https://t.me/${contactsData?.social_links.telegram}`}
                target="_blank"
                className={styles.social}
              >
                <SvgTelegram />
              </Link>
            )}
            {contactsData?.social_links.whatsapp && (
              <Link
                href={`https://wa.me/${contactsData?.social_links.whatsapp}`}
                target="_blank"
                className={styles.social}
              >
                <SvgWhatsApp />
              </Link>
            )}
            {contactsData?.social_links.instagram && (
              <Link
                href={`https://www.instagram.com/${contactsData?.social_links.instagram}`}
                target="_blank"
                className={styles.social}
              >
                <SvgInstagram />
              </Link>
            )}
          </div>

          {isStandalone && (
            <MainButton onClick={() => openPopup("feedback")}>
              Обратный звонок
            </MainButton>
          )}
        </div>
        <Map
          address={contactsData?.address || ""}
          logo={`${storeUrl}/${settingsData?.logo}`}
        />
      </section>
    );
  }
);

export default ContactsBlock;
