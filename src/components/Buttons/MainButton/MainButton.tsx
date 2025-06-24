import clsx from "clsx";
import styles from "./MainButton.module.scss";
import Link from "next/link";

type MainButtonProps =
  | {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      disabled?: boolean;
      children: React.ReactNode;
      className?: string;
      type?: "button" | "submit";
      href?: never;
      variant?: "primary" | "secondary" | "white";
    }
  | {
      onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
      disabled?: boolean;
      children: React.ReactNode;
      className?: string;
      type?: "link";
      href: string;
      variant?: "primary" | "secondary" | "white";
    };

const MainButton = ({
  onClick,
  disabled,
  children,
  className,
  type = "button",
  href,
  variant = "primary",
}: MainButtonProps) => {
  if (type === "link" && href) {
    return (
      <Link
        className={clsx("t-button-2", styles.button, className, {
          [styles.disabled]: disabled,
          [styles.secondary]: variant === "secondary",
          [styles.white]: variant === "white",
        })}
        href={href}
        onClick={onClick}
      >
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      className={clsx("t-button-2", styles.button, className, {
        [styles.secondary]: variant === "secondary",
        [styles.white]: variant === "white",
      })}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      type={type !== "link" ? type : undefined}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default MainButton;
