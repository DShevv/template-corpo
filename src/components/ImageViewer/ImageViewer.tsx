"use client";
import Image from "next/image";
import styles from "./ImageViewer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import globalStore from "@/stores/global-store";
import { useEffect } from "react";

const ImageViewer = observer(() => {
  const { popupStore } = globalStore;
  const { imageViewer, imageViewerData, closePopup } = popupStore;

  const handleClose = () => {
    closePopup("imageViewer");
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        popupStore.closePopup("imageViewer");
      }
    };

    if (imageViewer) {
    }

    if (imageViewer) {
      const scrollPosition = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.overflowY = "scroll";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.body.style.position = "";
        document.body.style.overflowY = "auto";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [imageViewer]);

  return (
    <div
      className={clsx(styles.overlay, { [styles.open]: imageViewer })}
      onClick={handleClose}
    >
      <div className={styles.content}>
        {imageViewerData && (
          <Image
            src={imageViewerData?.src || ""}
            alt={imageViewerData?.alt || ""}
            fill
          />
        )}
      </div>
    </div>
  );
});

ImageViewer.displayName = "ImageViewer";

export default ImageViewer;
