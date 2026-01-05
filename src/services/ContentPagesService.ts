import { getApiUrl } from "./base";
import { ContentPageT, VideoT } from "@/types/types";

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

export const getVideos = async (): Promise<VideoT | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/content-pages/video-na-glavnuiu`, {
      next: {
        revalidate: 60,
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error('getVideos', err);

    return null;
  }
};