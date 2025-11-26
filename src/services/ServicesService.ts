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
    });

    return data;
  } catch (err) {
    console.error('getServiceBySlug', err);

    return null;
  }
};

export const getProducts = async (): Promise<ServiceT[] | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/product-services`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error('getProducts', err);

    return null;
  }
};

export const getProductBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<ServiceT | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/product-services/${slug}`, {
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


export const getCompanyServices = async (): Promise<ServiceT[] | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/company-services`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error('getProducts', err);

    return null;
  }
};

export const getCompanyServiceBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<ServiceT | null> => {
  try {
    const apiUrl = getApiUrl();
    const res = await fetch(`${apiUrl}/v1/company-services/${slug}`, {
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
