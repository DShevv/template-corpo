import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./FirstBlock.module.scss";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import { getContentPageBySlug } from "@/services/ContentPagesService";
import { getStoreUrl } from "@/services/base";

const FirstBlock = async ({
  image,
  items,
  title,
  description,
  date,
  page,
}: {
  title: string;
  description?: string;
  image: string | StaticImageData;
  items: { title: string; href: string }[];
  date?: string;
  page?: string;
}) => {
  const storeUrl = getStoreUrl();
  const pageData = page ? await getContentPageBySlug(page) : null;

  return (
    <section data-first-block className={styles.container}>
      <div className={styles.image}>
        <Image
          src={pageData ? `${storeUrl}/${pageData.fields.image.path}` : image}
          alt={`${title} фото`}
          width={1920}
          height={1080}
        />
      </div>
      <div className={styles.content}>
        <Breadcrumbs items={items} />
        {date && <p className={clsx(styles.date, "body-2")}>{date}</p>}
        <h1 className={clsx(styles.title, "h1")}>{pageData?.title || title}</h1>
        {pageData?.fields.subtitle.html && (
          <p
            className={clsx(styles.description, "body-1")}
            dangerouslySetInnerHTML={{
              __html: pageData.fields.subtitle.html || description || "",
            }}
          />
        )}
      </div>
    </section>
  );
};

export default FirstBlock;
