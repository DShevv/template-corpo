import { PartnerT } from "@/types/types";
import { ApiResponse } from "@/types/api";
import { getApiUrl } from "./base";

export const getPartners = async (): Promise<PartnerT[]> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/v1/brands`, { next: { revalidate: 60 } });
    const data: ApiResponse<PartnerT[]> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }



    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};