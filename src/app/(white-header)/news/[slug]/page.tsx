import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
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
  const seoTag = await getSeoTag(`/news/${slug}`);

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
        image={`${storeUrl}/${news.photo_path}`}
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
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
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
            title="Другие статьи"
            news={otherNews}
            storeUrl={storeUrl}
          />
        )}
        {settings && <Feedback settings={settings} storeUrl={storeUrl} />}
      </div>
    </>
  );
}
