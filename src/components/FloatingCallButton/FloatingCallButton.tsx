"use client";
import { observer } from "mobx-react-lite";
import Lottie from "lottie-react";
import globalStore from "@/stores/global-store";
import phoneAnimation from "@/assets/phone-animation.json";
import styles from "./FloatingCallButton.module.scss";
import { Suspense } from "react";

const FloatingCallButton = observer(() => {
  const { popupStore } = globalStore;

  const handleClick = () => {
    popupStore.openPopup("feedback");
  };

  return (
    <button
      className={styles.floatingButton}
      onClick={handleClick}
      type="button"
      aria-label="Заказать обратный звонок"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Lottie
          animationData={phoneAnimation}
          className={styles.phone}
          loop={true}
          autoplay={true}
        />
      </Suspense>
    </button>
  );
});

export default FloatingCallButton;
