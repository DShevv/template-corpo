"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import NewsItem from "@/components/NewsItem/NewsItem";
import Pagination from "@/components/Pagination/Pagination";
import { getNews, getNewsTags } from "@/services/NewsService";
import { NewsResponse } from "@/types/api";
import { useRuntimeConfig } from "@/utils/useRuntimeConfig";
import NewsListSkeleton from "@/blocks/NewsListSkeleton/NewsListSkeleton";
import styles from "./NewsListBlock.module.scss";

export default function NewsListBlock() {
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [uniqueTags, setUniqueTags] = useState<string[]>(["Все"]);
  const { storeUrl } = useRuntimeConfig();
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const news = await getNews(selectedTag || undefined, currentPage);
      setNews(news);
      setIsLoading(false);
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

  if (isLoading) {
    return <NewsListSkeleton />;
  }

  return (
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
              selectedTag === tag && styles.selected,
              selectedTag === null && tag === "Все" && styles.selected
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
          <NewsItem item={item} key={item.slug} storeUrl={storeUrl} />
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
    </div>
  );
}
