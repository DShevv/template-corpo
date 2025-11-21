import { getApiUrl } from "./base";
import { ContentPageT } from "@/types/types";

export const getContentPageBySlug = async (slug: string): Promise<ContentPageT | null> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/v1/content-pages/${slug}`, { next: { revalidate: 60 } });
    const data: ContentPageT = await response.json();

    if (data) {
      return data;
    }



    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};