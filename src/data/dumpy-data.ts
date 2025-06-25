import { AdvantageT, NewsItemT, PartnerT, ServiceItemT } from "@/types/types";
import serviceItemImage from "@/assets/images/service-item.png";
import partnerImage from "@/assets/images/partner-bg.png";
import partnerLogo from "@/assets/images/partner-logo.png";
import advantageImage1 from "@/assets/images/adv-1.jpg";
import advantageImage2 from "@/assets/images/adv-2.jpg";
import advantageImage3 from "@/assets/images/adv-3.jpg";
import advantageImage4 from "@/assets/images/adv-4.jpg";
import newsImage1 from "@/assets/images/news.png";

export const services: ServiceItemT[] = [
  {
    title: "Строительство коттеджей и таунхаусов",
    description: "Описание услуги 1",
    image: serviceItemImage,
    slug: "construction-of-cottages-and-townhouses",
  },
  {
    title: "Строительство коттеджей и таунхаусов 2",
    description: "Описание услуги 1",
    image: serviceItemImage,
    slug: "construction-of-cottages-and-townhouses",
  },
  {
    title: "Строительство коттеджей и таунхаусов",
    description: "Описание услуги 1",
    image: serviceItemImage,
    slug: "construction-of-cottages-and-townhouses",
  },
  {
    title: "Строительство коттеджей и таунхаусов",
    description: "Описание услуги 1",
    image: serviceItemImage,
    slug: "construction-of-cottages-and-townhouses",
  },
  {
    title: "Строительство коттеджей и таунхаусов",
    description: "Описание услуги 1",
    image: serviceItemImage,
    slug: "construction-of-cottages-and-townhouses",
  },
  {
    title: "Строительство коттеджей и таунхаусов",
    description: "Описание услуги 1",
    image: serviceItemImage,
    slug: "construction-of-cottages-and-townhouses",
  },
  {
    title: "Строительство коттеджей и таунхаусов",
    description: "Описание услуги 1",
    image: serviceItemImage,
    slug: "construction-of-cottages-and-townhouses",
  },



];

export const partners: PartnerT[] = [
  {
    name: "Партнер 1",
    logo: partnerLogo,
    image: partnerImage,
    url: "https://www.google.com",
  },
  {
    name: "Партнер 2",
    logo: partnerLogo,
    image: partnerImage,
    url: "https://www.google.com",
  },
  {
    name: "Партнер 3",
    logo: partnerLogo,
    image: partnerImage,
    url: "https://www.google.com",
  },



];

export const advantages: AdvantageT[] = [
  {
    title: "Сопровождение строительства",
    description: "Мы предоставляем весь комплекс услуг по постройке загородных домов. ",
    image: advantageImage1,
  },
  {
    title: "Ценовая политика",
    description: "Мы предлагаем низкие цены в Минске, сохраняя качество.",
    image: advantageImage2,
  },
  {
    title: "Лучшие специалисты",
    description: "В штате нашей компании — опытные профессионалы.",
    image: advantageImage3,
  },
  {
    title: "Гарантия качества",
    description: "Используем качественные материалы проверенных производителей.",
    image: advantageImage4,
  },



];

export const news: NewsItemT[] = [
  {
    title: "Прошла Международная конференция в г. Минске",
    tag: "Тематика 1",
    date: "23.06.2025",
    image: newsImage1,
    slug: "news-1",
  },
  {
    title: "Прошла Международная конференция в г. Минске",
    tag: "Тематика 1",
    date: "23.06.2025",
    image: newsImage1,
    slug: "news-2",
  },
  {
    title: "Прошла Международная конференция в г. Минске",
    tag: "Тематика 1",
    date: "23.06.2025",
    image: newsImage1,
    slug: "news-3",
  },
  {
    title: "Прошла Международная конференция в г. Минске",
    tag: "Тематика 1",
    date: "23.06.2025",
    image: newsImage1,
    slug: "news-4",
  },

];