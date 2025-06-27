import clsx from "clsx";
import styles from "./Footer.module.scss";
import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import { SvgInstagram, SvgTelegram, SvgWhatsApp } from "@/assets/icons/svgs";
import { headers } from "next/headers";

const FooterClient = ({
  host,
  className,
}: {
  host: string;
  className?: string;
}) => {
  return (
    <footer className={clsx(styles.footer, className)}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Logo />
          <p className={clsx("body-2", styles.description)}>
            Корпоративный сайт для компании
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
                    О компании
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
                  <Link href="/" className={clsx("body-3", styles.link)}>
                    Услуга 1
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/" className={clsx("body-3", styles.link)}>
                    Услуга 2
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/" className={clsx("body-3", styles.link)}>
                    Услуга 3
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href="/" className={clsx("body-3", styles.link)}>
                    Услуга 4
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.item}>
              <div className={clsx("body-5", styles.itemTitle)}>Телефон</div>
              <Link
                href="tel:+375291234567"
                className={clsx("body-2", styles.itemDescription)}
              >
                +375 (29) 123-45-67
                <span className="body-6">10:00-20:00 без выходных</span>
              </Link>
            </div>
            <div className={styles.item}>
              <div className={clsx("body-5", styles.itemTitle)}>
                Мессенджеры
              </div>
              <div className={styles.social}>
                <Link
                  href="https://t.me/example"
                  className={styles.socialItem}
                  aria-label="Telegram"
                >
                  <SvgTelegram />
                </Link>
                <Link
                  href="https://t.me/example"
                  className={styles.socialItem}
                  aria-label="Instagram"
                >
                  <SvgInstagram />
                </Link>
                <Link
                  href="https://wa.me/example"
                  className={styles.socialItem}
                  aria-label="WhatsApp"
                >
                  <SvgWhatsApp />
                </Link>
              </div>
            </div>
            <div className={styles.item}>
              <div className={clsx("body-5", styles.itemTitle)}>Адрес</div>
              <div className={clsx("body-2", styles.itemDescription)}>
                г. Минск, пр-т Независимости, 1, оф. 111
              </div>
            </div>
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

async function Footer({ className }: { className?: string }) {
  const headersList = await headers();
  const host = headersList.get("host") || "site.com";

  const domain = host.split(":")[0];

  return <FooterClient host={domain} className={className} />;
}

export default Footer;
