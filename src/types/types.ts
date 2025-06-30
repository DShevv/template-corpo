import { StaticImageData } from "next/image";

export type ServiceItemT = {
  title: string;
  description: string;
  image: string | StaticImageData;
  slug: string;
};

export type PartnerT = {
  name: string;
  logo: string | StaticImageData;
  image_path: string | StaticImageData;
  link: string;
};

export type AdvantageT = {
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
