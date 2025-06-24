import { makeAutoObservable } from "mobx";
import { NotificationStoreT } from "@/types/stores";

class NotificationStore implements NotificationStoreT {
  type: string | undefined;
  isVisible: boolean = false;
  timer: NodeJS.Timeout | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setNotification = (type: string) => {
    this.type = type;
    this.isVisible = true;

    this.timer = setTimeout(() => {
      this.removeNotification();
    }, 3000);
  };

  removeNotification = () => {
    this.isVisible = false;

    if (this.timer) {
      clearTimeout(this.timer);
    }
  };
}

export default NotificationStore;
