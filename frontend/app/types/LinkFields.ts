import { SanityImage } from "./SanityImage";

type linkSlug = {
  slug: {
    current: string;
  };
};

export type linkField = {
  href: string;
  page: linkSlug;
  post: linkSlug & {
    title: string;
    excerpt: string;
    coverImage: SanityImage;
  };
  person: linkSlug & {
    firstName: string;
    picture: SanityImage;
  };
  client: linkSlug & {
    name: string;
    excerpt: string;
    coverImage: SanityImage;
  };
  networkPartner: linkSlug & {
    name: string;
    excerpt: string;
    logo: SanityImage;
  };
  project: linkSlug & {
    title: string;
    excerpt: string;
    coverImage: SanityImage;
  };
  service: linkSlug & {
    title: string;
    excerpt: string;
    coverImage: SanityImage;
  };
  technology: linkSlug & {
    name: string;
    excerpt: string;
    logo: SanityImage;
  };
};
