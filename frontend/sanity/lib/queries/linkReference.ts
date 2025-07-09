import { mediaFields } from "./media";

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
      coverImage {
        ${mediaFields}
      },
    },
    person->{
      slug,
      firstName,
      picture {
        ${mediaFields}
      },
    },
    client->{
      slug,
      name,
      excerpt,
      coverImage {
        ${mediaFields}
      },
    },
    networkPartner->{
      slug,
      name,
      excerpt,
      logo {
        ${mediaFields}
      },
    },
    project->{
      title,
      slug,
      excerpt,
      coverImage {
        ${mediaFields}
      },
    },
    service->{
      slug,
      title,
      excerpt,
      coverImage {
        ${mediaFields}
      },
    },
    technology->{
      slug,
      name,
      excerpt,
      logo {
        ${mediaFields}
      },
    },
`;

export const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;
