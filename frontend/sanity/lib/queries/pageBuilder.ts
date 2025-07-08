import { defineQuery } from "next-sanity";
import { linkFields, linkReference } from "./linkReference";

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
        }
      }
    },
    _type == "tabbedContent" => {
        tabs[]{
          ...,
          links[]{
            ...,
            link {
              ${linkReference}
            }
          }
        }
      },
  }
`;
