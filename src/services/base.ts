import { cache } from "react";


// Кешируем во время одного рендера
export const getApiUrl = cache(() => {
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';
});

export const getSiteUrl = cache(() => {
  return process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
});

export const getSiteName = cache(() => {
  return process.env.SITE_NAME || process.env.NEXT_PUBLIC_SITE_NAME || 'webspaceteam.site';
});

export const getStoreUrl = cache(() => {
  return process.env.STORE_URL || process.env.NEXT_PUBLIC_STORE_URL || '';
});

export const getStoreUrlApi = cache(async () => {
  const response = await fetch('/api/config', {
    next: {
      revalidate: 60,
    },
  });
  const data = await response.json();
  return data.storeUrl || null;

});

export const getApiUrlApi = cache(async () => {
  const response = await fetch('/api/config', {
    next: {
      revalidate: 60,
    },
  });
  const data = await response.json();
  return data.apiUrl || null;
});