import clsx from "clsx";
import styles from "./IconButton.module.scss";
import Link from "next/link";

type IconButtonProps =
  | {
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      disabled?: boolean;
      className?: string;
      type?: "button" | "submit";
      href?: never;
      icon: React.ReactNode;
      otherProps?: React.HTMLAttributes<HTMLButtonElement>;
    }
  | {
      onClick?: React.MouseEventHandler<HTMLAnchorElement>;
      disabled?: boolean;
      className?: string;
      type?: "link";
      href: string;
      icon: React.ReactNode;
      otherProps?: React.HTMLAttributes<HTMLAnchorElement>;
    };

const IconButton = (props: IconButtonProps) => {
  if (props.type === "link" && "href" in props) {
    return (
      <Link
        className={clsx("t-button", styles.button, props.className, {
          [styles.disabled]: props.disabled,
        })}
        href={props.href}
        onClick={props.onClick}
        {...props.otherProps}
      >
        {props.icon}
      </Link>
    );
  }

  const buttonProps = props as Extract<
    IconButtonProps,
    { type?: "button" | "submit" }
  >;

  return (
    <button
      className={clsx("t-button", styles.button, buttonProps.className)}
      onClick={buttonProps.onClick}
      type={buttonProps.type}
      disabled={buttonProps.disabled}
      {...buttonProps.otherProps}
    >
      {buttonProps.icon}
    </button>
  );
};

export default IconButton;
