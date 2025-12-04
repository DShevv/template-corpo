import clsx from "clsx";
import styles from "./ImageBlock.module.scss";
import Image from "next/image";
import { getStoreUrl } from "@/services/base";
import { ImageBlockT, ImageT } from "@/types/types";

const ImageBlock = ({
  images,
  className,
  content,
}: {
  images: ImageT["images"];
  content: ImageBlockT["content"];
  className?: string;
}) => {
  const storeUrl = getStoreUrl();

  if (!images && !content?.image_path) {
    return null;
  }

  return (
    <section className={clsx(styles.container, className)}>
      {images &&
        images.map((image) => (
          <Image
            key={image.image_path}
            src={`${storeUrl}/${image.image_path}`}
            alt={"Изображение"}
            className={styles.image}
            width={1920}
            height={1080}
          />
        ))}
      {content?.image_path && (
        <Image
          src={`${storeUrl}/${content.image_path}`}
          alt={"Изображение"}
          className={styles.image}
          width={1920}
          height={1080}
        />
      )}
    </section>
  );
};

export default ImageBlock;
