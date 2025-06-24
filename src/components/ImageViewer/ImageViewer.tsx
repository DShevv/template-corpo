"use client";
import Image from "next/image";
import styles from "./ImageViewer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { useEffect } from "react";

const ImageViewer = observer(() => {
  const { popupStore } = globalStore;

  const handleClose = () => {
    popupStore.closePopup("imageViewer");
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        popupStore.closePopup("imageViewer");
      }
    };

    if (popupStore.imageViewer) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [popupStore.imageViewer, popupStore]);

  if (!popupStore.imageViewer || !popupStore.imageViewerData) {
    return null;
  }

  return (
    <div
      className={clsx(styles.overlay, popupStore.imageViewer && styles.open)}
      onClick={handleClose}
    >
      <div className={styles.content}>
        <Image
          src={popupStore.imageViewerData.src}
          alt={popupStore.imageViewerData.alt}
          fill
        />
      </div>
    </div>
  );
});

ImageViewer.displayName = "ImageViewer";

export default ImageViewer;
