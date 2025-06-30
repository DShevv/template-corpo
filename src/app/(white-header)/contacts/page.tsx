import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/contacts.jpg";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import styles from "./page.module.scss";
import OtherCities from "@/blocks/OtherCities/OtherCities";
import Feedback from "@/blocks/Feedback/Feedback";
import { getContacts, getSeoTag } from "@/services/SettingsService";
import { getSettings } from "@/services/SettingsService";

export async function generateMetadata() {
  const seoTag = await getSeoTag("contacts");
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

export default async function Contacts() {
  const contacts = await getContacts();
  const settings = await getSettings();

  return (
    <>
      <FirstBlock
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
          logo={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${settings?.logo}`}
        />
        <OtherCities />
        <Feedback settings={settings || undefined} />
      </div>
    </>
  );
}
