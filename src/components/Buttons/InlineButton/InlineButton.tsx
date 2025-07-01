import clsx from "clsx";
import styles from "./InlineButton.module.scss";
import Link from "next/link";
import { SvgArrowRight } from "@/assets/icons/svgs";

type InlineButtonProps =
  | {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      disabled?: boolean;
      children: React.ReactNode;
      className?: string;
      type?: "button" | "submit";
      href?: never;
      backIcon?: boolean;
      target?: never;
    }
  | {
      onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
      disabled?: boolean;
      children: React.ReactNode;
      className?: string;
      type?: "link";
      href: string;
      backIcon?: boolean;
      target?: "_blank" | "_self" | "_parent" | "_top";
    };

const InlineButton = ({
  onClick,
  disabled,
  children,
  className,
  type = "button",
  href,
  backIcon = false,
  target,
}: InlineButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link
        className={clsx("t-button", styles.button, className, {
          [styles.disabled]: disabled,
        })}
        href={href}
        onClick={onClick}
        target={target}
      >
        {backIcon && <SvgArrowRight />}
        <span className={styles.textContainer}>
          <span className={styles.hiddenText}>{children}</span>
          <span className={styles.visibleText}>{children}</span>
        </span>
      </Link>
    );
  }

  return (
    <button
      className={clsx("t-button", styles.button, className)}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      type={type !== "link" ? type : undefined}
      disabled={disabled}
    >
      {backIcon && <SvgArrowRight />}
      <span className={styles.textContainer}>
        <span className={styles.hiddenText}>{children}</span>
        <span className={styles.visibleText}>{children}</span>
      </span>
    </button>
  );
};

export default InlineButton;
