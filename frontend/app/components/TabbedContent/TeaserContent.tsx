import { linkField } from "@/app/types/LinkFields";
import { Link, TabLink } from "@/sanity.types";
import MediaTextContent from "./MediaTextContent";
import { linkResolver } from "@/sanity/lib/utils";
import { SanityImage } from "@/app/types/SanityImage";
import SimpleTeaser from "./SimpleTeaser";
import { cn } from "@sglara/cn";

export type GroqLink = TabLink & {
  link: Link & linkField;
};

export default function TeaserContent({
  link,
  numberOfLinks,
}: {
  link: TabLink;
  numberOfLinks: number;
}) {
  let heading: string | undefined;
  let desc: string | undefined;
  let img: SanityImage | undefined;
  let imgContain: boolean = false;
  let href: string | null;

  let _link = (link as GroqLink).link;
  console.log(_link);

  switch (_link.linkType) {
    case "post":
      heading = _link.post.title;
      desc = _link.post.excerpt;
      img = _link.post.coverImage;
      break;

    case "person":
      heading = _link.person.firstName;
      img = _link.person.picture;
      break;

    case "client":
      heading = _link.client.name;
      desc = _link.client.excerpt;
      img = _link.client.coverImage;
      break;

    case "networkPartner":
      heading = _link.networkPartner.name;
      desc = _link.networkPartner.excerpt;
      img = _link.networkPartner.logo;
      imgContain = true;
      break;

    case "project":
      heading = _link.project.title;
      desc = _link.project.excerpt;
      img = _link.project.coverImage;
      break;

    case "service":
      heading = _link.service.title;
      break;

    case "technology":
      heading = _link.technology.name;
      break;

    default:
      break;
  }

  href = linkResolver(_link);

  if (!href) return null;

  if (img && heading) {
    return (
      <MediaTextContent
        index={2324}
        contentType="custom"
        content={{
          title: heading,
          desc: desc,
          link: href,
          linkLabel: link.label ?? "mehr",
        }}
        mediaType="image"
        mediaContain={imgContain}
        media={img}
      />
    );
  }

  return (
    <SimpleTeaser
      label={link.label ?? heading ?? "mehr"}
      link={href}
      external={_link.openInNewTab ? true : false}
      className={cn(
        numberOfLinks === 2
          ? "w-full sm:w-[calc(50%-24px)]"
          : "w-full sm:w-[calc(33.333%-24px)]"
      )}
    ></SimpleTeaser>
  );
}
