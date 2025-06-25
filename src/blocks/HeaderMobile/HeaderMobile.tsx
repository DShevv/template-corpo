"use client";

import styles from "./HeaderMobile.module.scss";
import Logo from "@/components/Logo/Logo";

import clsx from "clsx";

import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { SvgMail, SvgMenu, SvgPhone } from "@/assets/icons/svgs";
import IconButton from "@/components/Buttons/IconButton/IconButton";

const Header = observer(() => {
  const { popupStore } = globalStore;
  const { openPopup } = popupStore;

  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />

      <div className={styles.buttons}>
        <IconButton
          icon={<SvgMail />}
          type="link"
          href="mailto:info@global-group.ru"
        />
        <IconButton icon={<SvgPhone />} type="link" href="tel:+375999999999" />
        <IconButton icon={<SvgMenu />} onClick={() => openPopup("menu")} />
      </div>
    </header>
  );
});

export default Header;
