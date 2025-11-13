import { ReviewT } from "@/types/types";
import { ApiResponse } from "@/types/api";
import { getApiUrl } from "./base";

export const getReviews = async (): Promise<ReviewT[]> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/v1/reviews`, { next: { revalidate: 60 } });
    const data: ApiResponse<ReviewT[]> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }



    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};