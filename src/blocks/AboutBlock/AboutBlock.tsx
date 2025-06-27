import clsx from "clsx";
import styles from "./AboutBlock.module.scss";
import aboutImage from "@/assets/images/about.png";
import Image from "next/image";
import MainButton from "@/components/Buttons/MainButton/MainButton";

const AboutBlock = () => {
  return (
    <section className={styles.container}>
      <div className={styles.caption}>
        <h2 className={clsx("h2", styles.title)}>О компании</h2>
        <p>
          Наш сплочённый коллектив специалистов с профильным образованием
          успешно работает в сфере строительства более 8 лет. За это время
          мы реализовали десятки частных домов — примеры объектов и отзывы
          довольных клиентов доступны для ознакомления в портфолио на сайте.
        </p>
        <p>
          Сегодня мы трансформируем накопленный опыт в продуманные проекты, где
          каждая деталь — это результат профессиональной экспертизы и внимания к
          потребностям заказчика.
        </p>
        <p>
          Сегодня мы трансформируем накопленный опыт в продуманные проекты, где
          каждая деталь — это результат профессиональной экспертизы и внимания к
          потребностям заказчика.
        </p>
        <MainButton type="link" href="/about" className={styles.button}>
          Подробнее
        </MainButton>
      </div>
      <Image src={aboutImage} alt="о компании" className={styles.image} />
    </section>
  );
};

export default AboutBlock;
