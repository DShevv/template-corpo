"use client";

import styles from "./HeaderMobile.module.scss";
import Logo from "@/components/Logo/Logo";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { SvgMail, SvgMenu, SvgPhone } from "@/assets/icons/svgs";
import IconButton from "@/components/Buttons/IconButton/IconButton";
import { ContactsT, SettingsT } from "@/types/types";

const HeaderMobile = observer(
  ({ contacts, settings }: { contacts?: ContactsT; settings?: SettingsT }) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;

    return (
      <header className={styles.header}>
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
            />
          )}
          {contacts?.phones && contacts.phones.length > 0 && (
            <IconButton
              icon={<SvgPhone />}
              type="link"
              href={`tel:${contacts?.phones[0]}`}
              aria-label="Позвонить"
            />
          )}
          <IconButton
            icon={<SvgMenu />}
            onClick={() => openPopup("menu")}
            aria-label="Открыть меню"
          />
        </div>
      </header>
    );
  }
);

export default HeaderMobile;
