import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/contacts.jpg";
import ContactsBlock from "@/blocks/ContactsBlock/ContactsBlock";
import styles from "./page.module.scss";
import OtherCities from "@/blocks/OtherCities/OtherCities";
import Feedback from "@/blocks/Feedback/Feedback";

export default function Home() {
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
        <ContactsBlock isStandalone className={styles.contacts} />
        <OtherCities />
        <Feedback />
      </div>
    </>
  );
}
