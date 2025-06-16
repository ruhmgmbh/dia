import { defineQuery } from "next-sanity";
import { linkFields, linkReference } from "../queries";

export const projectFields = /* groq */ `
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
    name,
    "slug": slug.current
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
  "pageBuilder": pageBuilder[]{
    ...,
    _type == "callToAction" => {
      ${linkFields}
    },
    _type == "infoSection" => {
      content[]{
        ...,
        markDefs[]{
          ...,
          ${linkReference}
        }
      }
    }
  }
`;

export const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectFields}
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
