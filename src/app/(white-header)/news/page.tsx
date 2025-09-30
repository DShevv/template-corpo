import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/news.jpg";
import Feedback from "@/blocks/Feedback/Feedback";
import NewsListBlock from "@/blocks/NewsListBlock/NewsListBlock";
import { CanonicalLink } from "@/components/CanonicalLink/CanonicalLink";
import { getSettings } from "@/services/SettingsService";

export default async function News() {
  const settings = await getSettings();

  return (
    <>
      <CanonicalLink href="/news" />
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Статьи", href: "/news" },
        ]}
        title="Статьи по тематикам"
        description="Предлагаем вам детально изучить актуальные материалы по выбранным направлениям из нашей обновлённой базы публикаций"
      />
      <NewsListBlock />
      {settings && <Feedback settings={settings} />}
    </>
  );
}
