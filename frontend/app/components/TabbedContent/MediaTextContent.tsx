import { InfoSection } from "@/sanity.types";
import { urlForFile, urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import Info from "../InfoSection";
import Link from "next/link";
import Tag from "../Tag";
import Video from "../Video";
import { cn } from "@sglara/cn";

type customContent = {
  title: string;
  desc?: string;
  link?: string;
  linkLabel?: string;
  external?: boolean;
};

type MediaTextContentProps = {
  index: number;
  media: any;
  mediaType: "image" | "video";
  contentType: "infoSection" | "custom";
  mediaContain?: boolean;
  content: InfoSection | customContent;
};

export default function MediaTextContent({
  index,
  media,
  mediaType,
  mediaContain,
  contentType,
  content,
}: MediaTextContentProps) {
  if (!content) return null;

  const custom = contentType === "custom" ? (content as customContent) : null;

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-stretch w-full relative">
      <>
        {mediaType == "image" && media && (
          <div
            className={cn(
              "relative w-full lg:w-2/4 rounded-2xl bg-offset-white overflow-hidden h-64 md:h-[30rem] lg:min-h-56 lg:h-auto"
            )}
          >
            <Image
              alt={""}
              className={cn(
                mediaContain ? "object-contain" : "object-cover",
                mediaContain && "p-5"
              )}
              fill
              src={
                urlForImage(media)?.fit("scale").auto("format").url() as string
              }
            />
          </div>
        )}

        {mediaType == "video" && media && (
          <Video media={media} className="w-full lg:w-2/4" />
        )}

        <div className="w-full lg:w-2/4 [&>div]:my-0 flex flex-col gap-2 items-start relative">
          <>
            {contentType == "infoSection" && (
              <Info block={content as InfoSection} index={index} />
            )}

            {contentType == "custom" && custom && (
              <>
                <div className="prose">
                  <h3>{custom.title}</h3>
                  <p className="!mt-0">{custom.desc}</p>
                </div>

                {custom.link && (
                  <Tag link={custom.link} label={custom.linkLabel ?? "mehr"} />
                )}
              </>
            )}
          </>
        </div>

        {contentType == "custom" && custom && custom.link && (
          <Link
            href={custom.link}
            className="absolute inset-0"
            target={custom.external ? "_blank" : "_self"}
          />
        )}
      </>
    </div>
  );
}
