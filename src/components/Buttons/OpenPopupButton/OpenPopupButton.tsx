"use client";
import MainButton from "../MainButton/MainButton";
import globalStore from "@/stores/global-store";
import { observer } from "mobx-react-lite";

type OpenPopupButtonProps = {
  popup: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "white";
};

const OpenPopupButton = observer(
  ({
    popup,
    disabled,
    children,
    className,
    variant = "primary",
  }: OpenPopupButtonProps) => {
    const { popupStore } = globalStore;
    const { openPopup } = popupStore;

    return (
      <MainButton
        onClick={() => openPopup(popup)}
        disabled={disabled}
        className={className}
        type={"button"}
        variant={variant}
      >
        {children}
      </MainButton>
    );
  }
);

export default OpenPopupButton;
