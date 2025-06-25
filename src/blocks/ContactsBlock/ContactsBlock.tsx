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

const ContactsBlock = () => {
  return (
    <section className={styles.container}>
      <h2 className={clsx("h2", styles.title)}>Адрес компании</h2>

      <div className={styles.info}>
        <div className={styles.item}>
          <div className={styles.icon}>
            <SvgAddress />
          </div>
          <div className={clsx("body-2", styles.text)}>
            г. Минск, пр-т Независимости, 1, оф. 111
          </div>
        </div>
        <Link href="tel:+375291234567" className={styles.item}>
          <div className={styles.icon}>
            <SvgPhone />
          </div>
          <div className={clsx("body-2", styles.text)}>
            +375 (29) 123-45-67
            <span className="body-4">10:00-20:00 без выходных</span>
          </div>
        </Link>
        <Link href="mailto:info@example.com" className={styles.item}>
          <div className={styles.icon}>
            <SvgMail />
          </div>
          <div className={clsx("body-2", styles.text)}>info@example.com</div>
        </Link>

        <div className={styles.socials}>
          <Link
            href="https://t.me/example"
            target="_blank"
            className={styles.social}
          >
            <SvgTelegram />
          </Link>
          <Link
            href="https://t.me/example"
            target="_blank"
            className={styles.social}
          >
            <SvgWhatsApp />
          </Link>
          <Link
            href="https://t.me/example"
            target="_blank"
            className={styles.social}
          >
            <SvgInstagram />
          </Link>
        </div>
      </div>
      <Map address="г. Минск, пр-т Независимости, 1" />
    </section>
  );
};

export default ContactsBlock;
