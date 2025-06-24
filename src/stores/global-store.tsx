import NotificationStore from "./notification-store";
import PopupStore from "./popup-store";
import { GlobalStoreT, NotificationStoreT, PopupStoreT } from "@/types/stores";

class GlobalStore implements GlobalStoreT {
  popupStore: PopupStoreT;
  notificationStore: NotificationStoreT;

  constructor(popupStore: PopupStoreT, notificationStore: NotificationStoreT) {
    this.popupStore = popupStore;
    this.notificationStore = notificationStore;
  }
}

const popupStore = new PopupStore();
const notificationStore = new NotificationStore();

const globalStore = new GlobalStore(popupStore, notificationStore);

export default globalStore;
