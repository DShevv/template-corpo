import { StaticImageData } from "next/image";

export type GlobalStoreT = {
  popupStore: PopupStoreT;
  notificationStore: NotificationStoreT;
};

export type PopupStoreT = {
  feedback: boolean;
  menu: boolean;
  imageViewer: boolean;
  imageViewerData: { src: string | StaticImageData; alt: string } | null;

  openPopup: (
    type: string,
    data?: { src: string | StaticImageData; alt: string }
  ) => void;
  closePopup: (type: string) => void;
};

export type NotificationStoreT = {
  type: "success" | "error";
  isVisible: boolean;
  setNotification: (type: "success" | "error") => void;
  removeNotification: () => void;
};
