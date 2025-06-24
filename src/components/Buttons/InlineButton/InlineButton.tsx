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
    }
  | {
      onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
      disabled?: boolean;
      children: React.ReactNode;
      className?: string;
      type?: "link";
      href: string;
      backIcon?: boolean;
    };

const InlineButton = ({
  onClick,
  disabled,
  children,
  className,
  type = "button",
  href,
  backIcon = false,
}: InlineButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link
        className={clsx("t-button", styles.button, className, {
          [styles.disabled]: disabled,
        })}
        href={href}
        onClick={onClick}
      >
        {backIcon && <SvgArrowRight />}
        <span>{children}</span>
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
      <span>{children}</span>
    </button>
  );
};

export default InlineButton;
