import clsx from "clsx";
import styles from "./Footer.module.scss";
import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import {
  SvgInstagram,
  SvgTelegram,
  SvgViber,
  SvgWhatsApp,
} from "@/assets/icons/svgs";
import { headers } from "next/headers";
import { ContactsT, SettingsT } from "@/types/types";
import { getStoreUrl } from "@/services/base";
import { formatPhone } from "@/utils/helper";

const FooterClient = ({
  host,
  className,
  settings,
  contacts,
  storeUrl,
}: {
  host: string;
  className?: string;
  settings: SettingsT | null;
  contacts: ContactsT | null;
  storeUrl?: string;
}) => {
  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Logo image={`${storeUrl}/${settings?.logo}`} />
          <p className={clsx("body-2", styles.description)}>
            {contacts?.company_description}
          </p>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.links}>
            <div className={styles.col}>
              <div className={clsx("body-2", styles.title)}>Навигация</div>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Link href="/" className={clsx("body-3", styles.link)}>
                    Главная
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/about" className={clsx("body-3", styles.link)}>
                    О компании
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/news" className={clsx("body-3", styles.link)}>
                    Статьи
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link
                    href="/contacts"
                    className={clsx("body-3", styles.link)}
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.col}>
              <div className={clsx("body-2", styles.title)}>Услуги</div>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Link
                    href={`/services/special-effects`}
                    className={clsx("body-3", styles.link)}
                  >
                    Спецэффекты
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link
                    href={`/services/events`}
                    className={clsx("body-3", styles.link)}
                  >
                    Мероприятия
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.info}>
            {contacts?.phones && contacts.phones.length > 0 && (
              <div className={styles.item}>
                <div className={clsx("body-5", styles.itemTitle)}>Телефон</div>
                <Link
                  href={`tel:${contacts?.phones[0]}`}
                  className={clsx("body-2", styles.itemDescription)}
                >
                  {contacts?.phones[0]}
                  <span className="body-6">{contacts?.working_hours}</span>
                </Link>
              </div>
            )}
            <div className={styles.item}>
              <div className={clsx("body-5", styles.itemTitle)}>
                Мессенджеры
              </div>
              <div className={styles.social}>
                {contacts?.social_links.telegram && (
                  <Link
                    href={`https://t.me/${contacts?.social_links.telegram}`}
                    className={styles.socialItem}
                    aria-label="Telegram"
                  >
                    <SvgTelegram />
                  </Link>
                )}
                {contacts?.social_links.whatsapp && (
                  <Link
                    href={`https://wa.me/${formatPhone(
                      contacts?.social_links.whatsapp
                    )}`}
                    className={styles.socialItem}
                    aria-label="WhatsApp"
                  >
                    <SvgWhatsApp />
                  </Link>
                )}
                {contacts?.social_links.instagram && (
                  <Link
                    href={`https://www.instagram.com/${contacts?.social_links.instagram}`}
                    className={styles.socialItem}
                    aria-label="Instagram"
                  >
                    <SvgInstagram />
                  </Link>
                )}
                {contacts?.social_links.viber && (
                  <Link
                    href={`viber://chat?number=%2B${formatPhone(
                      contacts?.social_links.viber
                    )}`}
                    className={styles.socialItem}
                    aria-label="Viber"
                  >
                    <SvgViber />
                  </Link>
                )}
              </div>
            </div>
            {contacts?.address && (
              <div className={styles.item}>
                <div className={clsx("body-5", styles.itemTitle)}>Адрес</div>
                <div className={clsx("body-2", styles.itemDescription)}>
                  {contacts?.address}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={clsx("body-6", styles.copyright)}>
          © {new Date().getFullYear()} {host}
        </div>

        <Link href="/policy" className={clsx("body-6", styles.policy)}>
          Политика обработки персональных данных
        </Link>

        <div className={clsx("body-6", styles.dev)}>
          <span>Дизайн и разработка: </span>
          <Link href="https://web-space.by" target="_blank">
            Web-space.by
          </Link>
        </div>
      </div>
    </footer>
  );
};

async function Footer({
  className,
  contacts,
  settings,
}: {
  className?: string;
  contacts: Promise<ContactsT | null>;
  settings: Promise<SettingsT | null>;
}) {
  const [headersList, storeUrl] = await Promise.all([headers(), getStoreUrl()]);
  const host = headersList.get("host") || "site.com";

  const domain = host.split(":")[0];
  const [contactsData, settingsData] = await Promise.all([contacts, settings]);

  return (
    <FooterClient
      host={domain}
      className={className}
      contacts={contactsData}
      settings={settingsData}
      storeUrl={storeUrl}
    />
  );
}

export default Footer;
