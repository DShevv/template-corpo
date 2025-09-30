import { clsx } from "clsx";
import styles from "./Skeleton.module.scss";

function Skeleton({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={clsx(styles.skeleton, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Skeleton };
