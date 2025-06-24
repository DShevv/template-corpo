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
    <div className={clsx(styles.container, className)}>
      {items.map((item, index) => (
        <div key={`${index}${item.title}`} className="body-4">
          {items.length > index + 1 ? (
            <Link
              key={`${index}${item.title}`}
              href={item.href}
              className={clsx("body-4", styles.link)}
            >
              {item.title}
            </Link>
          ) : (
            <div className={clsx("body-4", styles.link)}>{item.title}</div>
          )}
          {index < items.length - 1 && <SvgArrowRight />}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
