import { defineQuery } from "next-sanity";
import { pageBuilderFields } from "./pageBuilder";

const pageFields = `
    _id,
    _type,
    name,
    slug,
    heading,
    lead,
    ${pageBuilderFields}
`;
const pageMetaFields = `
    _id,
    _type,
    heading,
    lead,
    seo {
      title,
      description,
      image {
        asset -> {
          url
        }
      },
      keywords,
      noIndex
    }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    ${pageFields}
  }
`);

export const getPageMeta = defineQuery(`
    *[_type == "page" && slug.current == $slug][0]{
      ${pageMetaFields}
  }
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
