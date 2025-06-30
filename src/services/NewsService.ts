
import { ApiResponse, NewsResponse } from "@/types/api";
import { NewsItemT } from "@/types/types";

export const getNews = async (tag?: string, page?: number, per_page = 8): Promise<NewsResponse | null> => {
  try {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (page) params.set("page", page.toString());
    if (per_page) params.set("per_page", per_page.toString());

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/news?${params.toString()}`, { next: { revalidate: 60 } });
    const data: ApiResponse<NewsResponse> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getNewsTags = async (): Promise<string[] | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/news/tags`, { next: { revalidate: 60 } });
    const data: ApiResponse<string[]> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getNewsBySlug = async (slug: string): Promise<NewsItemT | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/news/slug/${slug}`, { next: { revalidate: 60 } });
    const data: ApiResponse<NewsItemT> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
