import clsx from "clsx";
import styles from "./TextBlock.module.scss";
import { TextBlockT } from "@/types/types";

const TextBlock = ({
  content,
  className,
}: {
  content: TextBlockT["content"];
  className?: string;
}) => {
  return (
    <section className={clsx(styles.container, className)}>
      <div className={styles.caption}>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: content.text }}
        />
      </div>
    </section>
  );
};

export default TextBlock;
