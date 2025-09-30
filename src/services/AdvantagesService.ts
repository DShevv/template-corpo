import { getApiUrl } from "./base";
import { AdvantageT } from "@/types/types";
import { ApiResponse } from "@/types/api";

export const getAdvantages = async (): Promise<AdvantageT[]> => {
  try {
    const apiUrl = await getApiUrl();
    const response = await fetch(`${apiUrl}/v1/advantages`, { next: { revalidate: 60 } });
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