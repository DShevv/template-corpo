import { getApiUrl } from "./base";
import { EmployeeT } from "@/types/types";
import { ApiResponse } from "@/types/api";

export const getEmployees = async (): Promise<EmployeeT[]> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/v1/employees`, { next: { revalidate: 60 } });
    const data: ApiResponse<EmployeeT[]> = await response.json();

    if ("success" in data && data.success) {
      return data.data;
    }



    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};