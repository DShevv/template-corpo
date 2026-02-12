import { NextResponse } from 'next/server';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { getSiteUrl } from '@/services/base';
import { getNews } from '@/services/NewsService';
import { getServices, getProducts, getCompanyServices } from '@/services/ServicesService';

// Статические страницы сайта с приоритетами
const staticPages: Array<{ path: string; priority: number; changefreq: ISitemapField['changefreq'] }> = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: 'about', priority: 0.8, changefreq: 'monthly' },
  { path: 'contacts', priority: 0.8, changefreq: 'monthly' },
  { path: 'policy', priority: 0.3, changefreq: 'yearly' },
  { path: 'news', priority: 0.9, changefreq: 'daily' },
  { path: 'services', priority: 0.9, changefreq: 'weekly' },
  { path: 'products', priority: 0.9, changefreq: 'weekly' },
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
    const [newsData, services, products, companyServices] = await Promise.all([
      getNews(undefined, undefined, 1000),
      getServices(),
      getProducts(),
      getCompanyServices(),
    ]);

    // Добавляем услуги
    if (services && services.length > 0) {
      fields.push(
        ...services.map((service) => ({
          loc: `${siteUrl}/services/${service.slug}`,
          lastmod: currentDate,
          changefreq: 'weekly' as const,
          priority: 0.8,
        })),
      );
    }

    // Добавляем продукцию
    if (products && products.length > 0) {
      fields.push(
        ...products.map((product) => ({
          loc: `${siteUrl}/products/${product.slug}`,
          lastmod: currentDate,
          changefreq: 'weekly' as const,
          priority: 0.8,
        })),
      );
    }

    // Добавляем страницы компании (о компании)
    if (companyServices && companyServices.length > 0) {
      fields.push(
        ...companyServices.map((item) => ({
          loc: `${siteUrl}/about/${item.slug}`,
          lastmod: currentDate,
          changefreq: 'monthly' as const,
          priority: 0.7,
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
