import { BannerT } from "@/types/types";
import { getApiUrl } from "./base";

export const getBanners = async (): Promise<BannerT[] | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/banners`, {
      next: {
        revalidate: 60,
      }
    });


    const { data } = await res.json();



    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
};