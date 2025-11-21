import clsx from "clsx";
import styles from "./ImageTextBlock.module.scss";
import Image from "next/image";
import { getStoreUrl } from "@/services/base";
import { ImageTextBlockT } from "@/types/types";

const ImageTextBlock = ({
  content,
  className,
}: {
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
      <Image
        src={`${storeUrl}/${content.image_path}`}
        alt={content.text.split(" ").slice(0, 10).join(" ")}
        className={styles.image}
        width={1920}
        height={1080}
      />
    </section>
  );
};

export default ImageTextBlock;
