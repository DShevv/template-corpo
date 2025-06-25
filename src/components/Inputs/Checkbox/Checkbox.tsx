"use client";
import { Field } from "formik";
import styles from "./Checkbox.module.scss";
import clsx from "clsx";

interface CheckboxProps {
  onChange?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  name?: string;
  checked?: boolean;
}

const Checkbox = ({
  disabled,
  children,
  className,
  name,
  onChange,
  checked,
}: CheckboxProps) => {
  if (name) {
    return (
      <label className={clsx(styles.container, className)}>
        <Field
          type="checkbox"
          name={name}
          className={clsx(styles.input)}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />

        <div className={styles.checkbox}>
          <svg
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 1L6 12L1 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {children && <span className={"body-6"}>{children}</span>}
      </label>
    );
  }
  return (
    <label className={clsx(styles.container, className)}>
      <input
        type="checkbox"
        className={clsx(styles.input)}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
      />

      <div className={styles.checkbox}>
        <svg
          width="18"
          height="13"
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 1L6 12L1 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {children && <span className={"body-6"}>{children}</span>}
    </label>
  );
};

export default Checkbox;
