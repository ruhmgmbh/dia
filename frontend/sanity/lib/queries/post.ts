import { defineQuery } from "next-sanity";
import { linkReference } from "./linkReference";
import { pageBuilderFields } from "./pageBuilder";

const postFields = /* groq */ `
  _id,
  _type,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture, slug},
  ${pageBuilderFields}
`;

const postMetaFields = `
  _id,
  _type,
  title,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture, slug},
  excerpt,
  coverImage
`;

export const allPostsQuery = defineQuery(`
    *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
      ${postFields}
    }
  `);

export const morePostsQuery = defineQuery(`
    *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
      ${postFields}
    }
  `);

export const postQuery = defineQuery(`
    *[_type == "post" && slug.current == $slug] [0] {
      content[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    ${postFields}
    }
`);

export const postMetaQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    ${postMetaFields}
  }
`);

export const postPagesSlugs = defineQuery(`
    *[_type == "post" && defined(slug.current)]
    {"slug": slug.current}
  `);
