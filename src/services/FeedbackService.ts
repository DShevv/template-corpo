import { FeedbackT } from "@/types/types";
import { ApiResponse } from "@/types/api";

export const sendFeedback = async (data: FeedbackT): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/feedback`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData: ApiResponse<boolean> = await response.json();

    if (responseData && "success" in responseData && responseData.success) {
      return true;
    }



    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};