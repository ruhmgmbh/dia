import { linkField } from "./LinkFields";

export type LinkWithLabel = {
  label: string;
  link: linkField;
};

export type HeaderFields = {
  primaryLinks: LinkWithLabel[];
  secondaryLinks: LinkWithLabel[];
  socialLinks: LinkWithLabel[];
};

export type FooterFields = {
  copyrightText?: string;
  links: LinkWithLabel[];
};
