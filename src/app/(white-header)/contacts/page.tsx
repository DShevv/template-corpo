import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/contacts.jpg";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import { getContacts, getSeoTag } from "@/services/SettingsService";
import { getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";

export async function generateMetadata() {
  const seoTag = await getSeoTag("/contacts");
  return {
    title: seoTag?.title,
    description: seoTag?.description,
    keywords: seoTag?.keywords,
    openGraph: {
      title: seoTag?.title,
      description: seoTag?.description,
    },
    alternates: {
      canonical: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL}contacts`,
    },
  };
}

export default function Contacts() {
  const contacts = getContacts();
  const settings = getSettings();
  const storeUrl = getStoreUrl();

  return (
    <>
      <FirstBlock
        page="contacts"
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Контакты", href: "/contacts" },
        ]}
        title="Контакты компании"
        description="Свяжитесь с нами удобным для вас способом, или оставьте заявку на обратный звонок на нашем сайте"
      />
      <div className={styles.wrapper}>
        <ContactsBlock
          isStandalone
          className={styles.contacts}
          contacts={contacts || undefined}
          settings={settings || undefined}
          storeUrl={storeUrl}
        />

        <Feedback settings={settings || undefined} storeUrl={storeUrl} />
      </div>
    </>
  );
}
