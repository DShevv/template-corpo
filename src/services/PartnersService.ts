import { PartnerT } from "@/types/types";
import { ApiResponse } from "@/types/api";

export const getPartners = async (): Promise<PartnerT[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/brands`, { next: { revalidate: 60 } });
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