import clsx from "clsx";
import styles from "./FeatureBlock.module.scss";
import Image from "next/image";
import { getStoreUrl } from "@/services/base";
import { FeaturesImagesBlockT } from "@/types/types";

const FeatureBlock = ({
  content,
}: {
  content: FeaturesImagesBlockT["content"];
}) => {
  const storeUrl = getStoreUrl();

  return (
    <section className={clsx(styles.container)}>
      <div className={styles.caption}>
        <div className={clsx("h2", styles.title)}>{content.title}</div>
        <div className={styles.inner}>
          <div
            className={clsx("body-1", styles.text)}
            dangerouslySetInnerHTML={{ __html: content.text_primary }}
          />
          <div
            className={clsx("body-2", styles.text)}
            dangerouslySetInnerHTML={{ __html: content.text_secondary }}
          />
        </div>
      </div>
      <Image
        src={`${storeUrl}/${content.image_path}`}
        alt={content.title}
        className={styles.image}
        width={1920}
        height={1080}
      />
    </section>
  );
};

export default FeatureBlock;
