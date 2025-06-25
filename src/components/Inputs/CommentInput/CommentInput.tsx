"use client";
import clsx from "clsx";
import styles from "./CommentInput.module.scss";
import { Field } from "formik";

interface CommentInputProps {
  name: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const CommentInput = ({
  name,
  title,
  placeholder,
  required,
  error,
  disabled,
  className,
  value,
  onChange,
  ...other
}: CommentInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <Field
        className={clsx("t-placeholder", styles.field, {
          [styles.error]: error,
        })}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        component="textarea"
        value={value}
        onChange={handleChange}
        {...other}
      />
      {error && <div className={clsx("body-6", styles.message)}>*{error}</div>}
    </label>
  );
};

export default CommentInput;
