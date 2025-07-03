import { Suspense } from "react";

import ResolvedLink from "@/app/components/ResolvedLink";
import { CallToAction, Link } from "@/sanity.types";

import { tagStyle } from "./styles/tag";
import { cn } from "@sglara/cn";
import { linkField } from "../types/LinkFields";
import MediaRenderer from "./MediaRenderer";
import { SanityImage } from "../types/SanityImage";

type CtaProps = {
  block: CallToAction;
  index: number;
};

export default function CTA({ block }: CtaProps) {
  let heading;
  let desc;
  let mediaContain: boolean = false;
  let img: SanityImage | undefined = undefined;

  let link = block.link as Link & linkField;

  switch (link.linkType) {
    case "href":
      heading = block.heading;
      desc = block.text;
      break;

    case "post":
      heading = link.post.title;
      desc = link.post.excerpt;
      img = link.post.coverImage;
      break;

    case "person":
      heading = link.person.firstName;
      img = link.person.picture;
      break;

    case "client":
      heading = link.client.name;
      desc = link.client.excerpt;
      img = link.client.coverImage;
      break;

    case "networkPartner":
      heading = link.networkPartner.name;
      desc = link.networkPartner.excerpt;
      img = link.networkPartner.logo;
      mediaContain = true;
      break;

    case "project":
      heading = link.project.title;
      desc = link.project.excerpt;
      img = link.project.coverImage;
      break;

    case "service":
      heading = link.service.title;
      desc = link.service.excerpt;
      img = link.service.coverImage;
      break;

    case "technology":
      heading = link.technology.name;
      desc = link.technology.excerpt;
      img = link.technology.logo;
      mediaContain = true;
      break;

    default:
      break;
  }

  heading = block.heading ?? heading;
  desc = block.text ?? desc;

  return (
    <div className="py-28 bg-black">
      <div className="rightContainer">
        <div className="rounded-2xl">
          <div className="flex flex-col gap-12">
            {img && !block.hideImage && (
              <MediaRenderer
                type="image"
                media={img}
                className="w-full h-[300px] md:h-[550px] lg:h-[450px]"
                imgSizes="(max-width: 1024px) 100vw, 60vw"
                alt={img.alt}
                mediaContain={mediaContain}
                containBg={mediaContain ? "offset-white" : undefined}
              />
            )}

            <div className="flex flex-col gap-6">
              <div className=" flex flex-col gap-3 text-white">
                {heading && (
                  <h2 className="text-h3 font-bold mb-4">{heading}</h2>
                )}
                {desc && <p className="text-copy">{desc}</p>}
              </div>

              <Suspense fallback={null}>
                <div className="flex items-center mt-4">
                  <ResolvedLink
                    link={block.link}
                    className={cn(
                      tagStyle,
                      "bg-white text-black hover:bg-black hover:text-white hover:border-white"
                    )}
                  >
                    {block.buttonText ?? "mehr"}
                  </ResolvedLink>
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
