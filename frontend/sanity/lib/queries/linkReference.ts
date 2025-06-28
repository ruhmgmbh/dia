import { defineQuery } from "next-sanity";

export const linkReferenceQuery = defineQuery(`
  *[_id == $id][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    coverImage
  }
`);
