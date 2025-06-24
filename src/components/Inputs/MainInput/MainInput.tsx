"use client";
import clsx from "clsx";
import styles from "./MainInput.module.scss";
import InputMask from "@mona-health/react-input-mask";

interface MainInputProps {
  name?: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
  type: string;
  mask?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const MainInput = ({
  name,
  title,
  placeholder,
  required,
  type,
  mask,
  error,
  disabled,
  className,
  value,
  onChange,
  ...other
}: MainInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <label className={clsx("t-placeholder", styles.container, className)}>
      {title && (
        <div className={clsx("body-5", styles.title)}>
          {title}
          {required && <span>*</span>}
        </div>
      )}
      <InputMask
        className={clsx("t-placeholder", styles.field, {
          [styles.error]: error,
        })}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        mask={mask}
        value={value}
        onChange={handleChange}
        {...other}
      />

      {error && <div className={clsx("body-6", styles.message)}>*{error}</div>}
    </label>
  );
};

export default MainInput;
