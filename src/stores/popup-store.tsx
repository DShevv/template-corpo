import { makeAutoObservable } from "mobx";
import { PopupStoreT } from "@/types/stores";
import { StaticImageData } from "next/image";

class PopupStore implements PopupStoreT {
  feedback = false;
  menu = false;
  imageViewer = false;
  imageViewerData: { src: string | StaticImageData; alt: string } | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openPopup = (
    type: string,
    data?: { src: string | StaticImageData; alt: string }
  ) => {
    switch (type) {
      case "feedback":
        this.feedback = true;
        break;
      case "menu":
        this.menu = true;
        break;
      case "imageViewer":
        this.imageViewer = true;
        this.imageViewerData = data || null;
        break;
    }
  };

  closePopup = (type: string) => {
    switch (type) {
      case "feedback":
        this.feedback = false;
        break;
      case "menu":
        this.menu = false;
        break;
      case "imageViewer":
        this.imageViewer = false;
        this.imageViewerData = null;
        break;
    }
  };
}

export default PopupStore;
