import { defineQuery } from "next-sanity";
import { pageBuilderFields } from "./pageBuilder";

const serviceFields = /* groq */ `
  _id,
  _type,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  ${pageBuilderFields}
`;

const serviceMetaFields = `
  _id,
  _type,
  title,
  excerpt,
  coverImage
`;

export const serviceQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    ${serviceFields}
  }
`);

export const serviceMetaQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    ${serviceMetaFields}
  }
`);

export const serviceSlugs = defineQuery(`
  *[_type == "service" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const featuredServicesQuery = defineQuery(`
  *[_type == "service" && featured == true && defined(slug.current)] | order(_updatedAt desc) {
    ${serviceFields}
  }
`);
