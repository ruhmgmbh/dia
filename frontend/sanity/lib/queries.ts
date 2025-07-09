import { defineQuery } from "next-sanity";
import { linkReference } from "./queries/linkReference";

export const settingsQuery = defineQuery(`*[_type == "settings"][0] {
  websiteTitle,
  seo,
  header{
    ...,
    primaryLinks[] {
      ...,
      link {
        ${linkReference}
      }
    },
    socialLinks[] {
      ...,
      link {
        ${linkReference}
      }
    },
    secondaryLinks[] {
      ...,
      link {
        ${linkReference}
      }
    }
  },

  footer{
    ...,
    copyrightText,
    primaryLinks[] {
      ...,
      link {
        ${linkReference}
      }
    },
    socialLinks[] {
      ...,
      link {
        ${linkReference}
      }
    },
    secondaryLinks[] {
      ...,
      link {
        ${linkReference}
      }
    }
  }
}`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" || _type == "project" || _type=="person" || _type=="service" || _type=="client" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);
