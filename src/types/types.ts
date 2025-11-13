import { StaticImageData } from "next/image";

export type ServiceItemT = {
  title: string;
  description: string;
  image: string | StaticImageData;
  slug: string;
};

export type PartnerT = {
  name: string;
  photo_path: string | StaticImageData;
  image_path: string | StaticImageData;
  link: string;
};

export type AdvantageT = {
  icon: string;
  title: string;
  description: string;
  image: string | StaticImageData;
};

export type NewsItemT = {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  photo_path: string;
  publication_date: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type ReviewT = {
  author_photo: string | StaticImageData;
}

export type SettingsT = {
  colors: {
    primary: string;
    accent: string;
    secondary: string;
    button_secondary: string;
    text: string;
    background: string;
  },
  logo: string | StaticImageData;
  favicon: string | StaticImageData;
  feedback_image: string | StaticImageData;
  privacy_policy: {
    text: string;
  }
  about: {
    text: string;
    image: string | StaticImageData;
  };
}

export type ContactsT = {
  address: string;
  phones: string[];
  email: string;
  working_hours: string;
  social_links: {
    instagram: string;
    telegram: string;
    whatsapp: string;
  },
  company_info: string;
  bank_details: string;
  company_description: string;
}

export type SeoTagT = {
  id: number;
  name: string;
  title: string;
  description: string;
  keywords: string;
};

export type GalleryT = {
  id: number;
  title: string;
  description: string;
  image_path: string;
  is_active: boolean;
  order: number;
};

export type FeedbackT = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};


export type ServiceT = {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  photo_path: string;
  blocks: (TextImageBlockT | TextGridBlockT | FeaturesImages | TextT | ImageT)[] | null;
};

export type TextImageBlockT = {
  id: number;
  service_id: number;
  type: 'text_image';
  text: string;
  image_path: string | null;
  image_position: 'left' | 'right';
  images_data: {
    images: {
      image_path: string;
    }[];
  };
};

export type TextGridBlockT = {
  id: number;
  service_id: number;
  type: 'features4';
  text: string;
  title: string;
  content: string;
  items: {
    title: string;
    content: string;
  }[];
};

export type FeaturesImages = {
  id: number;
  service_id: number;
  type: 'images3';
  text: string;
  images: {
    caption: string;
    image_path: string;
  }[];
};

export type TextT = {
  id: number;
  service_id: number;
  type: 'text';
  text: string;
};

export type ImageT = {
  id: number;
  service_id: number;
  type: 'image';
  image_path: string;
};

export type SeoSettingsT = {
  google_tag: string | null;
  google_search_console: string | null;
  yandex_metrika: string | null;
  yandex_webmaster: string | null;
  sitemap_path: string | null;
  robots_path: string | null;
  feed_path: string | null;
  frontend_sitemap_url: string | null;
  microdata_addresses: {
    postalCode: string;
    addressRegion: string;
    streetAddress: string;
    addressLocality: string;
  }[];
};
