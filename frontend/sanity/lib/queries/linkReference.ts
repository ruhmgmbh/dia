import { defineQuery } from "next-sanity";

export const linkReference = `
    _type,
    _key,
    label,
    linkType,
    externalUrl,
    reference->{
      _type,
      _id,
      title,
      slug,
    },
    page->{
      slug,  
    },
    post->{
      slug,
      title,
      excerpt,
      coverImage,
    },
    person->{
      slug,
      firstName,
      picture,
    },
    client->{
      slug,
      name,
      excerpt,
      coverImage,
    },
    networkPartner->{
      slug,
      name,
      excerpt,
      logo
    },
    project->{
      title,
      slug,
      excerpt,
      coverImage,
    },
    service->{
      slug,
      title,
      excerpt,
      coverImage,
    },
    technology->{
      slug,
      name,
      excerpt,
      logo,
    },
`;

export const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;
