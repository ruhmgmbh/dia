import { defineQuery } from "next-sanity";
import { pageBuilderFields } from "./pageBuilder";
import { mediaFields } from "./media";

const projectFields = /* groq */ `
  _id,
  _type,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  content,
  coverImage {
    ${mediaFields}
  },
  client->{
    _id,
    name,
    coverImage {
    ${mediaFields}
  },
    description,
    "slug": slug.current
  },
  technologies[]->{
    _id,
    name
  },
  networkPartners[]->{
    _id,
    name
  },
  services[]->{
    _id,
    title,
    "slug": slug.current,
  },
  projects[]->{
    _id,
    title,
    "slug": slug.current,
    coverImage {
    ${mediaFields}
  },
    excerpt
  },
  seo {
    title,
    description,
    keywords,
    noIndex,
    image {
      asset->{
        url
      }
    }
  },
  ${pageBuilderFields}
`;

const featuredProjectFields = `
  _id,
  _type,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage {
    ${mediaFields}
  },
`;

const projectMetaFields = `
  _id,
  _type,
  title,
  excerpt,
  coverImage
`;

export const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectFields}
  }
`);

export const projectMetaQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectMetaFields}
  }
`);

export const projectSlugs = defineQuery(`
  *[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true && defined(slug.current)] | order(_updatedAt desc) {
    ${featuredProjectFields}
  }
`);
