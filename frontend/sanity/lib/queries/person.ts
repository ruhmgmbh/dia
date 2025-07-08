import { defineQuery } from "next-sanity";
import { pageBuilderFields } from "./pageBuilder";

const personFields = /* groq */ `
  _id,
  _type,
  "title": firstName + " " + lastName,
  "slug": slug.current,
  excerpt,
  picture,
  ${pageBuilderFields}
`;

const personMetaFields = `
  _id,
  _type,
  "title": firstName + " " + lastName,
  excerpt,
  picture
`;

export const personQuery = defineQuery(`
  *[_type == "person" && slug.current == $slug][0]{
    ${personFields}
  }
`);

export const personMetaQuery = defineQuery(`
  *[_type == "person" && slug.current == $slug][0]{
    ${personMetaFields}
  }
`);

export const personSlugs = defineQuery(`
  *[_type == "person" && defined(slug.current)]{
    "slug": slug.current
  }
`);
