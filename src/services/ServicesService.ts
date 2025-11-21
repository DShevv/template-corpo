import { FeaturesImages, ImageT, ServiceT, TextGridBlockT, TextImageBlockT, TextT } from "@/types/types";
import { getApiUrl } from "./base";

export const getServices = async (): Promise<ServiceT[] | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/services`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error('getServices', err);

    return null;
  }
};

export const getServiceBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<ServiceT | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/services/${slug}`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    data.blocks = data.blocks?.map((block: TextImageBlockT | TextGridBlockT | FeaturesImages | TextT | ImageT) => {
      if (block.type == 'features4') {
        return {
          ...block,
          ...JSON.parse(block.text),
        };
      }

      if (block.type == 'images3') {
        return {
          ...block,
          ...JSON.parse(block.text),
        };
      }

      return block;
    }) ?? [];

    return data;
  } catch (err) {
    console.error('getServiceBySlug', err);

    return null;
  }
};

export const getServicesTwo = async (): Promise<ServiceT[] | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/services-two`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error('getServices', err);

    return null;
  }
};

export const getServiceBySlugTwo = async ({
  slug,
}: {
  slug: string;
}): Promise<ServiceT | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/services-two/${slug}`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    data.blocks = data.blocks?.map((block: TextImageBlockT | TextGridBlockT | FeaturesImages | TextT | ImageT) => {
      if (block.type == 'features4') {
        return {
          ...block,
          ...JSON.parse(block.text),
        };
      }

      if (block.type == 'images3') {
        return {
          ...block,
          ...JSON.parse(block.text),
        };
      }

      return block;
    });

    return data;
  } catch (err) {
    console.error('getServiceBySlug', err);

    return null;
  }
};