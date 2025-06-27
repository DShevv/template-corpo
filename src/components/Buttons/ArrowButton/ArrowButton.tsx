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
      otherProps?: React.HTMLAttributes<HTMLButtonElement>;
    }
  | {
      onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
      disabled?: boolean;
      className?: string;
      type?: "link";
      href: string;
      otherProps?: React.HTMLAttributes<HTMLAnchorElement>;
    };

const ArrowButton = (props: ArrowButtonProps) => {
  if (props.type === "link" && props.href) {
    return (
      <Link
        className={clsx("t-button", styles.button, props.className, {
          [styles.disabled]: props.disabled,
        })}
        href={props.href}
        onClick={props.onClick}
        {...props.otherProps}
      >
        <SvgArrowRight />
      </Link>
    );
  }

  const buttonProps = props.otherProps as Extract<
    ArrowButtonProps,
    { type?: "button" | "submit" }
  >;

  return (
    <button
      className={clsx("t-button", styles.button, props.className)}
      onClick={props.onClick as React.MouseEventHandler<HTMLButtonElement>}
      type={props.type !== "link" ? props.type || "button" : "button"}
      disabled={props.disabled}
      {...buttonProps}
    >
      <SvgArrowRight />
    </button>
  );
};

export default ArrowButton;
