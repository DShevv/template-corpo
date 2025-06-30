import { AdvantageT } from "@/types/types";
import { ApiResponse } from "@/types/api";

export const getAdvantages = async (): Promise<AdvantageT[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/advantages`, { next: { revalidate: 60 } });
    const data: ApiResponse<AdvantageT[]> = await response.json();

    if ("success" in data && data.success) {
      return data.data;
    }



    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};