import { ContactsT, SeoSettingsT, SeoTagT, SettingsT } from "@/types/types";
import { ApiResponse } from "@/types/api";
import { getApiUrl } from "./base";

export const getSettings = async (): Promise<SettingsT | null> => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/v1/design/settings`, { next: { revalidate: 60 } });
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
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/v1/design/contacts`, { next: { revalidate: 60 } });
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
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/v1/seo/tag?name=${name}`, { next: { revalidate: 60 } });
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

export const getSeoSettings = async (): Promise<SeoSettingsT | null> => {
  try {
    const apiUrl = getApiUrl();
    const data = await fetch(`${apiUrl}/v1/seo/settings`, {
      next: {
        revalidate: 60,
      },
    });

    const res = await data.json();

    return res;
  } catch (err) {
    console.error(err);
    return null;
  }
};
