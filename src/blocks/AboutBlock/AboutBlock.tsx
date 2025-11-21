import clsx from "clsx";
import styles from "./AboutBlock.module.scss";
import Image from "next/image";
import MainButton from "@/components/Buttons/MainButton/MainButton";
import { getStoreUrl } from "@/services/base";
import { getSettings } from "@/services/SettingsService";
import { faIconsMap } from "@/assets/fa-icons";
import { getAdvantages } from "@/services/AdvantagesService";

const AboutBlock = async ({ isHeader = true }: { isHeader?: boolean }) => {
  const [settings] = await Promise.all([getSettings()]);
  const advantages = await getAdvantages();
  const storeUrl = getStoreUrl();

  if (!advantages || advantages.length === 0) return null;

  return (
    <section className={clsx(styles.container)}>
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
        width={1920}
        height={1080}
      />
    </section>
  );
};

export default AboutBlock;
