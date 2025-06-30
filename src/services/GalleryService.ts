import { GalleryT } from "@/types/types";
import { ApiResponse } from "@/types/api";
export const getGallery = async (): Promise<GalleryT[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/photos`, { next: { revalidate: 60 } });
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