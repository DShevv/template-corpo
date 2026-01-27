import { NextResponse } from 'next/server';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { getSiteUrl } from '@/services/base';
import { getNews } from '@/services/NewsService';
import { getServices, getServicesTwo } from '@/services/ServicesService';

// Статические страницы сайта с приоритетами
const staticPages: Array<{ path: string; priority: number; changefreq: ISitemapField['changefreq'] }> = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: 'about', priority: 0.8, changefreq: 'monthly' },
  { path: 'contacts', priority: 0.8, changefreq: 'monthly' },
  { path: 'policy', priority: 0.3, changefreq: 'yearly' },
  { path: 'news', priority: 0.9, changefreq: 'daily' },
  { path: 'services', priority: 0.9, changefreq: 'weekly' },
  { path: 'services/special-effects', priority: 0.9, changefreq: 'weekly' },
  { path: 'services/events', priority: 0.9, changefreq: 'weekly' },
];

export async function GET() {
  try {
    const siteUrl = getSiteUrl().replace(/\/$/, '');
    const currentDate = new Date().toISOString();

    const fields: ISitemapField[] = [];

    // Добавляем статические страницы
    for (const page of staticPages) {
      fields.push({
        loc: `${siteUrl}/${page.path}`,
        lastmod: currentDate,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    }

    // Получаем данные параллельно
    const [newsData, specialEffectsServices, eventsServices] = await Promise.all([
      getNews(undefined, undefined, 1000),
      getServices(),
      getServicesTwo(),
    ]);

    // Добавляем услуги категории special-effects
    if (specialEffectsServices && specialEffectsServices.length > 0) {
      fields.push(
        ...specialEffectsServices.map((service) => ({
          loc: `${siteUrl}/services/special-effects/${service.slug}`,
          lastmod: currentDate,
          changefreq: 'weekly' as const,
          priority: 0.8,
        })),
      );
    }

    // Добавляем услуги категории events
    if (eventsServices && eventsServices.length > 0) {
      fields.push(
        ...eventsServices.map((service) => ({
          loc: `${siteUrl}/services/events/${service.slug}`,
          lastmod: currentDate,
          changefreq: 'weekly' as const,
          priority: 0.8,
        })),
      );
    }

    // Добавляем новости
    if (newsData?.data && newsData.data.length > 0) {
      fields.push(
        ...newsData.data.map((news) => ({
          loc: `${siteUrl}/news/${news.slug}`,
          lastmod: news.updated_at
            ? new Date(news.updated_at).toISOString()
            : currentDate,
          changefreq: 'weekly' as const,
          priority: 0.6,
        })),
      );
    }

    return getServerSideSitemap(fields);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
