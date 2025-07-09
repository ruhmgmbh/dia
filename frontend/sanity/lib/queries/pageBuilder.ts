import { defineQuery } from "next-sanity";
import { linkFields, linkReference } from "./linkReference";
import { mediaFields } from "./media";

export const pageBuilderFields = `
"pageBuilder": pageBuilder[]{
    ...,
    "projectTitle": ^.title,
    _type == "callToAction" => {
        ${linkFields},
    },
    _type == "infoSection" => {
      content[]{
        ...,
        markDefs[]{
          ...,
          ${linkFields}
        },
        image{
          ${mediaFields}
        }
      }
    },
    _type == "tabbedContent" => {
        tabs[]{
          ...,
          media{
            ...,
            image{
            ...,
            ${mediaFields},
            },
          },
          links[]{
            ...,
            link {
              ${linkReference}
            }
          }
        }
      },
    _type == "gallery" => {
      media[]{
        ...,
        image{
          ...,
          ${mediaFields},
        }
      }
    }
  }
`;
