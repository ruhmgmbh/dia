import { defineQuery } from "next-sanity";
import { pageBuilderFields } from "./pageBuilder";

const projectFields = /* groq */ `
  _id,
  _type,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  content,
  coverImage,
  client->{
    _id,
    name,
    coverImage,
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
    coverImage,
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
    ${projectFields}
  }
`);
