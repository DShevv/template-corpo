import clsx from "clsx";
import styles from "./ArrowButton.module.scss";
import Link from "next/link";
import { SvgArrowRight } from "@/assets/icons/svgs";

type ArrowButtonProps =
  | {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      disabled?: boolean;
      className?: string;
      type?: "button" | "submit";
      href?: never;
    }
  | {
      onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
      disabled?: boolean;
      className?: string;
      type?: "link";
      href: string;
    };

const ArrowButton = ({
  onClick,
  disabled,
  className,
  type = "button",
  href,
}: ArrowButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link
        className={clsx("t-button", styles.button, className, {
          [styles.disabled]: disabled,
        })}
        href={href}
        onClick={onClick}
      >
        <SvgArrowRight />
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
      <SvgArrowRight />
    </button>
  );
};

export default ArrowButton;
