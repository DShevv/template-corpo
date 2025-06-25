import styles from "./Marker.module.scss";
import pin from "@/assets/images/map-pin.svg";

const Marker = (logoPath: string) => {
  const container = document.createElement("div");
  container.className = styles.container;
  const image = document.createElement("img");
  image.id = "marker-image";
  image.className = styles.image;
  image.src = pin.src;
  const logo = document.createElement("img");
  logo.id = "marker-logo";
  logo.className = styles.logo;
  logo.src = logoPath;
  container.appendChild(image);
  container.appendChild(logo);
  return container;
};

export default Marker;
