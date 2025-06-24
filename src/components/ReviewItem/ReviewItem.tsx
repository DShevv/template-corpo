"use client";
import Image, { StaticImageData } from "next/image";
import styles from "./ReviewItem.module.scss";
import clsx from "clsx";
import globalStore from "@/stores/global-store";

interface ReviewItemProps {
  className?: string;
  image: string | StaticImageData;
  title: string;
}

const ReviewItem = ({ className, image, title }: ReviewItemProps) => {
  const handleImageClick = () => {
    globalStore.popupStore.openPopup("imageViewer", { src: image, alt: title });
  };

  return (
    <div className={clsx(styles.container, className)}>
      <Image
        src={image}
        alt={title}
        width={304}
        height={400}
        className={styles.image}
        onClick={handleImageClick}
      />
    </div>
  );
};

export default ReviewItem;
