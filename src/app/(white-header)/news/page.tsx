import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/news.jpg";
import Feedback from "@/blocks/Feedback/Feedback";
import NewsListBlock from "@/blocks/NewsListBlock/NewsListBlock";
import { CanonicalLink } from "@/components/CanonicalLink/CanonicalLink";
import { getSettings } from "@/services/SettingsService";
import { getStoreUrl } from "@/services/base";
export default function News() {
  const settings = getSettings();
  const storeUrl = getStoreUrl();
  return (
    <>
      <CanonicalLink href="/news" />
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Новости", href: "/news" },
        ]}
        title="Новости по тематикам"
        description="Предлагаем вам детально изучить актуальные материалы по выбранным направлениям из нашей обновлённой базы публикаций"
      />
      <NewsListBlock storeUrl={storeUrl} />
      {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
    </>
  );
}
