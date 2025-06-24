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
  image: string | StaticImageData;
  url: string;
};