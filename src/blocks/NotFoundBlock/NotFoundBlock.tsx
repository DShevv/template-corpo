import clsx from "clsx";
import styles from "./NotFoundBlock.module.scss";
import heroImage from "@/assets/images/404.png";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Image from "next/image";

const NotFoundBlock = () => {
  return (
    <div data-first-block className={styles.wrapper}>
      <div className="wrapper">
        <section className={styles.container}>
          <div className={styles.image}>
            <Image src={heroImage} alt="background" />
          </div>
          <h1 className={clsx(styles.title, "h1")}>Страница не найдена</h1>
          <p className={clsx("body-1", styles.description)}>
            К сожалению, страница не найдена. Возможно, она была удалена или Вы
            ввели некорректный адрес (ошибка 404).
          </p>
          <MainButton className={styles.button} href="/">
            Вернуться на главную
          </MainButton>
        </section>
      </div>
    </div>
  );
};

export default NotFoundBlock;
