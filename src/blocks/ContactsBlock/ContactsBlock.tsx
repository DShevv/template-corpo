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
import { ContactsT } from "@/types/types";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";

const ContactsBlock = observer(
  ({
    isStandalone,
    className,
    contacts,
    logo,
  }: {
    isStandalone?: boolean;
    className?: string;
    contacts?: ContactsT;
    logo: string;
  }) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;

    if (!contacts) return null;

    return (
      <section className={clsx(styles.container, className)}>
        <h2 className={clsx("h2", styles.title)}>
          {isStandalone ? contacts?.address : "Адрес компании"}
        </h2>

        <div className={styles.info}>
          {!isStandalone && (
            <div className={styles.item}>
              <div className={styles.icon}>
                <SvgAddress />
              </div>
              <div className={clsx("body-2", styles.text)}>
                {contacts?.address}
              </div>
            </div>
          )}
          {contacts?.phones && contacts.phones.length > 0 && (
            <Link href={`tel:${contacts?.phones[0]}`} className={styles.item}>
              <div className={styles.icon}>
                <SvgPhone />
              </div>
              <div className={clsx("body-2", styles.text)}>
                {contacts?.phones[0]}
                <span className="body-4">{contacts?.working_hours}</span>
              </div>
            </Link>
          )}
          {contacts?.email && (
            <Link href={`mailto:${contacts?.email}`} className={styles.item}>
              <div className={styles.icon}>
                <SvgMail />
              </div>
              <div className={clsx("body-2", styles.text)}>
                {contacts?.email}
              </div>
            </Link>
          )}

          <div className={styles.socials}>
            {contacts?.social_links.telegram && (
              <Link
                href={`https://t.me/${contacts?.social_links.telegram}`}
                target="_blank"
                className={styles.social}
              >
                <SvgTelegram />
              </Link>
            )}
            {contacts?.social_links.whatsapp && (
              <Link
                href={`https://wa.me/${contacts?.social_links.whatsapp}`}
                target="_blank"
                className={styles.social}
              >
                <SvgWhatsApp />
              </Link>
            )}
            {contacts?.social_links.instagram && (
              <Link
                href={`https://www.instagram.com/${contacts?.social_links.instagram}`}
                target="_blank"
                className={styles.social}
              >
                <SvgInstagram />
              </Link>
            )}
          </div>

          {isStandalone && (
            <MainButton variant="white" onClick={() => openPopup("feedback")}>
              Обратный звонок
            </MainButton>
          )}
        </div>
        <Map address={contacts?.address || ""} logo={logo} />
      </section>
    );
  }
);

export default ContactsBlock;
