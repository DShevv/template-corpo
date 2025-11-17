import clsx from "clsx";
import styles from "./Hero.module.scss";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import Image, { StaticImageData } from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import heroImage from "@/assets/images/hero.png";
import { ContactsT, ServiceT, SettingsT } from "@/types/types";
import OpenPopupButton from "@/components/Buttons/OpenPopupButton/OpenPopupButton";
import { getBanners } from "@/services/BannersService";
import { getStoreUrl } from "@/services/base";

const Hero = async ({
  items,
  image,
  title,
  description,
  popup,
}: {
  items?: { title: string; href: string }[];
  image?: StaticImageData | string;
  title?: string;
  description?: string;
  contacts: Promise<ContactsT | null>;
  settings: Promise<SettingsT | null>;
  popup?: string;
  storeUrl: string;
  services: Promise<ServiceT[] | null>;
}) => {
  const banners = await getBanners();
  const storeUrl = getStoreUrl();
  return (
    <div
      data-first-block
      className={clsx(styles.wrapper, { [styles.service]: items })}
    >
      <div className="wrapper">
        <section className={styles.container}>
          <div className={styles.image}>
            <Image
              src={
                image || banners?.[0]?.photo_path
                  ? `${storeUrl}/${banners?.[0]?.photo_path}`
                  : heroImage
              }
              alt="hero"
              width={1920}
              height={1080}
            />
          </div>

          <div className={styles.inner}>
            {items && <Breadcrumbs items={items} />}

            <h1 className={clsx(styles.title, "h1")}>
              {title ||
                banners?.[0]?.title ||
                "Создаем счастливое будущее для вас"}
            </h1>
            <p className={clsx("body-1", styles.description)}>
              {description ||
                banners?.[0]?.description ||
                "Мы специализируемся в 11 отраслях в более чем 55 странах и регионах, предлагая инновационные решения для самых сложных задач наших клиентов."}
            </p>
            {!items && (
              <MainButton
                className={styles.button}
                type="link"
                href={banners?.[0]?.button_link || "/about"}
              >
                Подробнее
              </MainButton>
            )}
            {popup && (
              <OpenPopupButton className={styles.button} popup={popup}>
                Оставить заявку
              </OpenPopupButton>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
