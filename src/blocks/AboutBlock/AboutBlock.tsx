import clsx from "clsx";
import styles from "./AboutBlock.module.scss";
import aboutImage from "@/assets/images/about.png";
import Image from "next/image";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { advantages, advantages as advantagesData } from "@/data/dumpy-data";

const AboutBlock = ({ isHeader = true }: { isHeader?: boolean }) => {
  return (
    <section className={styles.container}>
      <div className={styles.caption}>
        <div className={styles.text}>
          {isHeader && <h2 className={clsx("h2", styles.title)}>О компании</h2>}
          <p>
            Наш сплочённый коллектив специалистов с профильным образованием
            успешно работает в сфере строительства более 8 лет. За это время
            мы реализовали десятки частных домов — примеры объектов и отзывы
            довольных клиентов доступны для ознакомления в портфолио на сайте.
          </p>
          <p>
            Сегодня мы трансформируем накопленный опыт в продуманные проекты,
            где каждая деталь — это результат профессиональной экспертизы и
            внимания к потребностям заказчика.
          </p>
          <p>
            Сегодня мы трансформируем накопленный опыт в продуманные проекты,
            где каждая деталь — это результат профессиональной экспертизы и
            внимания к потребностям заказчика.
          </p>
          <p>
            Сегодня мы трансформируем накопленный опыт в продуманные проекты,
            где каждая деталь — это результат профессиональной экспертизы и
            внимания к потребностям заказчика.
          </p>
        </div>
        {isHeader ? (
          <MainButton type="link" href="/about" className={styles.button}>
            Подробнее
          </MainButton>
        ) : (
          <div className={styles.blocks}>
            {advantages.slice(0, 3).map((advantage, index) => (
              <div key={index} className={clsx(styles.advantage)}>
                <Image
                  src={advantagesData[index].image}
                  alt={advantage.title}
                  className={styles.image}
                  width={190}
                  height={190}
                />
                <div className={clsx("h7", styles.title)}>
                  {advantage.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Image src={aboutImage} alt="о компании" className={styles.image} />
    </section>
  );
};

export default AboutBlock;
