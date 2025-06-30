"use client";

import FirstBlock from "@/blocks/FirstBlock/FirstBlock";
import firstBlockImage from "@/assets/images/news.jpg";
import styles from "./page.module.scss";
import Feedback from "@/blocks/Feedback/Feedback";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import NewsItem from "@/components/NewsItem/NewsItem";
import Pagination from "@/components/Pagination/Pagination";
import { CanonicalLink } from "@/components/CanonicalLink/CanonicalLink";
import { getNews, getNewsTags } from "@/services/NewsService";
import { NewsResponse } from "@/types/api";
import { getSettings } from "@/services/SettingsService";
import { SettingsT } from "@/types/types";

export default function News() {
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [uniqueTags, setUniqueTags] = useState<string[]>(["Все"]);
  const [feedbackSettings, setFeedbackSettings] = useState<SettingsT | null>(
    null
  );

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const tagFromUrl = searchParams.get("tag");

  useEffect(() => {
    setSelectedTag(tagFromUrl);
  }, [tagFromUrl]);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getNewsTags();
      setUniqueTags(["Все", ...(tags || [])]);
    };
    const fetchFeedbackSettings = async () => {
      const settings = await getSettings();
      setFeedbackSettings(settings);
    };
    fetchTags();
    fetchFeedbackSettings();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const news = await getNews(selectedTag || undefined, currentPage);
      setNews(news);
    };
    fetchNews();
  }, [selectedTag, currentPage]);

  const handleTagChange = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }

    params.delete("page");

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
  };

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
      <div className={styles.wrapper}>
        <Swiper
          className={styles.tags}
          spaceBetween={16}
          slidesPerView={"auto"}
          freeMode={true}
        >
          {uniqueTags.map((tag) => (
            <SwiperSlide
              key={tag}
              className={clsx(
                styles.tag,
                selectedTag === "Все"
                  ? tag === "" && styles.selected
                  : selectedTag === tag && styles.selected
              )}
              onClick={() => {
                handleTagChange(tag === "Все" ? "" : tag);
              }}
            >
              <div>{tag}</div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.news}>
          {news?.data.map((item) => (
            <NewsItem item={item} key={item.slug} />
          ))}
        </div>

        <div className={styles.pagination}>
          {news?.last_page && news?.last_page > 1 && (
            <Pagination
              current={news?.current_page || 1}
              max={news?.last_page || 1}
              maxPerView={6}
            />
          )}
        </div>

        {feedbackSettings && <Feedback settings={feedbackSettings} />}
      </div>
    </>
  );
}
