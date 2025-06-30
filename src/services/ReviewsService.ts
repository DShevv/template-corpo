import { ReviewT } from "@/types/types";
import { ApiResponse } from "@/types/api";
export const getReviews = async (): Promise<ReviewT[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/reviews`, { next: { revalidate: 60 } });
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