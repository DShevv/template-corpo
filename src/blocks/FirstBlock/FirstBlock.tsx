import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./FirstBlock.module.scss";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

const FirstBlock = ({
  image,
  items,
  title,
  description,
  date,
}: {
  title: string;
  description?: string;
  image: string | StaticImageData;
  items: { title: string; href: string }[];
  date?: string;
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.image}>
        <Image src={image} alt={`${title} фото`} />
      </div>
      <div className={styles.content}>
        <Breadcrumbs items={items} />
        {date && <p className={clsx(styles.date, "body-2")}>{date}</p>}
        <h1 className={clsx(styles.title, "h1")}>{title}</h1>
        {description && (
          <p className={clsx(styles.description, "body-1")}>{description}</p>
        )}
      </div>
    </section>
  );
};

export default FirstBlock;
