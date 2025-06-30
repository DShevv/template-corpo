import { ContactsT, SeoTagT, SettingsT } from "@/types/types";
import { ApiResponse } from "@/types/api";

export const getSettings = async (): Promise<SettingsT | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/design/settings`, { next: { revalidate: 60 } });
    const data: ApiResponse<SettingsT> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }



    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getContacts = async (): Promise<ContactsT | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/design/contacts`, { next: { revalidate: 60 } });
    const data: ApiResponse<ContactsT> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSeoTag = async (name: string): Promise<SeoTagT | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/seo/tag?name=${name}`, { next: { revalidate: 60 } });
    const data: ApiResponse<SeoTagT> = await response.json();

    if (data && "success" in data && data.success) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};