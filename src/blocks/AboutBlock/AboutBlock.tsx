import clsx from "clsx";
import styles from "./AboutBlock.module.scss";
import Image from "next/image";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { getAdvantages } from "@/services/AdvantagesService";
import { getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";
import { faIconsMap } from "@/assets/fa-icons";

const AboutBlock = async ({ isHeader = true }: { isHeader?: boolean }) => {
  const [advantages, settings] = await Promise.all([
    getAdvantages(),
    getSettings(),
  ]);
  const storeUrl = getStoreUrl();

  return (
    <section className={styles.container}>
      <div className={styles.caption}>
        <div className={styles.text}>
          {isHeader && <h2 className={clsx("h2", styles.title)}>О компании</h2>}
          <div
            dangerouslySetInnerHTML={{ __html: settings?.about?.text || "" }}
          />
        </div>
        {isHeader ? (
          <MainButton type="link" href="/about" className={styles.button}>
            Подробнее
          </MainButton>
        ) : (
          <div className={styles.blocks}>
            {advantages.slice(0, 3).map((advantage, index) => {
              const Icon =
                faIconsMap[
                  advantage.icon.replace("fas ", "") as keyof typeof faIconsMap
                ];
              return (
                <div key={index} className={clsx(styles.advantage)}>
                  {/*  <Image
                    src={advantage.image}
                    alt={advantage.title}
                    className={styles.image}
                    width={190}
                    height={190}
                  /> */}
                  <Icon className={styles.image} />
                  <div className={clsx("h7", styles.title)}>
                    {advantage.title}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Image
        src={`${storeUrl}/${settings?.about?.image}`}
        alt="о компании"
        className={styles.image}
        width={632}
        height={586}
      />
    </section>
  );
};

export default AboutBlock;
