import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/contacts.jpg";
import styles from "./page.module.scss";
import { getSeoTag, getSettings } from "@/services/SettingsService";

export async function generateMetadata() {
  const seoTag = await getSeoTag("policy");
  return {
    title: seoTag?.title,
    description: seoTag?.description,
    keywords: seoTag?.keywords,
    openGraph: {
      title: seoTag?.title,
      description: seoTag?.description,
    },
  };
}

export default async function Policy() {
  const settings = await getSettings();

  return (
    <>
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          {
            title: "Политика обработки персональных данных",
            href: "/policy",
          },
        ]}
        title="Политика обработки персональных данных"
      />
      <div className={styles.wrapper}>
        <section
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: settings?.privacy_policy.text || "",
          }}
        />
      </div>
    </>
  );
}
