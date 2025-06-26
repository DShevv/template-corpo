import HeaderMobile from "@/blocks/HeaderMobile/HeaderMobile";
import ImageViewer from "@/components/ImageViewer/ImageViewer";
import FeedbackPopup from "@/blocks/FeedbackPopup/FeedbackPopup";
import Footer from "@/blocks/Footer/Footer";
import NotFoundBlock from "@/blocks/NotFoundBlock/NotFoundBlock";
import styles from "./not-found.module.scss";

const NotFound = () => {
  return (
    <>
      <HeaderMobile />

      <main>
        <NotFoundBlock />

        <div className={styles.wrapper}>
          <Footer className={styles.footer} />
        </div>
      </main>
      <ImageViewer />

      <FeedbackPopup />
    </>
  );
};

export default NotFound;
