let configCache: RuntimeConfig | null = null;
let configPromise: Promise<RuntimeConfig> | null = null;

export interface RuntimeConfig {
  apiUrl: string;
  siteUrl: string;
  storeUrl: string;
}

export async function getRuntimeConfig(): Promise<RuntimeConfig> {
  // Если конфигурация уже загружена, возвращаем её
  if (configCache) {
    return configCache;
  }

  // Если уже идёт загрузка конфигурации, ждём её завершения
  if (configPromise) {
    return configPromise;
  }

  // Для серверной части используем переменные окружения напрямую
  if (typeof window === 'undefined') {
    configCache = {
      apiUrl: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '',
      siteUrl: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '',
      storeUrl: process.env.STORE_URL || process.env.NEXT_PUBLIC_STORE_URL || '',
    };
    return configCache;
  }

  // Для клиентской части загружаем конфигурацию с сервера
  configPromise = fetch('/api/config')
    .then(res => res.json())
    .then(config => {
      configCache = config;
      configPromise = null;
      return config;
    })
    .catch(error => {
      console.error('Failed to load runtime config:', error);
      configPromise = null;
      // Fallback на build-time переменные
      configCache = {
        apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
        storeUrl: process.env.NEXT_PUBLIC_STORE_URL || '',
      };
      return configCache;
    });

  return configPromise;
}

// Функция для очистки кэша (полезно для разработки)
export function clearConfigCache() {
  configCache = null;
  configPromise = null;
} 