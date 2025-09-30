import { useEffect, useState } from 'react';
import { env } from 'next-runtime-env';

interface ClientRuntimeConfig {
  storeUrl: string;
}

export function useRuntimeConfig(): ClientRuntimeConfig {
  const [config, setConfig] = useState<ClientRuntimeConfig>({
    storeUrl: '',
  });

  useEffect(() => {
    // Пытаемся получить из runtime env
    const storeUrl = env('NEXT_PUBLIC_STORE_URL') || '';

    if (storeUrl) {
      setConfig({ storeUrl });
    } else {
      // Fallback: загружаем с сервера
      fetch('/api/config')
        .then(res => res.json())
        .then(data => {
          setConfig({
            storeUrl: data.storeUrl || '',
          });
        })
        .catch(() => {
          // Final fallback
          setConfig({
            storeUrl: process.env.NEXT_PUBLIC_STORE_URL || '',
          });
        });
    }
  }, []);

  return config;
} 