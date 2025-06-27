import Link from "next/link";
import styles from "./Breadcrumbs.module.scss";
import clsx from "clsx";
import { SvgArrowRight } from "@/assets/icons/svgs";

interface BreadcrumbsProps {
  items: { title: string; href: string }[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <div
      className={clsx(styles.container, className)}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {items.map((item, index) => (
        <div
          key={`${index}${item.title}`}
          className="body-4"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {items.length > index + 1 ? (
            <Link
              key={`${index}${item.title}`}
              href={item.href}
              className={clsx("body-4", styles.link)}
              itemProp="item"
            >
              {item.title}
            </Link>
          ) : (
            <div className={clsx("body-4", styles.link)} itemProp="item">
              {item.title}
            </div>
          )}
          {index < items.length - 1 && <SvgArrowRight />}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
