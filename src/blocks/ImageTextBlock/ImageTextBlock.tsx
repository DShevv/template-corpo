import clsx from "clsx";
import styles from "./ImageTextBlock.module.scss";
import Image from "next/image";
import { getStoreUrl } from "@/services/base";
import { ImageTextBlockT } from "@/types/types";

const ImageTextBlock = ({
  images,
  content,
  className,
}: {
  images: ImageTextBlockT["images"];
  content: ImageTextBlockT["content"];
  className?: string;
}) => {
  const storeUrl = getStoreUrl();

  return (
    <section
      className={clsx(
        styles.container,
        styles[content.image_position],
        className
      )}
    >
      <div className={styles.caption}>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: content.text }}
        />
      </div>
      <div className={styles.images}>
        {content.image_path && (
          <Image
            src={`${storeUrl}/${content.image_path}`}
            alt={"Изображение"}
            className={styles.image}
            width={1920}
            height={1080}
          />
        )}
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
      </div>
    </section>
  );
};

export default ImageTextBlock;
