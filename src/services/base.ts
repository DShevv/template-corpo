import { getRuntimeConfig } from '../utils/runtime-config';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const config = await getRuntimeConfig();
  const url = `${config.apiUrl}${endpoint}`;

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}

export async function getApiUrl(): Promise<string> {
  const config = await getRuntimeConfig();
  return config.apiUrl;
}

export async function getSiteUrl(): Promise<string> {
  const config = await getRuntimeConfig();
  return config.siteUrl;
}


export async function getStoreUrl(): Promise<string> {
  const config = await getRuntimeConfig();
  return config.storeUrl;
} 