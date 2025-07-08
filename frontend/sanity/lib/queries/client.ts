import { defineQuery } from "next-sanity";
import { pageBuilderFields } from "./pageBuilder";

const clientFields = /* groq */ `
  _id,
  _type,
  name,
  "slug": slug.current,
  excerpt,
  linkWebsite,
  coverImage,
  ${pageBuilderFields}
`;

const clientMetaFields = `
  _id,
  _type,
  name,
  excerpt,
  coverImage
`;

export const clientQuery = defineQuery(`
  *[_type == "client" && slug.current == $slug][0]{
    ${clientFields}
  }
`);

export const clientMetaQuery = defineQuery(`
  *[_type == "client" && slug.current == $slug][0]{
    ${clientMetaFields}
  }
`);

export const clientSlugs = defineQuery(`
  *[_type == "client" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const featuredclientsQuery = defineQuery(`
  *[_type == "client" && featured == true && defined(slug.current)] | order(_updatedAt desc) {
    ${clientFields}
  }
`);
