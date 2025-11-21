import clsx from "clsx";
import styles from "./ImageBlock.module.scss";
import Image from "next/image";
import { getStoreUrl } from "@/services/base";
import { ImageBlockT } from "@/types/types";

const ImageBlock = ({
  content,
  className,
}: {
  content: ImageBlockT["content"];
  className?: string;
}) => {
  const storeUrl = getStoreUrl();

  return (
    <section className={clsx(styles.container, className)}>
      <Image
        src={`${storeUrl}/${content.image_path}`}
        alt={"Изображение"}
        className={styles.image}
        width={1920}
        height={1080}
      />
    </section>
  );
};

export default ImageBlock;
