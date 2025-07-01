"use client";

import styles from "./HeaderMobile.module.scss";
import Logo from "@/components/Logo/Logo";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { SvgMail, SvgMenu, SvgPhone } from "@/assets/icons/svgs";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { ContactsT, SettingsT } from "@/types/types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const HeaderMobile = observer(
  ({ contacts, settings }: { contacts?: ContactsT; settings?: SettingsT }) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;
    const [isOverFirstBlock, setIsOverFirstBlock] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
      setIsOverFirstBlock(false);

      let observer: IntersectionObserver | null = null;

      const timer = setTimeout(() => {
        const firstBlock =
          document.querySelector("[data-first-block]") ||
          document.querySelector("section") ||
          document.querySelector("main > *:first-child");

        if (!firstBlock) return;

        const header = document.querySelector(
          'header[class*="HeaderMobile"]'
        ) as HTMLElement;
        const headerHeight = header ? header.offsetHeight : 58;

        observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            setIsOverFirstBlock(!entry.isIntersecting);
          },
          {
            threshold: 0,
            rootMargin: `-${headerHeight}px 0px 0px 0px`,
          }
        );

        observer.observe(firstBlock);
      }, 100);

      return () => {
        clearTimeout(timer);
        if (observer) {
          observer.disconnect();
        }
      };
    }, [pathname]);

    return (
      <header
        className={clsx(styles.header, {
          [styles.headerScrolled]: isOverFirstBlock,
        })}
      >
        <Logo
          className={styles.logo}
          image={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${settings?.logo}`}
        />

        <div className={styles.buttons}>
          {contacts?.email && (
            <IconButton
              icon={<SvgMail />}
              type="link"
              href={`mailto:${contacts?.email}`}
              aria-label="Написать на почту"
              className={styles.button}
            />
          )}
          {contacts?.phones && contacts.phones.length > 0 && (
            <IconButton
              icon={<SvgPhone />}
              type="link"
              href={`tel:${contacts?.phones[0]}`}
              aria-label="Позвонить"
              className={styles.button}
            />
          )}
          <IconButton
            icon={<SvgMenu />}
            onClick={() => openPopup("menu")}
            aria-label="Открыть меню"
            className={styles.button}
          />
        </div>
      </header>
    );
  }
);

export default HeaderMobile;
