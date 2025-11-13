import { GalleryT } from "@/types/types";
import { ApiResponse } from "@/types/api";
import { getApiUrl } from "./base";

export const getGallery = async (): Promise<GalleryT[]> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/v1/photos`, { next: { revalidate: 60 } });
    const data: ApiResponse<GalleryT[]> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }



    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};