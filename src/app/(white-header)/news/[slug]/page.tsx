import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/news.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import newsItemImage from "@/assets/images/news-item.jpg";
import Image from "next/image";
import InlineButton from "@/components/Buttons/InlineButton/InlineButton";
import NewsBlock from "@/blocks/NewsBlock/NewsBlock";
import { getSeoTag, getSettings } from "@/services/SettingsService";
import { getNews, getNewsBySlug } from "@/services/NewsService";
import { notFound } from "next/navigation";
import { getStoreUrl } from "@/services/base";
import { formatDate } from "@/utils/helper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seoTag = await getSeoTag(slug);

  if (!seoTag) {
    const news = await getNewsBySlug(slug);

    return {
      title: news?.title,
      description: news?.subtitle,
      keywords: news?.tags.join(", "),
      openGraph: {
        title: news?.title,
        description: news?.subtitle,
      },
    };
  }

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

export default async function NewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  const settings = getSettings();
  const otherNews = getNews(undefined, 1, 4);
  const storeUrl = getStoreUrl();

  if (!news) {
    notFound();
  }

  return (
    <>
      <FirstBlock
        image={firstBlockImage}
        items={[
          { title: "Главная", href: "/" },
          { title: "Статьи", href: "/news" },
          {
            title: news.title,
            href: `/news/${slug}`,
          },
        ]}
        title={news.title}
        date={formatDate(news.publication_date)}
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p>
            С 1 июня по 11 июня 2025 года в Минске прошла Международная
            конференция. Мероприятие объединило около 600 участников
            из политических, экспертных и аналитических кругов 45 государств.
          </p>
          <p>
            Организаторы обозначили ключевую задачу: создать пространство для
            нефильтрованного диалога в условиях, когда традиционные институты
            глобального управления (ООН, ОБСЕ, ШОС) демонстрируют растущую
            неэффективность. Акцент был сделан на поиске альтернативных форматов
            взаимодействия, способных преодолеть:
          </p>
          <ol>
            <li>
              Системный кризис миропорядка — распад биполярной модели и
              отсутствие новых устойчивых договорённостей;
            </li>
            <li>
              Накопившиеся военно-политические противоречия — от конфликта в
              Украинском регионе до территориальных споров в Южно-Китайском
              море;
            </li>
            <li>
              Коммуникационный коллапс — сокращение дипломатических каналов
              между РФ, США, КНР и ЕС до минимального уровня с 1991 года.
            </li>
          </ol>

          <div className={styles.images}>
            <Image src={newsItemImage} alt="news item" />
            <Image src={newsItemImage} alt="news item" />
          </div>

          <p>
            Организаторы обозначили ключевую задачу: создать пространство для
            нефильтрованного диалога в условиях, когда традиционные институты
            глобального управления (ООН, ОБСЕ, ШОС) демонстрируют растущую
            неэффективность. Акцент был сделан на поиске альтернативных форматов
            взаимодействия, способных преодолеть:
          </p>

          <ol>
            <li>
              Системный кризис миропорядка — распад биполярной модели и
              отсутствие новых устойчивых договорённостей;
            </li>
            <li>
              Накопившиеся военно-политические противоречия — от конфликта в
              Украинском регионе до территориальных споров в Южно-Китайском
              море;
            </li>
            <li>
              Коммуникационный коллапс — сокращение дипломатических каналов
              между РФ, США, КНР и ЕС до минимального уровня с 1991 года.
            </li>
          </ol>
          <InlineButton
            type="link"
            backIcon
            href="/news"
            className={styles.button}
          >
            Вернуться ко всем новостям
          </InlineButton>
        </div>

        {otherNews && (
          <NewsBlock
            isArrows
            title="Другие новости"
            news={otherNews}
            storeUrl={storeUrl}
          />
        )}
        {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
      </div>
    </>
  );
}
